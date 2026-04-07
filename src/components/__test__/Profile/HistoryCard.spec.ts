import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import HistoryCard from '../../Profile/HistoryCard.vue'
import type { History } from '@/types'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      result: { articleLabel: 'Your recommendation' },
      historyCard: {
        uncategorized: 'Uncategorized',
        by: 'By {name}',
        showLess: 'Show less',
        readMore: 'Read more',
        recommendedOn: 'Recommended on {date}',
        score: 'Score',
        criticScore: 'Critic score: {score}',
        rating: 'Rating: {score} stars',
      },
    },
  },
})

describe('HistoryCard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockHistory: History = {
    recommended: {
      id: '1',
      title: 'Inception',
      img: 'https://example.com/poster.jpg',
      plot: 'A mind-bending thriller about dream invasion.',
      year: '2010',
      creator: 'Christopher Nolan',
      rating: '8.8',
      categoryId: 1,
    },
    createdAt: '2024-01-15T10:00:00Z',
  }

  it('renderiza o título da recomendação', () => {
    const wrapper = shallowMount(HistoryCard, {
      props: { item: mockHistory },
      global: { plugins: [i18n] },
    })
    expect(wrapper.html()).toContain('Inception')
  })

  it('renderiza o enredo/sinopse', () => {
    const wrapper = shallowMount(HistoryCard, {
      props: { item: mockHistory },
      global: { plugins: [i18n] },
    })
    expect(wrapper.html()).toContain('mind-bending thriller')
  })

  it('renderiza o item como um elemento article', () => {
    const wrapper = mount(HistoryCard, {
      props: { item: mockHistory },
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('article').exists()).toBe(true)
  })

  it('mostra botão de "Ler mais" quando não expandido', () => {
    const wrapper = shallowMount(HistoryCard, {
      props: { item: mockHistory },
      global: { plugins: [i18n] },
    })
    expect(wrapper.html()).toContain('Read more')
  })

  it('alterna o estado expandido quando "Ler mais" é clicado', async () => {
    const wrapper = mount(HistoryCard, {
      props: { item: mockHistory },
      global: { plugins: [i18n] },
    })
    const buttons = wrapper.findAll('button')
    const toggleBtn = buttons.find((b) => b.text().includes('Read more'))
    if (toggleBtn) {
      await toggleBtn.trigger('click')
      expect(wrapper.text()).toContain('Show less')
    }
  })
})
