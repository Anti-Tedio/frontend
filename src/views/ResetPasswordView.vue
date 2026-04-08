<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ShieldCheckIcon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import useUserStore from '@/stores/user.store'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const showPassword = ref(false)
const isSubmitting = ref(false)
const isValidLink = ref(true)

const userId = route.query.userId as string | undefined
const token = route.query.token as string | undefined

onMounted(() => {
  if (!userId || !token) isValidLink.value = false
})

const formSchema = toTypedSchema(
  z.object({
    password: z.string()
      .min(8, t('resetPassword.validationMin'))
      .regex(/[A-Z]/, t('resetPassword.validationUppercase'))
      .regex(/[0-9]/, t('resetPassword.validationNumber')),
    confirmPassword: z.string(),
  }).refine((d) => d.password === d.confirmPassword, {
    message: t('resetPassword.validationMatch'),
    path: ['confirmPassword'],
  }),
)

const form = useForm({ validationSchema: formSchema })

const onSubmit = form.handleSubmit(async (values) => {
  if (!userId || !token) return
  isSubmitting.value = true
  try {
    await useUserStore().resetPassword(userId, values.confirmPassword, token)
    router.push('/')
  } catch (error) {
    console.error('Error resetting password:', error)
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div class="flex justify-center w-full">
    <Card class="max-w-200 w-full border-none shadow-2xl shadow-slate-200/60 rounded-xl overflow-hidden mt-md" role="main">
      <CardHeader class="space-y-1 pb-8 pt-10 text-center">
        <div class="mx-auto bg-primary text-white p-3 rounded-2xl w-fit mb-4 shadow-lg shadow-primary/20" aria-hidden="true">
          <ShieldCheckIcon :size="28" />
        </div>
        <CardTitle class="text-3xl font-black tracking-tight text-slate-900">{{ $t('resetPassword.title') }}</CardTitle>
        <CardDescription class="text-slate-500 text-base px-4">
          <i18n-t keypath="resetPassword.subtitle" tag="span">
            <template #brand><strong>Anti Tédio</strong></template>
          </i18n-t>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div v-if="!isValidLink" class="bg-rose-50 border border-rose-100 p-4 rounded-2xl text-center space-y-3" role="alert" aria-live="assertive">
          <p class="text-rose-600 font-medium text-sm">{{ $t('resetPassword.invalidLink') }}</p>
          <Button variant="outline" class="w-full rounded-xl border-rose-200 text-rose-600 hover:bg-rose-100" @click="router.push('/')">
            {{ $t('resetPassword.backToHome') }}
          </Button>
        </div>

        <form v-else @submit="onSubmit" class="space-y-5" novalidate :aria-label="$t('resetPassword.title')">
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel class="text-slate-700 font-bold ml-1">{{ $t('resetPassword.newPasswordLabel') }}</FormLabel>
              <FormControl>
                <div class="relative group">
                  <Input :type="showPassword ? 'text' : 'password'" :placeholder="$t('resetPassword.newPasswordPlaceholder')" autocomplete="new-password" v-bind="componentField" class="rounded-2xl h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/60 transition-all pr-12" />
                  <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus-visible:outline-none" :aria-label="showPassword ? $t('auth.hidePassword') : $t('auth.showPassword')" :aria-pressed="showPassword">
                    <EyeIcon v-if="!showPassword" :size="20" aria-hidden="true" />
                    <EyeOffIcon v-else :size="20" aria-hidden="true" />
                  </button>
                </div>
              </FormControl>
              <FormMessage class="text-xs font-medium text-rose-500 ml-1" role="alert" />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel class="text-slate-700 font-bold ml-1">{{ $t('resetPassword.confirmPasswordLabel') }}</FormLabel>
              <FormControl>
                <Input :type="showPassword ? 'text' : 'password'" :placeholder="$t('resetPassword.confirmPasswordPlaceholder')" autocomplete="new-password" v-bind="componentField" class="rounded-2xl h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/60 transition-all" />
              </FormControl>
              <FormMessage class="text-xs font-medium text-rose-500 ml-1" role="alert" />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 mt-4 transition-all active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" :disabled="isSubmitting" :aria-busy="isSubmitting">
            <Loader2Icon v-if="isSubmitting" class="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
            {{ isSubmitting ? $t('resetPassword.updating') : $t('resetPassword.submitButton') }}
          </Button>
        </form>
      </CardContent>

      <CardFooter class="pb-8 pt-2">
        <p class="w-full text-center text-sm text-slate-400">
          {{ $t('resetPassword.rememberedPassword') }}
          <router-link to="/" class="text-primary font-bold hover:underline focus-visible:outline-none focus-visible:underline">
            {{ $t('resetPassword.signIn') }}
          </router-link>
        </p>
      </CardFooter>
    </Card>
  </div>
</template>