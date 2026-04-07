import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import SelectCategoryView from '@/views/SelectCategoryView.vue'
import useCategorysStore from '@/stores/categorys.store'
import useUserStore from '@/stores/user.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      selectCategory: {
        back: 'BACK',
        title: 'What do you feel like doing?',
        subtitle: 'Pick a category and we\'ll find the perfect suggestion.',
        selected: 'Selected',
        categoriesLabel: 'Content categories',
        continueButton: 'Continue',
        resultButton: 'Get Recommendation',
        continueAriaLabel: 'Continue to extra info',
        resultAriaLabel: 'Get my recommendation',
      },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('SelectCategoryView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const categoryStore = useCategorysStore()
    categoryStore.categorys = [
      { id: 1, title: { en: 'Movie', pt: 'Filme' }, isActive: true },
      { id: 2, title: { en: 'Book', pt: 'Livro' }, isActive: true },
    ]
  })

  it('renderiza o título da view', () => {
    const wrapper = shallowMount(SelectCategoryView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('What do you feel like doing?')
  })

  it('renderiza o botão de voltar', () => {
    const wrapper = shallowMount(SelectCategoryView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('BACK')
  })

  it('renderiza o subtítulo', () => {
    const wrapper = shallowMount(SelectCategoryView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Pick a category')
  })

  it('mostra o botão "Obter Recomendação" quando nenhuma categoria está selecionada', () => {
    const wrapper = shallowMount(SelectCategoryView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Get Recommendation')
  })
})
