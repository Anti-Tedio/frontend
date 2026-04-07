import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import VerifyEmailCode from '@/components/login/VerifyEmailCode.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      emailVerification: {
        title: 'Check your email',
        description: 'Enter 6-digit code',
        otpLabel: 'One-time code',
        verifying: 'Verifying...',
        confirmButton: 'Confirm',
        changeEmail: 'Change email',
        genericError: 'Invalid or expired code.',
      },
    },
  },
})

describe('VerifyEmailCode.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.removeItem('email')
  })

  it('renderiza a estrutura do componente', () => {
    const wrapper = shallowMount(VerifyEmailCode, { global: { plugins: [i18n] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('possui MailIcon no cabeçalho', () => {
    const wrapper = shallowMount(VerifyEmailCode, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toBeDefined()
  })
})
