<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import useUserStore from '@/stores/user.store'

const { t } = useI18n()

const contactSchema = z.object({
  name: z.string().min(2, t('contact.validationName')).max(100),
  email: z.string().email(t('contact.validationEmail')),
  subject: z.string().min(3, t('contact.validationSubject')).max(150),
  message: z.string().min(10, t('contact.validationMessage')).max(2000),
})

export type ContactForm = z.infer<typeof contactSchema>

const userStore = useUserStore()
const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const fieldErrors = ref<Partial<Record<keyof ContactForm, string[]>>>({})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const serverMessage = ref('')

const isValid = computed(() => contactSchema.safeParse(form).success)

const clearFieldError = (field: keyof ContactForm) => {
  if (fieldErrors.value[field]) {
    delete fieldErrors.value[field]
  }
}

async function handleSubmit() {
  fieldErrors.value = {}
  const result = contactSchema.safeParse(form)

  if (!result.success) {
    fieldErrors.value = result.error.flatten().fieldErrors
    return
  }

  status.value = 'loading'

  try {
    const res = await userStore.contact(form)

    if (res.status === 422 && res.data.errors) {
      fieldErrors.value = res.data.errors
      status.value = 'idle'
      return
    }

    status.value = 'success'
    serverMessage.value = res.data.message

    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch (err) {
    status.value = 'error'
    serverMessage.value = err instanceof Error ? err.message : t('contact.genericError')
  }
}

function resetStatus() {
  status.value = 'idle'
  serverMessage.value = ''
  fieldErrors.value = {}
}
</script>

<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16 text-center space-y-4">
        <Badge
          variant="outline"
          class="text-primary border-primary/40 px-4 py-1 text-xs tracking-widest uppercase"
        >
          {{ $t('contact.badge') }}
        </Badge>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {{ $t('contact.title') }}<span class="text-primary">{{ $t('contact.titleHighlight') }}</span>
        </h1>
        <p class="text-muted-foreground text-base md:text-lg mx-auto">
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <aside class="lg:col-span-2 space-y-6">
          <Card class="border border-border/50 shadow-sm">
            <CardContent class="space-y-6">
              <div class="space-y-1">
                <p class="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {{ $t('contact.emailLabel') }}
                </p>
                <p class="text-sm font-medium text-foreground">contato@mail.antitedio.com.br</p>
              </div>
              <Separator />
              <div class="space-y-1">
                <p class="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {{ $t('contact.hoursLabel') }}
                </p>
                <p class="text-sm font-medium text-foreground">{{ $t('contact.hoursValue') }}</p>
              </div>
              <Separator />
              <div class="space-y-1">
                <p class="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  {{ $t('contact.locationLabel') }}
                </p>
                <p class="text-sm font-medium text-foreground">{{ $t('contact.locationValue') }}</p>
              </div>
            </CardContent>
          </Card>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <Card v-if="status === 'success'" class="border border-primary/30 bg-primary/5 shadow-sm" role="alert" aria-live="polite">
              <CardContent class="space-y-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm" aria-hidden="true">✓</span>
                  <p class="text-sm font-semibold text-foreground">{{ $t('contact.successTitle') }}</p>
                </div>
                <p class="text-xs text-muted-foreground">{{ serverMessage }}</p>
                <button class="text-xs text-primary underline underline-offset-2 hover:opacity-70 transition-opacity" @click="resetStatus">
                  {{ $t('contact.sendAnother') }}
                </button>
              </CardContent>
            </Card>
          </Transition>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <Card v-if="status === 'error'" class="border border-destructive/30 bg-destructive/5 shadow-sm" role="alert" aria-live="assertive">
              <CardContent class="pt-6 space-y-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-sm" aria-hidden="true">✕</span>
                  <p class="text-sm font-semibold text-foreground">{{ $t('contact.errorTitle') }}</p>
                </div>
                <p class="text-xs text-muted-foreground">{{ serverMessage }}</p>
                <button class="text-xs text-primary underline underline-offset-2 hover:opacity-70 transition-opacity" @click="resetStatus">
                  {{ $t('contact.tryAgain') }}
                </button>
              </CardContent>
            </Card>
          </Transition>
        </aside>

        <div class="lg:col-span-3">
          <Card class="border border-border/50 shadow-sm">
            <CardContent>
              <form class="space-y-6" @submit.prevent="handleSubmit" novalidate>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div class="space-y-2">
                    <Label for="name" class="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                      {{ $t('contact.formName') }} <span class="text-primary" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="name"
                      v-model="form.name"
                      type="text"
                      :placeholder="$t('contact.formNamePlaceholder')"
                      @input="clearFieldError('name')"
                      class="focus-visible:ring-transparent focus-visible:border-primary"
                      :class="fieldErrors.name ? 'border-destructive focus-visible:ring-destructive' : ''"
                      :disabled="status === 'loading'"
                      :aria-invalid="!!fieldErrors.name"
                      aria-describedby="name-error"
                      required
                    />
                    <p v-if="fieldErrors.name?.[0]" id="name-error" class="text-xs text-destructive" role="alert">{{ fieldErrors.name[0] }}</p>
                  </div>

                  <div class="space-y-2">
                    <Label for="email" class="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                      {{ $t('contact.formEmail') }} <span class="text-primary" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="email"
                      v-model="form.email"
                      type="email"
                      :placeholder="$t('contact.formEmailPlaceholder')"
                      @input="clearFieldError('email')"
                      class="focus-visible:ring-transparent focus-visible:border-primary"
                      :class="fieldErrors.email ? 'border-destructive focus-visible:ring-destructive' : ''"
                      :disabled="status === 'loading'"
                      :aria-invalid="!!fieldErrors.email"
                      aria-describedby="email-error"
                      required
                    />
                    <p v-if="fieldErrors.email?.[0]" id="email-error" class="text-xs text-destructive" role="alert">{{ fieldErrors.email[0] }}</p>
                  </div>
                </div>

                <div class="space-y-2">
                  <Label for="subject" class="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    {{ $t('contact.formSubject') }} <span class="text-primary" aria-hidden="true">*</span>
                  </Label>
                  <Input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    :placeholder="$t('contact.formSubjectPlaceholder')"
                    @input="clearFieldError('subject')"
                    class="focus-visible:ring-transparent focus-visible:border-primary"
                    :class="fieldErrors.subject ? 'border-destructive focus-visible:ring-destructive' : ''"
                    :disabled="status === 'loading'"
                    :aria-invalid="!!fieldErrors.subject"
                    aria-describedby="subject-error"
                    required
                  />
                  <p v-if="fieldErrors.subject?.[0]" id="subject-error" class="text-xs text-destructive" role="alert">{{ fieldErrors.subject[0] }}</p>
                </div>

                <div class="space-y-2">
                  <Label for="message" class="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                    {{ $t('contact.formMessage') }} <span class="text-primary" aria-hidden="true">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    v-model="form.message"
                    :placeholder="$t('contact.formMessagePlaceholder')"
                    rows="6"
                    maxlength="2000"
                    @input="clearFieldError('message')"
                    class="focus-visible:ring-transparent focus-visible:border-primary"
                    :class="fieldErrors.message ? 'border-destructive focus-visible:ring-destructive resize-none' : 'resize-none'"
                    :disabled="status === 'loading'"
                    :aria-invalid="!!fieldErrors.message"
                    aria-describedby="message-error"
                    required
                  />
                  <div class="flex items-center justify-between">
                    <p v-if="fieldErrors.message?.[0]" id="message-error" class="text-xs text-destructive" role="alert">{{ fieldErrors.message[0] }}</p>
                    <p class="text-xs text-muted-foreground ml-auto" aria-live="polite">
                      {{ form.message.length }} / 2000
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-2">
                  <p class="text-xs text-muted-foreground">{{ $t('contact.requiredFields') }}</p>
                  <Button 
                    type="submit" 
                    :disabled="!isValid || status === 'loading'" 
                    class="min-w-36 transition-all"
                    :aria-busy="status === 'loading'"
                  >
                    <span v-if="status === 'loading'" class="flex items-center gap-2">
                      <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      {{ $t('contact.sending') }}
                    </span>
                    <span v-else>{{ $t('contact.sendButton') }}</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>