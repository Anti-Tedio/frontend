import { describe, it, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import PrivacyView from '@/views/PrivacyView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      privacy: {
        pageTitle: 'Privacy Policy',
        lastUpdated: 'Last updated: March 2026',
        intro: 'Your privacy matters to us.',
        contactQuestion: 'Questions about privacy?',
        contactPrompt: 'Get in touch:',
        sections: [
          { title: '1. What data', content: 'We collect data.' },
          { title: '2. How we use', content: 'Your data is used.' },
          { title: '3. Data sharing', content: 'We share info.' },
        ],
      },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('PrivacyView.vue', () => {
  it('renderiza o título da página', () => {
    const wrapper = shallowMount(PrivacyView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Privacy Policy')
  })

  it('renderiza o texto de introdução', () => {
    const wrapper = shallowMount(PrivacyView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Your privacy matters')
  })

  it('renderiza o botão de voltar', () => {
    const wrapper = mount(PrivacyView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renderiza o rodapé com contato', () => {
    const wrapper = shallowMount(PrivacyView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Questions about privacy')
  })

  it('possui ícone de escudo no cabeçalho', () => {
    const wrapper = mount(PrivacyView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('ShieldCheckIcon')
  })
})