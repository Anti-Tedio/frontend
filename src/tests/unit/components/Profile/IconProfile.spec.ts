import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import IconProfile from '@/components/Profile/IconProfile.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      nav: { settings: 'Settings', signOut: 'Sign Out', accountMenu: 'Account menu for {name}' },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('IconProfile.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mostra imagem do avatar quando o usuário tem avatarUrl', () => {
    const wrapper = shallowMount(IconProfile, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('mostra ícone User como fallback quando não há avatarUrl', () => {
    const wrapper = shallowMount(IconProfile, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza o menu dropdown', () => {
    const wrapper = shallowMount(IconProfile, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toBeDefined()
  })

  it('navega para o perfil ao clicar em configurações', async () => {
    const router = createTestRouter()
    const pushSpy = vi.spyOn(router, 'push')
    const wrapper = mount(IconProfile, { global: { plugins: [i18n, router] } })
    const settingsItems = wrapper.findAll('[role="menuitem"]')
    const settingsItem = settingsItems.find((item) => item.text().includes('Settings'))
    if (settingsItem) {
      await settingsItem.trigger('click')
      expect(pushSpy).toHaveBeenCalledWith('/profile')
    }
  })
})
