<template>
  <section class="w-full animate-in fade-in slide-in-from-right-4 duration-300" aria-labelledby="forgot-heading">
    <div v-if="!isSent" class="space-y-6">
      <header class="text-center space-y-2">
        <h2 id="forgot-heading" class="text-2xl font-black text-slate-900 tracking-tight">{{ $t('forgotPassword.title') }}</h2>
        <p class="text-sm text-slate-500 leading-relaxed px-4">{{ $t('forgotPassword.subtitle') }}</p>
      </header>
      <form @submit="onSubmit" class="space-y-4" novalidate>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="space-y-1">
            <FormLabel class="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">{{ $t('forgotPassword.emailLabel') }}</FormLabel>
            <FormControl>
              <div class="relative flex items-center">
                <Input type="email" :placeholder="$t('auth.emailPlaceholder')" autocomplete="email" v-bind="componentField" class="h-14 rounded-2xl border-2 border-slate-100 focus-visible:ring-transparent focus-visible:border-primary bg-slate-50/50 pr-12 transition-all" />
                <MailIcon class="absolute right-4 text-slate-300" :size="20" aria-hidden="true" />
              </div>
            </FormControl>
            <FormMessage class="text-xs font-medium text-rose-500 ml-1" role="alert" />
          </FormItem>
        </FormField>
        <Button type="submit" class="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 mt-2 transition-all active:scale-[0.98]" :disabled="isSubmitting" :aria-busy="isSubmitting">
          <Loader2Icon v-if="isSubmitting" class="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          {{ isSubmitting ? $t('forgotPassword.sending') : $t('forgotPassword.sendButton') }}
        </Button>
      </form>
      <footer class="text-center">
        <button type="button" @click="$emit('back')" class="text-sm font-bold text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:underline" :aria-label="$t('forgotPassword.backToLogin')">
          <ChevronLeftIcon :size="16" aria-hidden="true" />
          {{ $t('forgotPassword.backToLogin') }}
        </button>
      </footer>
    </div>
    <div v-else class="text-center py-4 animate-in zoom-in-95 duration-500" role="status" aria-live="polite">
      <div class="mb-6 flex justify-center" aria-hidden="true">
        <div class="relative">
          <div class="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-25"></div>
          <div class="relative bg-emerald-500 text-white p-5 rounded-full shadow-xl shadow-emerald-100">
            <CheckIcon :size="32" stroke-width="3" />
          </div>
        </div>
      </div>
      <h2 class="text-2xl font-black text-slate-900 mb-2">{{ $t('forgotPassword.successTitle') }}</h2>
      <p class="text-slate-500 text-sm leading-relaxed mb-8">
        {{ $t('forgotPassword.successMessage', { email: emailInput }) }}
      </p>
      <Button variant="outline" @click="$emit('back')" class="w-full h-14 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 hover:bg-slate-50">
        {{ $t('forgotPassword.understood') }}
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import * as z from 'zod'
import { MailIcon, ChevronLeftIcon, Loader2Icon, CheckIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import useUserStore from '@/stores/user.store'

const { t } = useI18n()
const emit = defineEmits(['back'])
const isSent = ref(false)
const isSubmitting = ref(false)
const emailInput = ref('')

const formSchema = toTypedSchema(z.object({
  email: z.string().email(t('auth.validationEmailInvalid')),
}))

const form = useForm({ validationSchema: formSchema })

const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true
  emailInput.value = values.email
  try {
    await useUserStore().reqResetPassword(values.email)
    isSent.value = true
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
})
</script>