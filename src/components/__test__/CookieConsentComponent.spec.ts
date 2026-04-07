import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CookieConsentComponent from '../CookieConsentComponent.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      cookieConsent: {
        ariaLabel: 'Cookie notice',
        title: 'We use cookies',
        description: 'We use cookies to improve your experience.',
        learnMore: 'Privacy Policy',
        essential: 'Essential only',
        acceptAll: 'Accept all',
      },
    },
  },
})

describe('CookieConsentComponent.vue', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })
  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('não está visível quando cookie_consent já está definido', async () => {
    localStorage.setItem('cookie_consent', 'all')
    const wrapper = mount(CookieConsentComponent, { global: { plugins: [i18n] } })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('mostra banner quando cookie_consent não está definido', async () => {
    const wrapper = mount(CookieConsentComponent, { global: { plugins: [i18n] } })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('oculta banner quando "Aceitar tudo" é clicado', async () => {
    const wrapper = mount(CookieConsentComponent, { global: { plugins: [i18n] } })
    await wrapper.vm.$nextTick()
    const acceptBtn = wrapper.findAll('button').find((b) => b.text().includes('Accept all'))
    expect(acceptBtn).toBeDefined()
    await acceptBtn!.trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(localStorage.getItem('cookie_consent')).toBe('all')
  })

  it('oculta banner quando "Apenas essenciais" é clicado', async () => {
    const wrapper = mount(CookieConsentComponent, { global: { plugins: [i18n] } })
    await wrapper.vm.$nextTick()
    const essentialBtn = wrapper.findAll('button').find((b) => b.text().includes('Essential'))
    expect(essentialBtn).toBeDefined()
    await essentialBtn!.trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    expect(localStorage.getItem('cookie_consent')).toBe('essential')
  })

  it('possui link para a política de privacidade', async () => {
    const wrapper = mount(CookieConsentComponent, { global: { plugins: [i18n] } })
    await wrapper.vm.$nextTick()
    const privacyLink = wrapper.find('a[href="/privacy"]')
    expect(privacyLink.exists()).toBe(true)
  })

  it('não possui link para Google policies', async () => {
    const wrapper = mount(CookieConsentComponent, { global: { plugins: [i18n] } })
    await wrapper.vm.$nextTick()
    const googleLink = wrapper.find('a[href*="policies.google.com"]')
    expect(googleLink.exists()).toBe(false)
  })
})
