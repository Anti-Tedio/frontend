import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import AboutView from '@/views/AboutView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      about: {
        subtitle: 'Anti-Boredom started with a simple pet peeve.',
        projectTitle: 'What is Anti-Boredom?',
        projectText1: 'Anti-Boredom is a smart discovery tool.',
        projectText2: 'Our engine analyzes your traits.',
        howTitle: 'Three steps, zero boredom',
        step1Title: 'Set the mood',
        step1Desc: 'Pick personality traits.',
        step2Title: 'Pick a category',
        step2Desc: 'Choose the kind of experience.',
        step3Title: 'Get your pick',
        step3Desc: 'Our AI processes your profile.',
        statsTitle: 'By the numbers',
        stat1Value: '6', stat1Label: 'Categories',
        stat2Value: '10+', stat2Label: 'APIs',
        stat3Value: '2', stat3Label: 'Languages',
        stat4Value: '∞', stat4Label: 'Recommendations',
        backendTitle: 'Backend Stack',
        frontendTitle: 'Frontend Stack',
        apisTitle: 'Integrations & APIs',
        assetsTitle: 'Resources & Credits',
        repoFrontendTitle: 'Frontend Repository',
        repoFrontendDesc: 'Vue 3 · TypeScript',
        repoBackendTitle: 'Backend Repository',
        repoBackendDesc: 'Bun · Hono',
        viewSource: 'View source code',
        creatorHeading: 'Built by',
        creatorBio: 'I am a developer who loves building digital experiences.',
        creatorRole: 'Full-Stack Developer & Founder',
        copyright: '© {year} Anti-Boredom.',
        iconCredits: 'Icons by {lucide} and {svgrepo}',
        externalLinkLabel: 'Open {name} website',
        ctaButton: 'Get started',
        ctaLabel: 'Go to the app',
      },
      nav: { home: 'Home' },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('AboutView.vue', () => {
  it('renderiza o subtítulo', () => {
    const wrapper = shallowMount(AboutView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Anti-Boredom started')
  })

  it('renderiza a seção "O que é"', () => {
    const wrapper = shallowMount(AboutView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('What is Anti-Boredom?')
  })

  it('renderiza as 3 etapas do processo', () => {
    const wrapper = shallowMount(AboutView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Set the mood')
    expect(wrapper.html()).toContain('Pick a category')
    expect(wrapper.html()).toContain('Get your pick')
  })

  it('renderiza os títulos das stacks de tecnologia', () => {
    const wrapper = shallowMount(AboutView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Backend Stack')
    expect(wrapper.html()).toContain('Frontend Stack')
    expect(wrapper.html()).toContain('Integrations')
  })

  it('renderiza os repositórios', () => {
    const wrapper = shallowMount(AboutView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Frontend Repository')
    expect(wrapper.html()).toContain('Backend Repository')
  })

  it('renderiza a seção do criador', () => {
    const wrapper = shallowMount(AboutView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Built by')
  })
})