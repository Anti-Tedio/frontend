<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import UserInfo from '@/components/Profile/UserInfo.vue'
import UserPerson from '@/components/Profile/UserPerson.vue'
import HistoryCard from '@/components/Profile/HistoryCard.vue'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import useHistoryStore from '@/stores/history.store'
import usePersonsStore from '@/stores/persons.store'
import useUserStore from '@/stores/user.store'
import useCategoriesStore from '@/stores/categories.store'
import EditPerson from '@/components/Profile/EditPerson.vue'
import EditAvatar from '@/components/Profile/EditAvatar.vue'
import ChangePassword from '@/components/Profile/ChangePassword.vue'
import router from '@/router/routes'
import { Search, Pencil } from 'lucide-vue-next'

const { locale } = useI18n()

const historyStore = useHistoryStore()
const personsStore = usePersonsStore()
const userStore = useUserStore()
const categoriesStore = useCategoriesStore()

const editPerson = ref<{ isOpen: boolean } | null>(null)
const editAvatar = ref<{ isOpen: boolean } | null>(null)
const changePassword = ref(false)

const isLoadingMore = ref(false)
const selectedCategoryId = ref<string>('all')

const availableCategories = computed(() => {
  return categoriesStore.categories.filter((c) => c.isActive)
})

const filteredHistory = computed(() => {
  const history = historyStore.history
  if (selectedCategoryId.value === 'all') return history
  return history.filter(
    (h) => String(h.recommended.categoryId) === selectedCategoryId.value,
  )
})

const hasMoreHistory = computed(() => {

  if (!historyStore.cursorCategory && selectedCategoryId.value != 'all') return false

  if (!historyStore.cursor) return false

  return true
})

function activeEditPerson() {
  if (editPerson.value) editPerson.value.isOpen = true
}

function handleEditPersons() {
  if (editPerson.value) editPerson.value.isOpen = false
  personsStore.savePersons()
}

function editPhoto() {
  if (editAvatar.value) editAvatar.value.isOpen = true
}

async function loadMoreHistory() {

  if (isLoadingMore.value || !historyStore.cursor) return

  try {
    isLoadingMore.value = true
    await historyStore.getMoreHistory()
  } finally {
    isLoadingMore.value = false
  }
}

function handleSelectedCategory() {

  if (selectedCategoryId.value === 'all') return;

  if (filteredHistory.value.length >= 3) return;

  console.log('foi')

  historyStore.cursorCategory = filteredHistory.value[filteredHistory.value.length - 1]?.recommended.id ?? null

  historyStore.getMoreHistoryByCategory(Number(selectedCategoryId.value))
}

function findOrCreateRating(recommendedId: string) {
  const selectedRating = historyStore.rating.find(r => r.recommendedId === recommendedId)
  if (selectedRating) return selectedRating
  return { value: null, recommendedId }
}

onMounted(async () => {
  await historyStore.getRecentHistory()
})
</script>

<template>
  <ChangePassword :is-open="changePassword" @close="changePassword = false" />
  <EditAvatar ref="editAvatar" />
  <EditPerson ref="editPerson" :persons="personsStore.persons" @handle-edit-persons="handleEditPersons" />

  <main
    class="mx-auto max-w-6xl w-full px-4 py-6 md:py-10 space-y-25 animate-in fade-in slide-in-from-bottom-4 duration-1000">

    <UserInfo :username="userStore.name" :avatar-url="userStore.avatarUrl"
      class="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-slate-200/50 rounded-[2.5rem]"
      @edit-photo="editPhoto" @change-password="changePassword = true" @logout="userStore.logout()"
      @delete-account="router.push('/delete-account')" />

    <section class="space-y-4" aria-labelledby="personality-heading">
      <div class="flex items-center justify-between px-2">
        <h2 id="personality-heading" class="text-lg font-semibold text-slate-800 uppercase tracking-wider">
          {{ $t('profile.myPersonality') }}
        </h2>
        <button @click="activeEditPerson"
          class="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1"
          :aria-label="$t('profile.editTraitsLabel')">
          <Pencil class="size-3.5" aria-hidden="true" />
          {{ $t('profile.editTraitsLabel') }}
        </button>
      </div>

      <div v-if="!personsStore.loading && personsStore.selected.length > 0"
        class="bg-white/40 border border-slate-200/60 p-1 rounded-3xl overflow-hidden">
        <UserPerson :persons-select="personsStore.selected" class="!border-none !shadow-none !bg-transparent"
          @edit="activeEditPerson" />
      </div>
      <Skeleton v-else class="h-32 w-full rounded-3xl bg-slate-200/50" aria-busy="true" />
    </section>

    <section class="space-y-8" aria-labelledby="history-heading">
      <header class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-2">
        <div class="space-y-2">
          <h2 id="history-heading" class="text-2xl font-black tracking-tight text-slate-900">
            {{ $t('profile.historyTitle') }}
          </h2>
          <p class="text-slate-500 font-medium text-sm">{{ $t('profile.historySubtitle') }}</p>
        </div>

        <Select v-if="!historyStore.loading && historyStore.history.length > 0" v-model="selectedCategoryId"
          @update:model-value="handleSelectedCategory">
          <SelectTrigger
            class="w-full sm:w-56 h-12 rounded-2xl bg-white border-slate-200 shadow-sm transition-all hover:border-primary/50 focus:ring-4 focus:ring-primary/10">
            <SelectValue :placeholder="$t('profile.filterAll')" />
          </SelectTrigger>
          <SelectContent class="rounded-2xl border-slate-200 shadow-xl overflow-hidden">
            <SelectItem value="all" class="focus:bg-primary/5 focus:text-primary">{{ $t('profile.filterAll') }}
            </SelectItem>
            <SelectItem v-for="cat in availableCategories" :key="cat.id" :value="String(cat.id)"
              class="focus:bg-primary/5 focus:text-primary">
              {{ cat.title[locale] ?? cat.title['en'] }}
            </SelectItem>
          </SelectContent>
        </Select>
      </header>

      <Separator class="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div class="min-h-[400px]" aria-live="polite">
        <template v-if="historyStore.loading && filteredHistory.length <= 0">
          <div class="grid grid-cols-1  gap-6">
            <Skeleton v-for="n in 3" :key="n" class="w-full h-64 rounded-[2rem] bg-slate-200/50" />
          </div>
        </template>

        <template v-else-if="filteredHistory.length > 0">
          <div class="space-y-8">
            <div class="grid grid-cols-1  gap-8">
              <HistoryCard v-for="history in filteredHistory" :key="history.recommended.id" :item="history"
                :rating="findOrCreateRating(history.recommended.id)"
                :categories="categoriesStore.categories"
                @save-rating="historyStore.saveRating"
                class="hover:translate-y-[-4px] transition-all duration-500" />
              <template v-if="historyStore.loading">
                <div class="grid grid-cols-1  gap-6">
                  <Skeleton v-for="n in 3" :key="n" class="w-full h-64 rounded-[2rem] bg-slate-200/50" />
                </div>
              </template>
            </div>

            <div v-if="hasMoreHistory" class="flex justify-center pt-8">
              <button @click="loadMoreHistory" :disabled="isLoadingMore"
                class="group flex items-center gap-3 bg-slate-900 text-white py-4 px-10 rounded-2xl hover:bg-slate-800 transition-all font-bold shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
                <span v-if="isLoadingMore"
                  class="animate-spin border-2 border-white/30 border-t-white rounded-full size-5" />
                {{ isLoadingMore ? $t('profile.loadingMore') : $t('profile.loadMore') }}
              </button>
            </div>
          </div>
        </template>

        <div v-else
          class="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-white/50 p-16 text-center"
          role="status">
          <div class="bg-primary/10 p-6 rounded-full mb-6">
            <Search class="size-10 text-primary" />
          </div>
          <h3 class="text-2xl font-bold text-slate-900">{{ $t('profile.noHistoryTitle') }}</h3>
          <p class="text-slate-500 mt-3 max-w-150 leading-relaxed">{{ $t('profile.noHistorySubtitle') }}</p>
          <a href="/persons"
            class="mt-8 inline-flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 px-10 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/30">
            {{ $t('profile.exploreNow') }}
          </a>
        </div>
      </div>
    </section>
  </main>
</template>