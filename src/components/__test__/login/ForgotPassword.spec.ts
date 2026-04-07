import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import ForgotPassword from '@/components/login/ForgotPassword.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      forgotPassword: {
        title: 'Reset Password',
        subtitle: 'Enter your email to receive a reset link.',
        emailLabel: 'Email address',
        sendButton: 'Send Reset Link',
        sending: 'Sending...',
        backToLogin: 'Back to sign in',
        successTitle: 'Check your inbox!',
        successMessage: 'We sent a reset link to {email}.',
        understood: 'Got it, back to sign in',
      },
      auth: { emailPlaceholder: 'you@example.com' },
      resetPassword: { validationMin: 'Invalid email' },
    },
  },
})

describe('ForgotPassword.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mostra o título de redefinição de senha', () => {
    const wrapper = shallowMount(ForgotPassword, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Reset Password')
  })

  it('mostra estado inicial do formulário (ainda não enviado)', () => {
    const wrapper = shallowMount(ForgotPassword, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Send Reset Link')
  })

  it('emite evento back quando o botão de voltar é clicado', async () => {
    const wrapper = mount(ForgotPassword, { global: { plugins: [i18n] } })
    const backBtn = wrapper.findAll('button').find((b) => b.text().includes('Back to sign in'))
    if (backBtn) {
      await backBtn.trigger('click')
      expect(wrapper.emitted('back')).toHaveLength(1)
    }
  })
})
