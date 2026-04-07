import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import EditPerson from '@/components/Profile/EditPerson.vue'
import usePersonsStore from '@/stores/persons.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      editPerson: {
        title: 'Select your personality traits',
        subtitle: 'Choose between 3 and 8 traits.',
        doneButton: 'Done',
        saveAriaLabel: 'Save selected traits',
        closeAriaLabel: 'Close',
        traitsLabel: 'Personality traits',
      },
      infoPerson: { triggerLabel: 'More details' },
      badgePerson: { selected: '{trait} — selected', unselected: '{trait} — select' },
    },
  },
})

describe('EditPerson.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = usePersonsStore()
    store.persons = [
      { id: 1, trait: { en: 'Creative', pt: 'Criativo' }, icon: '\ud83c\udfa8', desc: { en: 'Likes art' }, isActive: false },
      { id: 2, trait: { en: 'Logical', pt: 'L\u00f3gico' }, icon: '\ud83e\udde0', desc: { en: 'Likes logic' }, isActive: true },
    ]
  })

  it('renderiza a estrutura do diálogo', () => {
    const wrapper = shallowMount(EditPerson, { global: { plugins: [i18n] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('expõe isOpen via defineExpose', () => {
    const wrapper = mount(EditPerson, { global: { plugins: [i18n] } })
    expect(wrapper.vm.isOpen).toBe(false)
  })
})
