import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import TermsView from '@/views/TermsView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      terms: {
        pageTitle: 'Terms of Use',
        lastUpdated: 'Last updated: March 2026',
        intro: 'Please read these terms carefully.',
        contactQuestion: 'Questions about the terms?',
        viewPrivacy: '→ View Privacy Policy',
        sections: [
          { title: '1. Acceptance', content: 'By accessing this site...' },
          { title: '2. Description', content: 'The service works...' },
        ],
      },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('TermsView.vue', () => {
  it('renderiza o título da página', () => {
    const wrapper = shallowMount(TermsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Terms of Use')
  })

  it('renderiza o texto de introdução', () => {
    const wrapper = shallowMount(TermsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Please read these terms')
  })

  it('renderiza o botão de voltar', () => {
    const wrapper = shallowMount(TermsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('ScrollText')
  })

  it('renderiza o footer com link de contato', () => {
    const wrapper = shallowMount(TermsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('contato@mail.antitedio.com.br')
  })

  it('possui link para ver a política de privacidade', () => {
    const wrapper = shallowMount(TermsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.text()).toContain('View Privacy')
  })
})