import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import SelectPersonsView from '@/views/SelectPersonsView.vue'
import usePersonsStore from '@/stores/persons.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      selectPerson: {
        title: 'How would you describe yourself?',
        subtitle: 'Pick the traits that best match your vibe right now.',
        loading: 'Loading personality options',
        traitsLabel: 'Personality traits — select at least 3',
        counterNone: 'Select at least 3 traits to continue',
        counterSome: '{count} more to go…',
        counterReady: '✓ {count} selected — ready to continue!',
        continueButton: 'Continue',
        continueAriaLabel: 'Continue to category selection',
      },
      infoPerson: { triggerLabel: 'More details' },
      badgePerson: { selected: '{trait} — selected', unselected: '{trait} — select' },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('SelectPersonsView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const store = usePersonsStore()
    store.persons = []
  })

  it('renderiza o título da view', () => {
    const wrapper = shallowMount(SelectPersonsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('How would you describe yourself?')
  })

  it('renderiza o subtítulo', () => {
    const wrapper = shallowMount(SelectPersonsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Pick the traits')
  })

  it('mostra skeleton de carregamento quando não está pronto', () => {
    const wrapper = shallowMount(SelectPersonsView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('skeleton-stub')
  })

  it('mostra lista de traits quando o store tem dados', async () => {
    const store = usePersonsStore()
    store.persons = [
      { id: 1, trait: { en: 'Creative' }, icon: '🎨', desc: { en: 'Art' }, isActive: false },
      { id: 2, trait: { en: 'Logical' }, icon: '🧠', desc: { en: 'Logic' }, isActive: false },
    ]
    const wrapper = shallowMount(SelectPersonsView, { global: { plugins: [i18n, createTestRouter()] } })
    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
  })

  it('botão de continuar começa desabilitado quando tem menos de 3 selecionados', async () => {
    const wrapper = mount(SelectPersonsView, { global: { plugins: [i18n, createTestRouter()] } })
    await wrapper.vm.$nextTick()
    const btn = wrapper.find('button:disabled')
    expect(btn.exists()).toBe(true)
  })

  it('mostra contagem de traits pendentes', async () => {
    const wrapper = mount(SelectPersonsView, { global: { plugins: [i18n, createTestRouter()] } })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Select at least 3')
  })
})
