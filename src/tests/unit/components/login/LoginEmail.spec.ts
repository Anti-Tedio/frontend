import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import LoginEmail from '@/components/login/LoginEmail.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      auth: {
        welcomeBack: 'Welcome back',
        createAccount: 'Create your account',
        email: 'Email',
        password: 'Password',
        emailPlaceholder: 'you@example.com',
        passwordPlaceholder: 'Strong password',
        signInButton: 'Sign In',
        createAccountButton: 'Create Account',
        forgotPassword: 'Forgot your password?',
        submitting: 'Please wait\u2026',
        validationEmailRequired: 'Email is required',
        validationPasswordRequired: 'Password is required',
        validationEmailInvalid: 'Invalid email',
        validationPasswordMin: 'Password must be at least 8 characters',
        showPassword: 'Show password',
        hidePassword: 'Hide password',
        fullName: 'Full Name',
        namePlaceholder: 'Your name',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        signUp: 'Sign Up',
        signInEmail: 'Sign in with Email',
        validationNameRequired: 'Name is required',
        backToMethods: 'Back to methods',
        signInSubtitle: 'Sign in to continue',
        registerSubtitle: 'Join us',
      },
      forgotPassword: { title: 'Reset Password' },
    },
  },
})

function createWrapper() {
  return shallowMount(LoginEmail, {
    global: {
      plugins: [i18n],
      stubs: { ForgotPassword: true },
    },
  })
}

describe('LoginEmail.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mostra subtítulo "Welcome back" por padrão', () => {
    const wrapper = createWrapper()
    expect(wrapper.html()).toContain('Welcome back')
  })

  it('mostra texto de "não tem uma conta"', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain("Don't have an account?")
  })

  it('emite evento backMethodLogin quando o botão de voltar é clicado', async () => {
    const wrapper = createWrapper()
    const backButton = wrapper.findAll('button').find((b) => b.attributes('aria-label') === 'Back to methods')
    expect(backButton).toBeDefined()
    await backButton!.trigger('click')
    expect(wrapper.emitted('backMethodLogin')).toHaveLength(1)
  })

  it('alterna para modo de registro quando o link de cadastro é clicado', async () => {
    const wrapper = createWrapper()
    const signUpButton = wrapper.findAll('button').find((b) => b.text().includes('Sign Up'))
    expect(signUpButton).toBeDefined()
    await signUpButton!.trigger('click')
    await flushPromises()
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Create Account')
  })

  it('shows form element', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('shows logo image', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
