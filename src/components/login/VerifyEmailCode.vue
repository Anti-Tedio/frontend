<script setup lang="ts">
import { ref, watch } from 'vue'
import { MailIcon, Loader2Icon, ArrowLeftRightIcon } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import useUserStore from '@/stores/user.store'

const otpValue = ref('')
const open = ref(false)
const isLoading = ref(false)
const error = ref(false)
const errorMessage = ref('')
const userStore = useUserStore()
const email = ref(localStorage.getItem('email'))

const handleVerify = async () => {
  if (otpValue.value.length < 6) return
  isLoading.value = true
  error.value = false
  if (!email.value) return
  try {
    await userStore.verifyEmail(otpValue.value, email.value)
    error.value = false
    localStorage.removeItem('email')
    window.location.reload()
  } catch (e: any) {
    errorMessage.value = e?.response?.data?.message ?? ''
    error.value = true
  } finally {
    isLoading.value = false
  }
}

function back() {
  localStorage.removeItem('email')
  userStore.popUpLogin = true
}

watch(
  () => localStorage.getItem('email'),
  (newEmail) => {
    if (newEmail) {
      open.value = true
      email.value = newEmail
    } else {
      open.value = false
      localStorage.removeItem('email')
    }
  },
  { immediate: true },
)
</script>

<template>
  <Dialog v-model:open="open" aria-labelledby="otp-dialog-title">
    <DialogContent
      class="sm:max-w-120 rounded-3xl overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <DialogHeader class="flex flex-col items-center">
        <div
          class="bg-primary/10 p-4 rounded-2xl mb-4 text-primary animate-in fade-in zoom-in duration-500"
          aria-hidden="true"
        >
          <MailIcon :size="32" stroke-width="2.5" />
        </div>
        <DialogTitle
          id="otp-dialog-title"
          class="text-2xl max-w-[75dvw] font-extrabold tracking-tight text-center"
        >
          {{ $t('emailVerification.title') }}
          <div class=" truncate break-all">{{ email }}</div>
        </DialogTitle>
        <DialogDescription class="text-center text-slate-500 leading-relaxed px-2">
          {{ $t('emailVerification.description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col items-center justify-center py-8">
        <InputOTP
          v-model="otpValue"
          :maxlength="6"
          :disabled="isLoading"
          :aria-label="$t('emailVerification.otpLabel')"
          @complete="handleVerify"
        >
          <InputOTPGroup class="flex gap-2">
            <InputOTPSlot
              v-for="(_, index) in 6"
              :key="index"
              :index="index"
              class="w-10 h-10 !rounded-xl border-zinc-400 border-1"
            />
          </InputOTPGroup>
        </InputOTP>

        <div class="h-6 mt-4" aria-live="assertive" aria-atomic="true">
          <p
            v-if="error"
            class="text-rose-500 text-sm font-medium flex items-center gap-1 animate-in slide-in-from-top-1"
            role="alert"
          >
            <span class="w-1 h-1 bg-rose-500 rounded-full" aria-hidden="true" />
            {{ errorMessage || $t('emailVerification.genericError') }}
          </p>
        </div>
      </div>

      <DialogFooter class="flex items-center h-auto border-t mt-5">
        <div
          v-if="isLoading"
          class="flex items-center gap-3 text-primary font-semibold animate-pulse"
          role="status"
          :aria-label="$t('emailVerification.verifying')"
        >
          <Loader2Icon class="h-5 w-5 animate-spin" aria-hidden="true" />
          <span>{{ $t('emailVerification.verifying') }}</span>
        </div>

        <div v-else class="flex flex-col items-center gap-3 w-full">
          <Button
            class="w-full h-12 rounded-xl bg-primary text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            :disabled="otpValue.length < 6"
            :aria-disabled="otpValue.length < 6"
            @click="handleVerify"
          >
            {{ $t('emailVerification.confirmButton') }}
          </Button>

          <button
            type="button"
            class="flex gap-2 justify-center items-center text-sm w-full h-12 rounded-xl bg-zinc-100 font-medium text-slate-400 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-xl"
            :aria-label="$t('emailVerification.changeEmailLabel')"
            @click="back"
          >
            {{ $t('emailVerification.changeEmail') }}
            <ArrowLeftRightIcon :size="15" aria-hidden="true" />
          </button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>