import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount, flushPromises } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import MethodLogin from '@/components/login/MethodLogin.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      auth: {
        welcomeTitle: 'Welcome to Anti-Tédio',
        chooseMethod: 'Choose how you\'d like to sign in',
        continueGoogle: 'Continue with Google',
        continueMeta: 'Continue with Meta',
        signInEmail: 'Sign in with Email',
        termsNotice: 'By continuing, you agree to our {terms} and {privacy}.',
        termsLink: 'Terms of Service',
        privacyLink: 'Privacy Policy',
      },
    },
  },
})

describe('MethodLogin.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mostra título de boas-vindas', () => {
    const wrapper = shallowMount(MethodLogin, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Welcome to Anti-Tédio')
  })

  it('mostra botão de login com Google', () => {
    const wrapper = mount(MethodLogin, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Continue with Google')
  })

  it('mostra botão de login com e-mail', () => {
    const wrapper = mount(MethodLogin, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Sign in with Email')
  })

  it('emite evento email quando o botão de e-mail é clicado', async () => {
    const wrapper = mount(MethodLogin, { global: { plugins: [i18n] } })
    const buttons = wrapper.findAll('button')
    const emailBtn = buttons.find((b) => b.text().includes('Sign in with Email'))
    expect(emailBtn).toBeDefined()
    await emailBtn!.trigger('click')
    expect(wrapper.emitted('email')).toHaveLength(1)
  })

  it('mostra link de termos para /terms', () => {
    const wrapper = mount(MethodLogin, { global: { plugins: [i18n] } })
    const termsLink = wrapper.find('a[href="/terms"]')
    expect(termsLink.exists()).toBe(true)
  })

  it('mostra link de privacidade para /privacy', () => {
    const wrapper = mount(MethodLogin, { global: { plugins: [i18n] } })
    const privacyLink = wrapper.find('a[href="/privacy"]')
    expect(privacyLink.exists()).toBe(true)
  })

  it('mostra separador com texto "or"', () => {
    const wrapper = mount(MethodLogin, { global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('or')
  })
})
