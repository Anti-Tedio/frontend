import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import ResultView from '@/views/ResultView.vue'
import useUserStore from '@/stores/user.store'
import useSuggestStore from '@/stores/suggest.store'
import useCategorysStore from '@/stores/categorys.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      result: { articleLabel: 'Your personalized suggestion', tryDifferent: 'TRY SOMETHING DIFFERENT', tryAgain: 'Try Again', tryDifferentLabel: 'Start over', tryAgainLabel: 'Get new suggestion', actionsLabel: 'Result actions' },
      loading: { title: 'Generating...', message1: 'Analyzing...', message2: 'Generating...', message3: 'Almost there...', progressLabel: 'Loading' },
      midia: { synopsis: 'Synopsis', availableOn: 'Available on', showLess: 'Show less', readMore: 'Read more', loadingLabel: 'Loading' },
      book: { by: 'by', publishedIn: 'Published in', synopsis: 'Synopsis', readSample: 'Read Sample', readSampleLabel: 'Read sample', showLess: 'Show less', readMore: 'Read more', coverLabel: 'Cover', coverAlt: 'Cover of {title}', genresLabel: 'Genres' },
      videoGame: { availableOn: 'Available on {store}', buyNow: 'Buy Now', buyNowLabel: 'Buy {title}', score: 'Score', criticScore: 'Critic score: {score}', coverAlt: 'Cover' },
      buyCredits: { triggerLabel: 'Buy' },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('ResultView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const userStore = useUserStore()
    userStore.credits = 10
    const suggestStore = useSuggestStore()
    suggestStore.loading = true
    suggestStore.suggestMidia = null as any
    suggestStore.suggestBook = null as any
    suggestStore.suggestVideoGame = null as any
    const categoryStore = useCategorysStore()
    categoryStore.categorys = [{ id: 1, title: { en: 'Movie' }, select: true, isActive: true }]
  })

  it('renderiza a view', () => {
    const wrapper = shallowMount(ResultView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.exists()).toBe(true)
  })
})
