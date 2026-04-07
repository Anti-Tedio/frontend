import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import BadgePersonComponent from '../BadgePersonComponent.vue'
import type { Person } from '@/types'
import usePersonsStore from '@/stores/persons.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      badgePerson: { selected: '{trait} \u2014 selected', unselected: '{trait} \u2014 click to select' },
      infoPerson: { triggerLabel: 'More details' },
    },
  },
})

describe('BadgePersonComponent.vue', () => {
  const makePerson = (overrides: Partial<Person> = {}): Person => ({
    id: 1,
    trait: { en: 'Creative', pt: 'Criativo' },
    icon: '\ud83c\udfa8',
    desc: { en: 'Likes art', pt: 'Gosta de arte' },
    isActive: false,
    ...overrides,
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza o nome da trait no locale correto', () => {
    const wrapper = mount(BadgePersonComponent, {
      props: { person: makePerson() },
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('Creative')
  })

  it('renderiza o emoji do ícone da trait', () => {
    const wrapper = mount(BadgePersonComponent, {
      props: { person: makePerson() },
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('\ud83c\udfa8')
  })

  it('aplica classes ativas quando person.isActive é true', () => {
    const wrapper = mount(BadgePersonComponent, {
      props: { person: makePerson({ isActive: true }) },
      global: { plugins: [i18n] },
    })
    expect(wrapper.html()).toContain('bg-primary')
    expect(wrapper.html()).toContain('text-white')
  })

  it('aplica classes inativas quando person.isActive é false', () => {
    const wrapper = mount(BadgePersonComponent, {
      props: { person: makePerson({ isActive: false }) },
      global: { plugins: [i18n] },
    })
    expect(wrapper.html()).toContain('bg-white')
    expect(wrapper.html()).toContain('border-primary/20')
  })

  it('fica desabilitado quando 8 traits já estão selecionadas e a pessoa está inativa', async () => {
    const store = usePersonsStore()
    store.persons = Array.from({ length: 8 }, (_, i) => makePerson({ id: i + 1, isActive: true }))
    const wrapper = mount(BadgePersonComponent, {
      props: { person: makePerson({ isActive: false, id: 99 }) },
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('button').attributes('disabled')).toBe('')
    expect(wrapper.html()).toContain('pointer-events-none')
  })

  it('NÃO fica desabilitado quando a pessoa já está ativa (mesmo com 8 selecionadas)', async () => {
    const store = usePersonsStore()
    store.persons = Array.from({ length: 8 }, (_, i) => makePerson({ id: i + 1, isActive: true }))
    const wrapper = mount(BadgePersonComponent, {
      props: { person: makePerson({ isActive: true, id: 1 }) },
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('button').attributes('disabled')).toBe(undefined)
  })

  it('alterna a ativação da pessoa ao clicar', () => {
    const store = usePersonsStore()
    const person = makePerson({ id: 1 })
    store.persons = [person]
    const wrapper = mount(BadgePersonComponent, {
      props: { person },
      global: { plugins: [i18n] },
    })
    wrapper.find('button').trigger('click')
    expect(store.persons[0]!.isActive).toBe(true)
  })
})
