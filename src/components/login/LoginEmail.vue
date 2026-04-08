<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ArrowLeft, EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ForgotPassword from './ForgotPassword.vue'
import useUserStore from '@/stores/user.store'

const { t } = useI18n()
const emit = defineEmits(['backMethodLogin'])

const isLogin = ref(true)
const showPassword = ref(false)
const modeForgotPassword = ref(false)
const isSubmitting = ref(false)
const userStore = useUserStore()

// ── Schemas ────────────────────────────────────────────────────────────────

const loginSchema = computed(() =>
  toTypedSchema(
    z.object({
      email: z
        .string({ required_error: t('auth.validationEmailRequired') })
        .min(1, t('auth.validationEmailRequired'))
        .email(t('auth.validationEmailInvalid')),
      password: z
        .string({ required_error: t('auth.validationPasswordRequired') })
        .min(1, t('auth.validationPasswordRequired'))
        .min(8, t('auth.validationPasswordMin')),
    }),
  ),
)

const registerSchema = computed(() =>
  toTypedSchema(
    z.object({
      name: z
        .string({ required_error: t('auth.validationNameRequired') })
        .min(1, t('auth.validationNameRequired')),
      email: z
        .string({ required_error: t('auth.validationEmailRequired') })
        .min(1, t('auth.validationEmailRequired'))
        .email(t('auth.validationEmailInvalid')),
      password: z
        .string({ required_error: t('auth.validationPasswordRequired') })
        .min(1, t('auth.validationPasswordRequired'))
        .min(8, t('auth.validationPasswordMin')),
    }),
  ),
)

// ── Form instance ──────────────────────────────────────────────────────────

const { handleSubmit, resetForm } = useForm({
  validationSchema: computed(() => (isLogin.value ? loginSchema.value : registerSchema.value)),
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    if (isLogin.value) {
      await userStore.login({ email: values.email, password: values.password })
    } else {
      await userStore.register(values as { name: string; email: string; password: string })
    }
    window.location.reload()
  } catch (error: any) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  showPassword.value = false
  resetForm()
}
</script>

<template>
  <!-- ── Email / Password form ────────────────────────────────────── -->
  <section
    v-if="!modeForgotPassword"
    class="w-full animate-in fade-in slide-in-from-right-2 duration-300"
    aria-labelledby="auth-heading"
  >
    <!-- Back button -->
    <button
      class="absolute -top-2 left-5 flex items-center gap-2 self-start p-2 text-zinc-400 font-bold mt-md rounded-2xl hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      :aria-label="$t('auth.backToMethods')"
      @click="emit('backMethodLogin')"
    >
      <ArrowLeft aria-hidden="true" />
    </button>

    <!-- Header -->
    <header class="flex flex-col items-center">
      <div aria-hidden="true">
        <img src="/src/assets/logo.webp" class="w-25" alt="Anti Tédio logo" />
      </div>
      <div class="text-center mt-2">
        <h2 id="auth-heading" class="text-2xl font-bold">
          {{ isLogin ? $t('auth.welcomeBack') : $t('auth.createAccount') }}
        </h2>
        <p class="text-sm text-gray-400 mt-1">
          {{ isLogin ? $t('auth.signInSubtitle') : $t('auth.registerSubtitle') }}
        </p>
      </div>
    </header>

    <!-- Form -->
    <form
      class="flex flex-col gap-4 mt-4"
      novalidate
      :aria-label="isLogin ? $t('auth.signInButton') : $t('auth.createAccountButton')"
      @submit="onSubmit"
    >
      <!-- Name (register only) -->
      <FormField v-if="!isLogin" v-slot="{ componentField }" name="name">
        <FormItem class="flex flex-col gap-1">
          <FormLabel
            for="name"
            class="font-bold text-xs ml-1 text-gray-500 uppercase tracking-wider"
          >
            {{ $t('auth.fullName') }}
          </FormLabel>
          <FormControl>
            <Input
              id="name"
              type="text"
              :placeholder="$t('auth.namePlaceholder')"
              autocomplete="name"
              v-bind="componentField"
              class="w-full p-3 rounded-xl border-2 border-gray-100 focus-visible:border-primary focus-visible:ring-transparent h-10 outline-none transition-colors bg-transparent appearance-none"
            />
          </FormControl>
          <FormMessage class="text-xs font-medium text-rose-500 ml-1" role="alert" />
        </FormItem>
      </FormField>

      <!-- Email -->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="flex flex-col gap-1">
          <FormLabel
            for="email"
            class="font-bold text-xs ml-1 text-gray-500 uppercase tracking-wider"
          >
            {{ $t('auth.email') }}
          </FormLabel>
          <FormControl>
            <Input
              id="email"
              type="email"
              :placeholder="$t('auth.emailPlaceholder')"
              autocomplete="email"
              v-bind="componentField"
              class="w-full p-3 rounded-xl border-2 border-gray-100 focus-visible:border-primary focus-visible:ring-transparent h-10 outline-none transition-colors bg-transparent appearance-none"
            />
          </FormControl>
          <FormMessage class="text-xs font-medium text-rose-500 ml-1" role="alert" />
        </FormItem>
      </FormField>

      <!-- Password -->
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="flex flex-col gap-1">
          <FormLabel
            for="password"
            class="font-bold text-xs ml-1 text-gray-500 uppercase tracking-wider"
          >
            {{ $t('auth.password') }}
          </FormLabel>
          <FormControl>
            <div class="relative flex items-center">
              <Input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('auth.passwordPlaceholder')"
                :autocomplete="isLogin ? 'current-password' : 'new-password'"
                v-bind="componentField"
                class="w-full focus-visible:border-primary focus-visible:ring-transparent h-10 p-3 pr-12 rounded-xl border-2 border-gray-100 focus:border-primary outline-none transition-colors bg-transparent appearance-none"
              />
              <button
                type="button"
                class="absolute right-4 text-gray-400 hover:text-primary transition-colors focus:outline-none flex items-center"
                :aria-label="showPassword ? $t('auth.hidePassword') : $t('auth.showPassword')"
                :aria-pressed="showPassword"
                @click="showPassword = !showPassword"
              >
                <EyeIcon v-if="!showPassword" :size="22" aria-hidden="true" />
                <EyeOffIcon v-else :size="22" aria-hidden="true" />
              </button>
            </div>
          </FormControl>
          <FormMessage class="text-xs font-medium text-rose-500 ml-1" role="alert" />

          <!-- Forgot password (login only) -->
          <div v-if="isLogin" class="text-right mr-2">
            <button
              type="button"
              class="text-xs font-bold text-slate-400 hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
              @click="modeForgotPassword = true"
            >
              {{ $t('auth.forgotPassword') }}
            </button>
          </div>
        </FormItem>
      </FormField>

      <!-- Submit -->
      <button
        type="submit"
        class="mt-4 w-full bg-primary text-white p-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        :disabled="isSubmitting"
        :aria-busy="isSubmitting"
      >
        {{
          isSubmitting
            ? $t('auth.submitting')
            : isLogin
              ? $t('auth.signInButton')
              : $t('auth.createAccountButton')
        }}
      </button>
    </form>

    <!-- Toggle login / register -->
    <p class="text-sm text-gray-600 text-center mt-4">
      {{ isLogin ? $t('auth.noAccount') : $t('auth.hasAccount') }}
      <button
        type="button"
        class="text-primary font-bold hover:underline ml-1 focus:outline-none"
        @click="toggleMode"
      >
        {{ isLogin ? $t('auth.signUp') : $t('auth.signInButton') }}
      </button>
    </p>
  </section>

  <!-- ── Forgot password flow ─────────────────────────────────────── -->
  <ForgotPassword v-else @back="modeForgotPassword = false" />
</template>