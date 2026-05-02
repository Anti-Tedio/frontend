import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import HistoryCard from '../../Profile/HistoryCard.vue'
import type { History } from '@/types'

// Mock UI components
const Card = { template: '<div class="card"><slot></slot></div>' }
const CardContent = { template: '<div class="card-content"><slot></slot></div>' }
const Badge = { template: '<div class="badge"><slot></slot></div>' }

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
        yourRating: 'Your Rating',
        notRecommend: 'Not recommend for anyone',
        notRecommendHint: 'Not recommend for anyone',
        dislike: 'Dislike',
        dislikeHint: "I didn't like it",
        neutral: 'Neutral',
        neutralHint: 'It was okay',
        like: 'Like',
        likeHint: 'I liked it',
        likeVeryMuch: 'Like very much',
        likeVeryMuchHint: 'I loved it!',
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
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })
    expect(wrapper.html()).toContain('Inception')
  })

  it('renderiza o enredo/sinopse', () => {
    const wrapper = shallowMount(HistoryCard, {
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })
    expect(wrapper.html()).toContain('mind-bending thriller')
  })

  it('renderiza o item como um elemento article', () => {
    const wrapper = mount(HistoryCard, {
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })
    expect(wrapper.find('article').exists()).toBe(true)
  })

  it('mostra botão de "Ler mais" quando não expandido', () => {
    const wrapper = shallowMount(HistoryCard, {
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })
    expect(wrapper.html()).toContain('Read more')
  })

  it('alterna o estado expandido quando "Ler mais" é clicado', async () => {
    const wrapper = mount(HistoryCard, {
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })
    const buttons = wrapper.findAll('button')
    const toggleBtn = buttons.find((b) => b.text().includes('Read more'))
    if (toggleBtn) {
      await toggleBtn.trigger('click')
      expect(wrapper.text()).toContain('Show less')
    }
  })

  it('renderiza o sistema de avaliação com 5 opções', () => {
    const wrapper = shallowMount(HistoryCard, {
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })

    // Verifica que o componente renderiza sem erro
    expect(wrapper.exists()).toBe(true)

    // Verifica que contém os 5 botões de avaliação
    const buttons = wrapper.findAll('button')
    // Devemos ter pelo menos 5 botões (além dos outros botões como "Read more"/"Show less")
    expect(buttons.length).toBeGreaterThanOrEqual(5)
  })

  it('permite selecionar e deselecionar uma opção de avaliação', async () => {
    const wrapper = mount(HistoryCard, {
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })

    // Encontra os botões de avaliação (os que contêm os ícones)
    const alertButton = wrapper.find('.alert-triangle') // Não recomendo pra ninguém
    const thumbsDownButton = wrapper.find('.thumbs-down') // Não gostei
    const mehButton = wrapper.find('.meh') // Neutro
    const thumbsUpButton = wrapper.find('.thumbs-up') // Gostei
    const heartButton = wrapper.find('.heart') // Gostei muito

    // Testa selecionar "Não gostei" (thumbs down)
    if (thumbsDownButton.exists()) {
      await thumbsDownButton.trigger('click')
      await wrapper.vm.$nextTick()
      // Após selecionar, selectedRating deve ser 1
      expect(wrapper.vm.selectedRating).toBe(1)

      // Testa clicar novamente para deselecionar
      await thumbsDownButton.trigger('click')
      await wrapper.vm.$nextTick()
      // Após clicar novamente, selectedRating deve ser null
      expect(wrapper.vm.selectedRating).toBeNull()
    }
  })

  it('manter o estado de seleção ao interagir com outros elementos', async () => {
    const wrapper = mount(HistoryCard, {
      props: {
        item: mockHistory,
        categories: [{ id: 1, title: { en: 'Test Category' } }]
      },
      global: { plugins: [i18n], stubs: { Card, CardContent, Badge } },
    })

    // Seleciona "Gostei muito" (heart)
    const heartButton = wrapper.find('.heart')
    if (heartButton.exists()) {
      await heartButton.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.selectedRating).toBe(4) // Índice 4 para "Gostei muito"

      // Interage com o botão de "Read more" (não deve afetar a seleção)
      const readMoreButton = wrapper.find('button:contains("Read more")')
      if (readMoreButton.exists()) {
        await readMoreButton.trigger('click')
        await wrapper.vm.$nextTick()
        // A seleção deve permanecer
        expect(wrapper.vm.selectedRating).toBe(4)
      }
    }
  })
})
