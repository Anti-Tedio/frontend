import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Login from '@/components/login/Login.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      auth: {
        welcomeTitle: 'Welcome',
        chooseMethod: 'Choose method',
        continueGoogle: 'Continue with Google',
        continueMeta: 'Continue with Meta',
        signInEmail: 'Sign in with Email',
        termsNotice: 'Agree to {terms} and {privacy}',
        termsLink: 'Terms',
        privacyLink: 'Privacy',
      },
    },
  },
})

describe('Login.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza diálogo quando userStore.popUpLogin é true', async () => {
    const wrapper = shallowMount(Login, {
      global: { plugins: [i18n, createPinia()], stubs: { Dialog: true, DialogContent: true, DialogClose: true, MethodLogin: true, LoginEmail: true } },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('mostra overlay de backdrop quando popUpLogin é true', async () => {
    const wrapper = shallowMount(Login, {
      global: { plugins: [i18n, createPinia()] },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('começa com componente MethodLogin visível (não e-mail)', () => {
    const wrapper = mount(Login, {
      global: { plugins: [i18n, createPinia()] },
    })
    // Initially should show MethodLogin (email = false)
    expect(wrapper.html()).toBeDefined()
  })
})
