import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import ExtraInfoView from '@/views/ExtraInfoView.vue'
import useSuggestStore from '@/stores/suggest.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      extraInfo: {
        title: "What's your budget?",
        subtitle: 'Enter the maximum amount you want to spend.',
        budgetLabel: 'Available Budget:',
        noLimit: 'No limit',
        budgetValue: 'R$ {value},00',
        submitButton: 'See Results',
        submitLabel: 'Confirm budget and see results',
      },
      selectCategory: { back: 'BACK' },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('ExtraInfoView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useSuggestStore().price = 0
  })

  it('renderiza o título da view', () => {
    const wrapper = shallowMount(ExtraInfoView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain("What's your budget?")
  })

  it('renderiza o subtítulo', () => {
    const wrapper = shallowMount(ExtraInfoView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Enter the maximum amount')
  })

  it('renderiza o botão de voltar', () => {
    const wrapper = shallowMount(ExtraInfoView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('BACK')
  })

  it('renderiza o botão "Ver Resultados"', () => {
    const wrapper = mount(ExtraInfoView, { global: { plugins: [i18n, createTestRouter()], stubs: { Button: false } } })
    expect(wrapper.html()).toContain('See Results')
  })

  it('renderiza opções de orçamento', async () => {
    const wrapper = mount(ExtraInfoView, { global: { plugins: [i18n, createTestRouter()] } })
    const radios = wrapper.findAll('[role="radio"]')
    expect(radios.length).toBeGreaterThan(0)
  })

  it('mostra texto "Sem limite" para a opção zero', () => {
    const wrapper = shallowMount(ExtraInfoView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('No limit')
  })
})
