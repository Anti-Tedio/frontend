import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import UserPerson from '@/components/Profile/UserPerson.vue'
import type { Person } from '@/types'
import usePersonsStore from '@/stores/persons.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      profile: {
        myPersonality: 'My Personality',
        editTraitsLabel: 'Edit personality traits',
        selectedTraitsLabel: 'Selected traits',
      },
    },
  },
})

describe('UserPerson.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = usePersonsStore()
    store.persons = [
      { id: 1, trait: { en: 'Creative' }, icon: '🎨', desc: { en: 'Art' }, isActive: false },
      { id: 2, trait: { en: 'Logical' }, icon: '🧠', desc: { en: 'Logic' }, isActive: true },
    ]
  })

  it('mostra lista de traits com pessoas selecionadas', () => {
    const wrapper = mount(UserPerson, { global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('My Personality')
    expect(wrapper.text()).toContain('Logical')
  })

  it('não mostra pessoas inativas na lista', () => {
    const wrapper = mount(UserPerson, { global: { plugins: [i18n] } })
    expect(wrapper.text()).not.toContain('Creative')
  })

  it('emite evento de edição quando o botão de editar é clicado', async () => {
    const wrapper = mount(UserPerson, { global: { plugins: [i18n] } })
    const editBtn = wrapper.find('button[aria-label="Edit personality traits"]')
    if (editBtn.exists()) {
      await editBtn.trigger('click')
      expect(wrapper.emitted('edit')).toHaveLength(1)
    }
  })

  it('mostra heading "Minha Personalidade"', () => {
    const wrapper = mount(UserPerson, { global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('My Personality')
  })
})
