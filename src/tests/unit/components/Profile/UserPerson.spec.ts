import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import UserPerson from '@/components/Profile/UserPerson.vue'
import type { Person } from '@/types'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      profile: {
        selectedTraitsLabel: 'Selected traits',
      },
    },
  },
})

const persons: Person[] = [
  { id: 1, trait: { en: 'Creative' }, icon: '🎨', desc: { en: 'Art' }, isActive: true },
  { id: 2, trait: { en: 'Logical' }, icon: '🧠', desc: { en: 'Logic' }, isActive: true },
]

function mountUserPerson(personsSelect: Person[]) {
  return mount(UserPerson, {
    props: { personsSelect },
    global: { plugins: [i18n] },
  })
}

describe('UserPerson.vue', () => {
  it('renderiza os traits recebidos na prop personsSelect', () => {
    const wrapper = mountUserPerson(persons)

    expect(wrapper.text()).toContain('Creative')
    expect(wrapper.text()).toContain('Logical')
  })

  it('não renderiza itens quando a lista está vazia', () => {
    const wrapper = mountUserPerson([])

    expect(wrapper.findAll('li')).toHaveLength(0)
    expect(wrapper.text()).toBe('')
  })

  it('usa o locale ativo para exibir o trait', () => {
    const wrapper = mountUserPerson([
      {
        id: 1,
        trait: { en: 'Logical', pt: 'Lógico' },
        icon: '🧠',
        desc: { en: 'Logic', pt: 'Lógica' },
        isActive: true,
      },
    ])

    expect(wrapper.text()).toContain('Logical')
    expect(wrapper.text()).not.toContain('Lógico')
  })

  it('expõe a região de traços selecionados para acessibilidade', () => {
    const wrapper = mountUserPerson(persons)

    const region = wrapper.get('[role="region"][aria-label="Selected traits"]')
    expect(region.find('ul').exists()).toBe(true)
  })
})
