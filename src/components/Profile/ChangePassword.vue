<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import useUserStore from '@/stores/user.store'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()
const showPassword = ref(false)
const isSubmitting = ref(false)

const formSchema = toTypedSchema(
  z
    .object({
      password: z.string().min(8, t('changePassword.validationMin')),
      confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: t('changePassword.validationMatch'),
      path: ['confirmPassword'],
    }),
)

const form = useForm({ validationSchema: formSchema })

const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    await useUserStore().changePassword(values.password)
    emit('close')
    form.resetForm()
  } catch (e) {
    console.error('Change password error:', e)
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <Dialog
    :open="props.isOpen"
    @update:open="(v) => !v && emit('close')"
    aria-labelledby="change-password-title"
  >
    <DialogContent class="sm:max-w-120 rounded-2xl p-8" role="dialog" aria-modal="true">
      <DialogHeader class="text-center items-center space-y-1">
        <DialogTitle id="change-password-title" class="text-2xl font-bold">
          {{ $t('changePassword.title') }}
        </DialogTitle>
        <DialogDescription>{{ $t('changePassword.subtitle') }}</DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-5 pt-4" novalidate>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel class="font-bold text-slate-700">{{
              $t('changePassword.newPasswordLabel')
            }}</FormLabel>
            <FormControl>
              <div class="relative">
                <Input
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  v-bind="componentField"
                  class="pr-12 rounded-xl h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary/60"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? $t('auth.hidePassword') : $t('auth.showPassword')"
                  :aria-pressed="showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus-visible:outline-none"
                >
                  <EyeIcon v-if="!showPassword" :size="18" aria-hidden="true" />
                  <EyeOffIcon v-else :size="18" aria-hidden="true" />
                </button>
              </div>
            </FormControl>
            <FormMessage class="text-xs text-rose-500" role="alert" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel class="font-bold text-slate-700">{{
              $t('changePassword.confirmPasswordLabel')
            }}</FormLabel>
            <FormControl>
              <Input
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                v-bind="componentField"
                class="rounded-xl h-12 bg-slate-50 border-slate-200 focus-visible:ring-primary/60"
              />
            </FormControl>
            <FormMessage class="text-xs text-rose-500" role="alert" />
          </FormItem>
        </FormField>

        <footer class="flex flex-col gap-2 pt-2">
          <Button
            type="submit"
            class="w-full h-12 rounded-xl font-bold focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            :disabled="isSubmitting"
            :aria-busy="isSubmitting"
          >
            <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            {{ isSubmitting ? $t('changePassword.updating') : $t('changePassword.updateButton') }}
          </Button>
          <Button
            type="button"
            variant="ghost"
            class="w-full h-12 text-slate-400 hover:text-slate-600"
            @click="emit('close')"
          >
            {{ $t('changePassword.cancel') }}
          </Button>
        </footer>
      </form>
    </DialogContent>
  </Dialog>
</template>
