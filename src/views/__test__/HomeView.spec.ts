import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import HomeView from '@/views/HomeView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      home: {
        badge: 'AI-powered leisure discovery',
        title: 'Your {boredom} ends here.',
        boredomWord: 'boredom',
        subtitle: '{brand} is your personal leisure assistant.',
        ctaButton: 'Discover what to do',
        ctaLabel: 'Start discovering activities',
        featuresHeading: 'Why Anti-Tédio?',
        feature1Title: 'Instant Suggestions',
        feature1Desc: 'Get activity ideas in seconds.',
        feature2Title: 'Fully Personalized',
        feature2Desc: 'Our AI learns your preferences.',
        feature3Title: 'Activity History',
        feature3Desc: 'All your past recommendations are saved.',
      },
      nav: { home: 'Home' },
    },
  },
})

describe('HomeView.vue', () => {
  it('renderiza o texto do badge', () => {
    const wrapper = shallowMount(HomeView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('AI-powered leisure discovery')
  })

  it('renderiza o botão CTA', () => {
    const wrapper = shallowMount(HomeView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Discover what to do')
  })

  it('renderiza 3 CardComponents (cards de recurso)', () => {
    const wrapper = mount(HomeView, { global: { plugins: [i18n] } })
    const cards = wrapper.findAll('[aria-label="Feature card"]')
    expect(cards).toHaveLength(3)
  })

  it('renderiza os títulos dos recursos', () => {
    const wrapper = shallowMount(HomeView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Instant Suggestions')
    expect(wrapper.html()).toContain('Fully Personalized')
    expect(wrapper.html()).toContain('Activity History')
  })

  it('possui heading oculta para acessibilidade', () => {
    const wrapper = mount(HomeView, { global: { plugins: [i18n] } })
    const srHeading = wrapper.findAll('h2').find((h) => h.attributes('id') === 'features-heading')
    expect(srHeading).toBeDefined()
  })

  it('possui elemento de heading do hero', () => {
    const wrapper = shallowMount(HomeView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('id="hero-heading"')
  })
})
