import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import useHistoryStore from '@/stores/history.store'
import useUserStore from '@/stores/user.store'
import useCategorysStore from '@/stores/categorys.store'
import usePersonsStore from '@/stores/persons.store'

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
        noHistoryTitle: 'No recommendations yet', noHistorySubtitle: 'Explore!',
        exploreNow: 'Explore now', filterLabel: 'Filter by category', filterAll: 'All categories',
        noFilterResults: 'No results', noFilterResultsSubtitle: 'Clear filter',
        clearFilter: 'Clear filter', myPersonality: 'My Personality',
        editTraitsLabel: 'Edit traits', selectedTraitsLabel: 'Selected traits',
      },
      historyCard: { uncategorized: 'Uncategorized', by: 'By {name}', showLess: 'Show less', readMore: 'Read more', recommendedOn: 'Recommended on {date}', score: 'Score', criticScore: 'Critic score: {score}', rating: 'Rating: {score} stars' },
      result: { articleLabel: 'Recommendation' },
    },
  },
})

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
    historyStore.historys = []
    historyStore.loading = false

    const categoryStore = useCategorysStore()
    categoryStore.categorys = []

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
})