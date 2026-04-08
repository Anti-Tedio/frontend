import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'pt',
  messages: {
    pt: {
      nav: { home: 'Início' },
      footer: {
        navigation: 'Navegação',
        support: 'Suporte',
        tagline: 'Descubra algo novo agora mesmo.',
        myAccount: 'Minha Conta',
        explore: 'Explorar',
        privacy: 'Privacidade',
        terms: 'Termos',
        contact: 'Contato',
        copyright: '© {year} Anti Tédio.',
      },
    },
  },
})

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' }, name: 'home' },
      { path: '/profile', component: { template: '<div>Profile</div>' }, name: 'profile' },
      { path: '/persons', component: { template: '<div>Persons</div>' }, name: 'persons' },
      { path: '/categorys', component: { template: '<div>Categorys</div>' }, name: 'categorys' },
      { path: '/extra-info', component: { template: '<div>Extra</div>' }, name: 'extra-info' },
      { path: '/result', component: { template: '<div>Result</div>' }, name: 'result' },
    ],
  })
}

describe('MainLayout.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('renderiza o cabeçalho com logo e nome do site', () => {
    const wrapper = shallowMount(MainLayout, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Anti Tédio')
  })

  it('renderiza o NavBarComponent no cabeçalho', () => {
    const wrapper = shallowMount(MainLayout, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.findComponent({ name: 'NavBarComponent' }).exists()).toBe(true)
  })

  it('renderiza a área principal com router-view', () => {
    const wrapper = shallowMount(MainLayout, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.find('#main-content').exists()).toBe(true)
  })

  it('renderiza o rodapé com seções de navegação e suporte', () => {
    const wrapper = shallowMount(MainLayout, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Navegação')
    expect(wrapper.html()).toContain('Suporte')
  })

  it('renderiza os links de navegação no rodapé', () => {
    const wrapper = shallowMount(MainLayout, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Minha Conta')
    expect(wrapper.html()).toContain('Explorar')
  })

  it('renderiza os links de suporte no rodapé', () => {
    const wrapper = shallowMount(MainLayout, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Privacidade')
    expect(wrapper.html()).toContain('Termos')
    expect(wrapper.html()).toContain('Contato')
  })

  it('renderiza o copyright no rodapé', () => {
    const wrapper = shallowMount(MainLayout, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Anti Tédio')
  })
})
