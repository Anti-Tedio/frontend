import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import HistoryCard from '../../Profile/HistoryCard.vue'
import type { Category, History, Rating } from '@/types'

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
        love: 'Like very much',
        likeVeryMuchHint: 'I loved it!',
      },
    },
  },
})

const mockCategory: Category = {
  id: 1,
  title: { en: 'Test Category' },
  isActive: true,
}

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

const emptyRating: Rating = { value: null, recommendedId: '1' }

function mountHistoryCard(props: Partial<{ rating: Rating; item: History; categories: Category[] }> = {}) {
  return mount(HistoryCard, {
    props: {
      item: mockHistory,
      categories: [mockCategory],
      rating: { ...emptyRating },
      ...props,
    },
    global: { plugins: [i18n] },
  })
}

function mockTruncatedPlot() {
  vi.spyOn(Element.prototype, 'scrollHeight', 'get').mockReturnValue(100)
  vi.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(40)
}

describe('HistoryCard.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza o título da recomendação', () => {
    const wrapper = mountHistoryCard()
    expect(wrapper.html()).toContain('Inception')
  })

  it('renderiza o enredo/sinopse', () => {
    const wrapper = mountHistoryCard()
    expect(wrapper.html()).toContain('mind-bending thriller')
  })

  it('renderiza o item como um elemento article', () => {
    const wrapper = mountHistoryCard()
    expect(wrapper.find('article').exists()).toBe(true)
  })

  it('mostra botão de "Ler mais" quando o texto está truncado', async () => {
    mockTruncatedPlot()
    const wrapper = mountHistoryCard()
    await nextTick()
    expect(wrapper.text()).toContain('Read more')
  })

  it('alterna o estado expandido quando "Ler mais" é clicado', async () => {
    mockTruncatedPlot()
    const wrapper = mountHistoryCard()
    await nextTick()

    const toggleBtn = wrapper.findAll('button').find((b) => b.text().includes('Read more'))
    expect(toggleBtn).toBeDefined()

    await toggleBtn!.trigger('click')
    expect(wrapper.text()).toContain('Show less')
  })

  it('renderiza o sistema de avaliação com 5 opções', () => {
    const wrapper = mountHistoryCard()
    expect(wrapper.findAll('footer button')).toHaveLength(5)
  })

  it('permite selecionar e deselecionar uma opção de avaliação', async () => {
    const wrapper = mountHistoryCard()
    const ratingButtons = wrapper.findAll('footer button')

    await ratingButtons[1]!.trigger('click')

    expect(wrapper.emitted('saveRating')).toHaveLength(1)
    expect(wrapper.emitted('saveRating')![0]![0]).toEqual({
      value: 1,
      recommendedId: '1',
    })
    expect(wrapper.text()).toContain('Dislike')

    await ratingButtons[1]!.trigger('click')

    expect(wrapper.emitted('saveRating')).toHaveLength(2)
    expect(wrapper.emitted('saveRating')![1]![0]).toEqual({
      value: null,
      recommendedId: '1',
    })
  })

  it('mantém o estado de seleção ao interagir com outros elementos', async () => {
    mockTruncatedPlot()
    const wrapper = mountHistoryCard()
    const ratingButtons = wrapper.findAll('footer button')

    await ratingButtons[4]!.trigger('click')
    expect(wrapper.text()).toContain('Like very much')

    const readMoreButton = wrapper.findAll('button').find((b) => b.text().includes('Read more'))
    expect(readMoreButton).toBeDefined()
    await readMoreButton!.trigger('click')

    expect(wrapper.text()).toContain('Like very much')
    expect(wrapper.emitted('saveRating')).toHaveLength(1)
  })

  it('exibe a avaliação recebida via prop', () => {
    const wrapper = mountHistoryCard({
      rating: { value: 3, recommendedId: '1' },
    })
    expect(wrapper.text()).toContain('Like')
  })
})
