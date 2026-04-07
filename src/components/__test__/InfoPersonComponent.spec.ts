import { describe, it, expect, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import InfoPersonComponent from '../InfoPersonComponent.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      infoPerson: {
        triggerLabel: 'More details about this trait',
        dialogTitle: 'About this trait',
        closeLabel: 'Close details',
      },
    },
  },
})

describe('InfoPersonComponent.vue', () => {
  it('renderiza com a prop active true', () => {
    const wrapper = shallowMount(InfoPersonComponent, {
      props: { info: 'This trait means the person is very creative.', active: true },
      global: { plugins: [i18n] },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza com a prop active false', () => {
    const wrapper = shallowMount(InfoPersonComponent, {
      props: { info: 'Some description.', active: false },
      global: { plugins: [i18n] },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('possui botão de gatilho acessível com aria-label correto', () => {
    const wrapper = mount(InfoPersonComponent, {
      props: { info: 'Description here.', active: false },
      global: { plugins: [i18n] },
    })
    const trigger = wrapper.find('button[aria-label]')
    expect(trigger.exists()).toBe(true)
    expect(trigger.attributes('aria-label')).toBe('More details about this trait')
  })

  it('contém ícone Info do lucide', () => {
    const wrapper = mount(InfoPersonComponent, {
      props: { info: 'Test info.', active: false },
      global: { plugins: [i18n] },
    })
    expect(wrapper.html()).toContain('lucide')
  })
})
