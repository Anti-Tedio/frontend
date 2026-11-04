import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import ChangePassword from '@/components/Profile/ChangePassword.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      changePassword: {
        title: 'New Password',
        subtitle: 'Create a strong password.',
        newPasswordLabel: 'New Password',
        confirmPasswordLabel: 'Confirm Password',
        updateButton: 'Reset Password',
        updating: 'Updating\u2026',
        cancel: 'Cancel',
        validationMin: 'Password must be at least 8 characters',
        validationMatch: 'Passwords do not match',
      },
      auth: { hidePassword: 'Hide password', showPassword: 'Show password' },
    },
  },
})

describe('ChangePassword.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza a estrutura do componente', () => {
    const wrapper = shallowMount(ChangePassword, {
      props: { isOpen: true },
      global: { plugins: [i18n] },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza com isOpen false', () => {
    const wrapper = shallowMount(ChangePassword, {
      props: { isOpen: false },
      global: { plugins: [i18n] },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
