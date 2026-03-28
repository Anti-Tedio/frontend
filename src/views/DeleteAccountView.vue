<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  AlertTriangleIcon, CoinsIcon, HistoryIcon, DatabaseIcon, InfoIcon, Loader2Icon,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import router from '@/router/routes'
import useUserStore from '@/stores/user.store'

const { t } = useI18n()

const isModalOpen = ref(false)
const confirmationInput = ref('')
const isDeleting = ref(false)

// The confirmation word comes from the locale so it works in both languages
const confirmWord = computed(() => t('deleteAccount.deleteWord'))

const isValidConfirmation = computed(() =>
  confirmationInput.value.toUpperCase() === confirmWord.value.toUpperCase(),
)

const handleFinalDeletion = async () => {
  if (!isValidConfirmation.value) return
  isDeleting.value = true
  try {
    await useUserStore().deleteAccount()
    await useUserStore().logout()
    isModalOpen.value = false
    router.push('/')
  } catch (e) {
    console.error('Error during account deletion:', e)
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <main class="max-w-2xl mx-auto p-6 space-y-8" aria-labelledby="delete-account-heading">

    <header class="text-center space-y-4">
      <div class="inline-flex p-4 bg-rose-50 rounded-full text-rose-600 animate-pulse" aria-hidden="true">
        <AlertTriangleIcon :size="48" />
      </div>
      <h1 id="delete-account-heading" class="text-3xl font-bold text-slate-900">
        {{ $t('deleteAccount.title') }}
      </h1>
      <p class="text-slate-500">{{ $t('deleteAccount.subtitle') }}</p>
    </header>

    <ul class="grid gap-4 list-none p-0" :aria-label="$t('deleteAccount.whatYouLose')">
      <li class="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div class="p-2 bg-amber-100 rounded-lg text-amber-600" aria-hidden="true"><CoinsIcon :size="20" /></div>
        <div>
          <h2 class="font-bold text-slate-800">{{ $t('deleteAccount.creditsTitle') }}</h2>
          <p class="text-sm text-slate-500">{{ $t('deleteAccount.creditsDesc') }}</p>
        </div>
      </li>
      <li class="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div class="p-2 bg-indigo-100 rounded-lg text-indigo-600" aria-hidden="true"><HistoryIcon :size="20" /></div>
        <div>
          <h2 class="font-bold text-slate-800">{{ $t('deleteAccount.historyTitle') }}</h2>
          <p class="text-sm text-slate-500">{{ $t('deleteAccount.historyDesc') }}</p>
        </div>
      </li>
      <li class="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div class="p-2 bg-rose-100 rounded-lg text-rose-600" aria-hidden="true"><DatabaseIcon :size="20" /></div>
        <div>
          <h2 class="font-bold text-slate-800">{{ $t('deleteAccount.dataTitle') }}</h2>
          <p class="text-sm text-slate-500">{{ $t('deleteAccount.dataDesc') }}</p>
        </div>
      </li>
    </ul>

    <aside
      class="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex gap-3"
      role="note"
      :aria-label="$t('deleteAccount.important')"
    >
      <InfoIcon class="text-blue-600 shrink-0 mt-0.5" :size="20" aria-hidden="true" />
      <p class="text-sm text-blue-800 leading-relaxed">
        <strong>{{ $t('deleteAccount.important') }}</strong>
        {{ ' ' }}
        <i18n-t keypath="deleteAccount.importantNote" tag="span">
          <template #strong><span class="sr-only">{{ $t('deleteAccount.important') }}</span></template>
          <template #days><span class="font-bold underline">{{ $t('deleteAccount.thirtyDays') }}</span></template>
          <template #email><span class="font-bold underline">{{ $t('deleteAccount.emailWord') }}</span></template>
        </i18n-t>
      </p>
    </aside>

    <div class="pt-4 border-t flex flex-col gap-3">
      <Button
        variant="destructive"
        class="h-12 rounded-xl font-bold text-lg focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
        aria-haspopup="dialog"
        @click="isModalOpen = true"
      >
        {{ $t('deleteAccount.proceedButton') }}
      </Button>
      <Button
        variant="ghost"
        class="text-slate-400 hover:text-slate-600"
        :aria-label="$t('deleteAccount.cancelButton')"
        @click="router.push('/')"
      >
        {{ $t('deleteAccount.cancelButton') }}
      </Button>
    </div>

    <Dialog v-model:open="isModalOpen" aria-labelledby="confirm-delete-title">
      <DialogContent class="sm:max-w-[425px] rounded-lg p-8" role="dialog" aria-modal="true">
        <DialogHeader class="items-center text-center">
          <DialogTitle id="confirm-delete-title" class="text-2xl font-bold text-rose-600">
            {{ $t('deleteAccount.modalTitle') }}
          </DialogTitle>
          <DialogDescription class="pt-2">
            <i18n-t keypath="deleteAccount.modalDesc" tag="span">
              <template #word>
                <strong class="text-slate-900 italic">{{ $t('deleteAccount.deleteWordDisplay') }}</strong>
              </template>
            </i18n-t>
          </DialogDescription>
        </DialogHeader>

        <div class="py-6">
          <label for="delete-confirmation" class="sr-only">
            {{ $t('deleteAccount.inputHint') }}
          </label>
          <Input
            id="delete-confirmation"
            v-model="confirmationInput"
            :placeholder="$t('deleteAccount.inputPlaceholder')"
            autocomplete="off"
            class="h-12 text-center text-lg font-bold border-2 focus-visible:border-red-400 focus-visible:ring-transparent"
            :aria-describedby="'delete-hint'"
            @paste.prevent
          />
          <p id="delete-hint" class="sr-only">{{ $t('deleteAccount.inputHint') }}</p>
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            class="w-full h-12 rounded-xl font-bold uppercase tracking-widest disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
            :disabled="!isValidConfirmation || isDeleting"
            :aria-busy="isDeleting"
            :aria-disabled="!isValidConfirmation || isDeleting"
            @click="handleFinalDeletion"
          >
            <Loader2Icon v-if="isDeleting" class="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            {{ isDeleting ? $t('deleteAccount.deleting') : $t('deleteAccount.confirmButton') }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </main>
</template>