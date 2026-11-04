import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import UserInfo from '@/components/Profile/UserInfo.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      profile: {
        member: 'Member',
        myAccount: 'My Account',
        changePassword: 'Change Password',
        signOut: 'Sign Out',
        deleteAccount: 'Delete Account',
        editPhotoLabel: 'Edit profile photo',
        accountOptionsLabel: 'Account options',
        loadingTraits: 'Loading traits',
        myPersonality: 'My Personality',
        noTraitsTitle: 'No traits found',
        noTraitsSubtitle: 'You haven\'t added any personality traits yet.',
        chooseTraits: 'Choose traits',
        historyTitle: 'Recommendation History',
        noHistoryTitle: 'No recommendations yet',
        noHistorySubtitle: 'We haven\'t generated any recommendations for you yet.',
        exploreNow: 'Explore now',
        filterLabel: 'Filter by category',
        filterAll: 'All categories',
        noFilterResults: 'No results for this category',
        noFilterResultsSubtitle: 'Try selecting a different category or clear the filter.',
        clearFilter: 'Clear filter',
        editTraitsLabel: 'Edit personality traits',
        selectedTraitsLabel: 'Selected traits',
      },
    },
  },
})

describe('UserInfo.vue', () => {
  it('renderiza o nome de usuário', () => {
    const wrapper = mount(UserInfo, {
      props: { username: 'John Doe' },
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('John Doe')
  })

  it('mostra placeholder do avatar quando não há avatarUrl', () => {
    const wrapper = mount(UserInfo, {
      props: { username: 'John Doe' },
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('.rounded-full').exists()).toBe(true)
  })

  it('mostra imagem do avatar quando avatarUrl é fornecido', () => {
    const wrapper = mount(UserInfo, {
      props: { username: 'John Doe', avatarUrl: 'https://example.com/avatar.jpg' },
      global: { plugins: [i18n] },
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
  })

  it('emite edit-photo quando a sobreposição da câmera é clicada', async () => {
    const wrapper = mount(UserInfo, {
      props: { username: 'John Doe' },
      global: { plugins: [i18n] },
    })
    const overlay = wrapper.findAll('[aria-label="Edit profile photo"]')
    expect(overlay.length).toBeGreaterThan(0)
    // Trigger click on overlay button
    const photoBtn = wrapper.findAll('button').find((b) => b.attributes('aria-label') === 'Edit profile photo')
    expect(photoBtn).toBeDefined()
    await photoBtn!.trigger('click')
    expect(wrapper.emitted('edit-photo')).toHaveLength(1)
  })

  it('emite evento delete-account', async () => {
    const wrapper = mount(UserInfo, {
      props: { username: 'John Doe' },
      global: { plugins: [i18n] },
    })
    await wrapper.get('[aria-haspopup="menu"]').trigger('pointerdown')
    await wrapper.get('[aria-haspopup="menu"]').trigger('click')
    await flushPromises()
    const dropdownItems = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
    const delItem = dropdownItems.find((item) => item.text().includes('Delete Account'))
    expect(delItem).toBeDefined()
    await delItem!.trigger('click')
    expect(wrapper.emitted('delete-account')).toHaveLength(1)
  })

  it('emite evento logout', async () => {
    const wrapper = mount(UserInfo, {
      props: { username: 'John Doe' },
      global: { plugins: [i18n] },
    })
    await wrapper.get('[aria-haspopup="menu"]').trigger('pointerdown')
    await wrapper.get('[aria-haspopup="menu"]').trigger('click')
    await flushPromises()
    const dropdownItems = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
    const logoutItem = dropdownItems.find((item) => item.text().includes('Sign Out'))
    expect(logoutItem).toBeDefined()
    await logoutItem!.trigger('click')
    expect(wrapper.emitted('logout')).toHaveLength(1)
  })

  it('emite evento change-password', async () => {
    const wrapper = mount(UserInfo, {
      props: { username: 'John Doe' },
      global: { plugins: [i18n] },
    })
    await wrapper.get('[aria-haspopup="menu"]').trigger('pointerdown')
    await wrapper.get('[aria-haspopup="menu"]').trigger('click')
    await flushPromises()
    const dropdownItems = wrapper.findAllComponents({ name: 'DropdownMenuItem' })
    const pwItem = dropdownItems.find((item) => item.text().includes('Change Password'))
    expect(pwItem).toBeDefined()
    await pwItem!.trigger('click')
    expect(wrapper.emitted('change-password')).toHaveLength(1)
  })
})
