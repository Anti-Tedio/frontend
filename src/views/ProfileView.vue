<script setup lang="ts">
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
import PubliGoogleAdSenseComponent from '@/components/PubliGoogleAdSenseComponent.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useHistoryStore from '@/stores/history.store'
import usePersonsStore from '@/stores/persons.store'
import useUserStore from '@/stores/user.store'
import useCategorysStore from '@/stores/categorys.store'
import EditPerson from '@/components/Profile/EditPerson.vue'
import EditAvatar from '@/components/Profile/EditAvatar.vue'
import ChangePassword from '@/components/Profile/ChangePassword.vue'
import router from '@/router/routes'

const { locale } = useI18n()

const historyStore = useHistoryStore()
const personsStore = usePersonsStore()
const userStore = useUserStore()
const categoryStore = useCategorysStore()

const editPerson = ref<{ isOpen: boolean } | null>(null)
const editAvatar = ref<{ isOpen: boolean } | null>(null)
const changePassword = ref(false)

// ── Filter ─────────────────────────────────────────────────────────────────
// 'all' means no filter; otherwise it's a category id as string
const selectedCategoryId = ref<string>('all')

/** Categories that actually appear in the user's history */
const availableCategories = computed(() => {
  const ids = new Set(historyStore.historys.map((h) => h.recommended.categoryId))
  return categoryStore.categorys.filter((c) => ids.has(c.id))
})

const filteredHistory = computed(() => {
  if (selectedCategoryId.value === 'all') return historyStore.historys
  return historyStore.historys.filter(
    (h) => String(h.recommended.categoryId) === selectedCategoryId.value,
  )
})

// ── Helpers ────────────────────────────────────────────────────────────────
function activeEditPerson() {
  if (editPerson.value) editPerson.value.isOpen = true
}
function editPhoto() {
  if (editAvatar.value) editAvatar.value.isOpen = true
}

onMounted(async () => {
  await historyStore.getHistory()
})
</script>

<template>
  <ChangePassword :is-open="changePassword" @close="changePassword = false" />

  <div class="md:p-8 space-y-8 animate-in fade-in duration-500 w-full">
    <EditPerson ref="editPerson" />

    <UserInfo
      :username="userStore.name"
      :avatar-url="userStore.avatarUrl"
      @edit-photo="editPhoto"
      @change-password="changePassword = true"
      @logout="userStore.logout()"
      @delete-account="router.push('/delete-account')"
    />

    <EditAvatar ref="editAvatar" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- ── Personality sidebar ──────────────────────────────────── -->
      <aside :aria-label="$t('profile.myPersonality')" class="space-y-6">
        <Skeleton
          v-if="personsStore.loading"
          class="h-45 bg-gray-200"
          aria-busy="true"
          :aria-label="$t('profile.loadingTraits')"
        />
        <UserPerson
          v-else-if="personsStore.selected.length > 0"
          class="animate-in fade-in"
          @edit="activeEditPerson"
        />
        <div
          v-else
          class="flex flex-col items-center justify-center h-45 shadow-md bg-white/30 space-y-3 p-sm rounded-2xl animate-in fade-in"
          role="status"
        >
          <p class="mt-5 text-xl font-semibold tracking-tight">{{ $t('profile.noTraitsTitle') }}</p>
          <p class="text-sm text-muted-foreground text-center">{{ $t('profile.noTraitsSubtitle') }}</p>
          <button
            class="gap-2 bg-primary text-white py-2 px-5 rounded-lg mt-sm hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            :aria-label="$t('profile.chooseTraits')"
            @click="activeEditPerson"
          >
            {{ $t('profile.chooseTraits') }}
          </button>
        </div>

        <PubliGoogleAdSenseComponent :ad-slot="8154894288" />
      </aside>

      <!-- ── History section ─────────────────────────────────────── -->
      <section class="lg:col-span-2 space-y-4" aria-labelledby="history-heading">
        <header class="flex flex-wrap items-center justify-between gap-3">
          <h2 id="history-heading" class="text-xl font-medium tracking-tight">
            {{ $t('profile.historyTitle') }}
          </h2>

          <!-- Category filter — only shown when there is history -->
          <Select
            v-if="!historyStore.loading && historyStore.historys.length > 0"
            v-model="selectedCategoryId"
            :aria-label="$t('profile.filterLabel')"
          >
            <SelectTrigger class="w-44 h-9 text-sm rounded-xl border-slate-200">
              <SelectValue :placeholder="$t('profile.filterAll')" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{{ $t('profile.filterAll') }}</SelectItem>
              <SelectItem
                v-for="cat in availableCategories"
                :key="cat.id"
                :value="String(cat.id)"
              >
                {{ cat.title[locale] ?? cat.title['en'] }}
              </SelectItem>
            </SelectContent>
          </Select>
        </header>

        <Separator />

        <div class="grid gap-4" aria-live="polite" aria-atomic="false">

          <!-- Loading skeletons -->
          <template v-if="historyStore.loading">
            <Skeleton v-for="n in 3" :key="n" class="shadow-md w-full h-150 sm:h-60 bg-gray-200" />
          </template>

          <!-- History cards -->
          <template v-else-if="filteredHistory.length > 0">
            <HistoryCard
              v-for="history in filteredHistory"
              :key="history.recommended.id"
              :item="history"
            />
          </template>

          <!-- No results after filtering -->
          <div
            v-else-if="historyStore.historys.length > 0 && filteredHistory.length === 0"
            class="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in duration-500"
            role="status"
          >
            <p class="text-xl font-semibold tracking-tight">{{ $t('profile.noFilterResults') }}</p>
            <p class="text-sm text-muted-foreground mt-1">{{ $t('profile.noFilterResultsSubtitle') }}</p>
            <button
              class="text-sm font-bold text-primary mt-3 hover:underline focus-visible:outline-none focus-visible:underline"
              @click="selectedCategoryId = 'all'"
            >
              {{ $t('profile.clearFilter') }}
            </button>
          </div>

          <!-- Completely empty history -->
          <div
            v-else
            class="flex md:min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in duration-500"
            role="status"
          >
            <p class="mt-6 text-xl font-semibold tracking-tight">{{ $t('profile.noHistoryTitle') }}</p>
            <p class="text-sm text-muted-foreground mt-1">{{ $t('profile.noHistorySubtitle') }}</p>
            <a
              href="/select-person"
              class="gap-2 bg-primary text-white py-2 px-5 rounded-lg mt-sm hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none inline-block"
            >
              {{ $t('profile.exploreNow') }}
            </a>
          </div>

        </div>
      </section>
    </div>
  </div>
</template>