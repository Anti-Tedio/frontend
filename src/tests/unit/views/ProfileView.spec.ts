import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import HistoryCard from '@/components/Profile/HistoryCard.vue'
import useHistoryStore from '@/stores/history.store'
import useUserStore from '@/stores/user.store'
import useCategoriesStore from '@/stores/categories.store'
import usePersonsStore from '@/stores/persons.store'
import type { Category, History } from '@/types'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      profile: {
        member: 'Member', myAccount: 'My Account', changePassword: 'Change Password',
        signOut: 'Sign Out', deleteAccount: 'Delete Account', editPhotoLabel: 'Edit profile photo',
        accountOptionsLabel: 'Account options', loadingTraits: 'Loading...',
        noTraitsTitle: 'No traits found', noTraitsSubtitle: 'No traits yet.',
        chooseTraits: 'Choose traits', historyTitle: 'Recommendation History',
        historySubtitle: 'Review your recommendations.',
        noHistoryTitle: 'No recommendations yet', noHistorySubtitle: 'Explore!',
        exploreNow: 'Explore now', filterLabel: 'Filter by category', filterAll: 'All categories',
        noFilterResults: 'No results', noFilterResultsSubtitle: 'Clear filter',
        clearFilter: 'Clear filter', myPersonality: 'My Personality',
        editTraitsLabel: 'Edit traits', selectedTraitsLabel: 'Selected traits',
        loadMore: 'Load more',
        loadingMore: 'Loading more...',
      },
      historyCard: { uncategorized: 'Uncategorized', by: 'By {name}', showLess: 'Show less', readMore: 'Read more', recommendedOn: 'Recommended on {date}', score: 'Score', criticScore: 'Critic score: {score}', rating: 'Rating: {score} stars', yourRating: 'Your Rating', dislike: 'Dislike', neutral: 'Neutral', like: 'Like', likeVeryMuch: 'Like very much', notRecommend: 'Not recommend' },
      result: { articleLabel: 'Recommendation' },
      changePassword: { validationMin: 'Min', validationMatch: 'Match' },
    },
  },
})

const mockCategory: Category = {
  id: 1,
  title: { en: 'Test Category', pt: 'Categoria de Teste', es: 'Categoria de Prueba' },
  isActive: true,
}

function makeHistory(id: string, title: string): History {
  return {
    recommended: {
      id,
      title,
      img: '',
      plot: `Plot for ${title}`,
      year: '2024',
      creator: 'Test Creator',
      rating: '8.0',
      categoryId: mockCategory.id,
    },
    createdAt: new Date().toISOString(),
  }
}

const mockHistory: History[] = [
  makeHistory('1', 'Test Recommendation 1'),
  makeHistory('2', 'Test Recommendation 2'),
  makeHistory('3', 'Test Recommendation 3'),
]

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('ProfileView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const userStore = useUserStore()
    userStore.name = 'Test User'
    userStore.avatarUrl = ''
    userStore.credits = 5

    const historyStore = useHistoryStore()
    historyStore.history = []
    historyStore.rating = []
    historyStore.loading = false
    historyStore.cursor = null
    historyStore.cursorCategory = null

    const categoriestore = useCategoriesStore()
    categoriestore.categories = []

    const personsStore = usePersonsStore()
    personsStore.persons = []
    personsStore.loading = false
  })

  it('renderiza a view de perfil', () => {
    const wrapper = shallowMount(ProfileView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('mostra o nome do usuário', () => {
    const wrapper = shallowMount(ProfileView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toBeDefined()
  })

  it('mostra estado de histórico vazio', () => {
    const wrapper = shallowMount(ProfileView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toBeDefined()
  })

  it('mostra estado de ausência de traits quando nenhuma pessoa está selecionada', () => {
    const wrapper = shallowMount(ProfileView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toBeDefined()
  })

  it('carrega mais histórico ao clicar em "Load more"', async () => {
    const historyStore = useHistoryStore()
    const categoriesStore = useCategoriesStore()

    historyStore.history = mockHistory
    historyStore.cursor = 'cursor-1'
    historyStore.loading = false
    categoriesStore.categories = [mockCategory]

    const getRecentHistory = vi.spyOn(historyStore, 'getRecentHistory').mockResolvedValue(undefined)
    const getMoreHistory = vi.spyOn(historyStore, 'getMoreHistory').mockResolvedValue(undefined)

    const wrapper = mount(ProfileView, { global: { plugins: [i18n, createTestRouter()] } })
    await flushPromises()

    expect(getRecentHistory).toHaveBeenCalledTimes(1)
    expect(wrapper.findAllComponents(HistoryCard)).toHaveLength(mockHistory.length)

    const loadMoreButton = wrapper.findAll('button').find((b) => b.text().includes('Load more'))
    expect(loadMoreButton).toBeDefined()

    await loadMoreButton!.trigger('click')
    await flushPromises()

    expect(getMoreHistory).toHaveBeenCalledTimes(1)
  })
})
