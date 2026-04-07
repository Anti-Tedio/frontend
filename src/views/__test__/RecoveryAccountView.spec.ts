import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import RecoveryAccountView from '@/views/RecoveryAccountView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      accountRecovery: {
        recoveringTitle: 'Recovering your account...',
        recoveringSubtitle: 'We\'re bringing everything back.',
        successTitle: 'Welcome back!',
        successSubtitle: 'Your account has been successfully reactivated.',
        errorTitle: 'Recovery not possible',
        errorSubtitle: 'The 30-day window has expired.',
        recoveringLabel: 'Recovering your account, please wait',
        successLabel: 'Account successfully recovered',
        errorLabel: 'Account recovery failed',
        goToApp: 'Go to the App',
      },
    },
  },
})

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { template: '<div />' }, name: 'home' }],
  })
}

describe('RecoveryAccountView.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renderiza a estrutura da view', () => {
    const wrapper = shallowMount(RecoveryAccountView, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('mostra estado "Recuperando conta" inicialmente', () => {
    const wrapper = shallowMount(RecoveryAccountView, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Recovering your account...')
  })
})