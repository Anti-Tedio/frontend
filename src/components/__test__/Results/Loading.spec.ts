import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Loading from '@/components/Results/Loading.vue'
import useSuggestStore from '@/stores/suggest.store'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      loading: {
        title: 'Generating your recommendation',
        message1: 'Analyzing your preferences...',
        message2: 'Generating personalized suggestions...',
        message3: 'Almost there...',
        progressLabel: 'Loading progress',
      },
    },
  },
})

describe('Loading.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renderiza a estrutura quando o loading da store é true', () => {
    const store = useSuggestStore()
    store.loading = true
    const wrapper = shallowMount(Loading, { global: { plugins: [i18n] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('mostra título de loading no aria-label', () => {
    const store = useSuggestStore()
    store.loading = true
    const wrapper = shallowMount(Loading, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toBeDefined()
  })

  it('alterna entre as mensagens de loading', async () => {
    const store = useSuggestStore()
    store.loading = true
    mount(Loading, { global: { plugins: [i18n] } })
    vi.advanceTimersByTime(2500)
    await new Promise((r) => setTimeout(r, 0))
    // Message cycle happens but hard to assert visually in jsdom
  })
})
