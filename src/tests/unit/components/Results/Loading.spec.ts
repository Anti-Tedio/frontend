import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Loading from '@/components/Results/LoadingResult.vue'
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

function mountLoading() {
  const store = useSuggestStore()
  store.loading = true

  return shallowMount(Loading, {
    global: {
      plugins: [i18n],
      renderStubDefaultSlot: true,
      stubs: { Vue3Lottie: true },
    },
  })
}

describe('Loading.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renderiza o diálogo quando o loading da store é true', () => {
    const wrapper = mountLoading()
    const dialog = wrapper.get('[role="dialog"]')

    expect(dialog.attributes('aria-busy')).toBe('true')
    expect(dialog.text()).toContain('Generating your recommendation')
  })

  it('expõe o título de loading no aria-label', () => {
    const wrapper = mountLoading()

    expect(wrapper.get('[role="dialog"]').attributes('aria-label')).toBe('Generating your recommendation')
  })

  it('alterna entre as mensagens de loading', async () => {
    const wrapper = mountLoading()

    expect(wrapper.text()).toContain('Analyzing your preferences...')

    await vi.advanceTimersByTimeAsync(2500)
    await nextTick()
    expect(wrapper.text()).toContain('Generating personalized suggestions...')

    await vi.advanceTimersByTimeAsync(2500)
    await nextTick()
    expect(wrapper.text()).toContain('Almost there...')

    await vi.advanceTimersByTimeAsync(2500)
    await nextTick()
    expect(wrapper.text()).toContain('Analyzing your preferences...')

    wrapper.unmount()
  })
})
