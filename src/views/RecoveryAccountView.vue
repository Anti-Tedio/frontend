<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Loader2Icon, PartyPopperIcon, GhostIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/user.store'
import router from '@/router/routes'

type RecoveryStatus = 'recovering' | 'success' | 'error_impossible'

const route = useRoute()
const status = ref<RecoveryStatus>('recovering')
const userStore = useUserStore()
const userId = String(route.query.userId)
const token = String(route.query.token)

const handleRecovery = async () => {
  try {
    await userStore.recoveryAccount(userId, token)
    status.value = 'success'
  } catch {
    status.value = 'error_impossible'
  }
}

const goToHome = () => router.push('/')

onMounted(() => {
  setTimeout(async () => { await handleRecovery() }, 2000)
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="w-150 mt-10 bg-white rounded-xl shadow-xl text-center p-10 border border-slate-100 relative overflow-hidden"
      role="main"
      aria-live="polite"
      aria-atomic="true"
    >

      <!-- Recovering -->
      <div
        v-if="status === 'recovering'"
        class="animate-in fade-in duration-500"
        role="status"
        :aria-label="$t('accountRecovery.recoveringLabel')"
      >
        <div class="mb-6 flex justify-center" aria-hidden="true">
          <div class="relative">
            <div class="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25" />
            <div class="relative bg-indigo-50 text-indigo-600 p-5 rounded-full">
              <Loader2Icon :size="48" class="animate-spin" />
            </div>
          </div>
        </div>
        <h1 class="text-2xl font-bold text-slate-800 mb-2">{{ $t('accountRecovery.recoveringTitle') }}</h1>
        <p class="text-slate-500">{{ $t('accountRecovery.recoveringSubtitle') }}</p>
      </div>

      <!-- Success -->
      <div
        v-if="status === 'success'"
        class="animate-in zoom-in duration-500"
        role="status"
        :aria-label="$t('accountRecovery.successLabel')"
      >
        <div class="mb-6 flex justify-center" aria-hidden="true">
          <div class="bg-green-50 text-green-600 p-5 rounded-full border-4 border-green-100">
            <PartyPopperIcon :size="48" />
          </div>
        </div>
        <h1 class="text-2xl font-bold text-slate-800 mb-2">{{ $t('accountRecovery.successTitle') }}</h1>
        <p class="text-slate-500 mb-8 text-balance">{{ $t('accountRecovery.successSubtitle') }}</p>
        <Button
          @click="goToHome"
          class="w-full h-12 rounded-2xl bg-primary font-bold focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          :aria-label="$t('accountRecovery.goToApp')"
        >
          {{ $t('accountRecovery.goToApp') }}
        </Button>
      </div>

      <!-- Error -->
      <div
        v-if="status === 'error_impossible'"
        class="animate-in slide-in-from-bottom-4 duration-500"
        role="alert"
        :aria-label="$t('accountRecovery.errorLabel')"
      >
        <div class="mb-6 flex justify-center" aria-hidden="true">
          <div class="bg-rose-50 text-rose-600 p-5 rounded-full border-4 border-rose-100">
            <GhostIcon :size="48" />
          </div>
        </div>
        <h1 class="text-2xl font-bold text-slate-800 mb-2">{{ $t('accountRecovery.errorTitle') }}</h1>
        <p class="text-slate-500 mb-6 text-sm">{{ $t('accountRecovery.errorSubtitle') }}</p>
      </div>

    </div>
  </div>
</template>