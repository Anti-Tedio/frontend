import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import Midia from '@/components/Results/Midia.vue'
import type { SuggestMidia } from '@/types/suggest'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      midia: {
        synopsis: 'Synopsis',
        availableOn: 'Available on',
        showLess: 'Show less',
        readMore: 'Read more',
        loadingLabel: 'Loading recommendation',
      },
    },
  },
})

describe('Midia.vue', () => {
  const mockMidia: SuggestMidia = {
    id: '1',
    title: 'Inception',
    img: 'https://example.com/poster.jpg',
    plot: 'A mind-bending thriller about dream invasion that explores the boundaries of human consciousness.',
    year: '2010',
    creator: 'Christopher Nolan',
    rating: '8.8',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    platforms: ['Netflix', 'Amazon Prime'],
    categoryId: 1,
  }

  it('renderiza o título', () => {
    const wrapper = mount(Midia, { props: { midia: mockMidia }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Inception')
  })

  it('renderiza a imagem', () => {
    const wrapper = mount(Midia, { props: { midia: mockMidia }, global: { plugins: [i18n] } })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/poster.jpg')
  })

  it('renderiza os gêneros', () => {
    const wrapper = mount(Midia, { props: { midia: mockMidia }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Action')
    expect(wrapper.text()).toContain('Sci-Fi')
    expect(wrapper.text()).toContain('Thriller')
  })

  it('renderiza as plataformas', () => {
    const wrapper = mount(Midia, { props: { midia: mockMidia }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Netflix')
    expect(wrapper.text()).toContain('Amazon Prime')
  })

  it('mostra skeleton quando midia é null/undefined', () => {
    const wrapper = mount(Midia, { props: { midia: null as any }, global: { plugins: [i18n] } })
    expect(wrapper.find('[aria-busy="true"]').exists()).toBe(true)
  })

  it('mostra botão de "Ler mais" quando não expandido', () => {
    const wrapper = mount(Midia, { props: { midia: mockMidia }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Read more')
  })

  it('alterna a expansão da sinopse quando "Ler mais" é clicado', async () => {
    const wrapper = mount(Midia, { props: { midia: mockMidia }, global: { plugins: [i18n] } })
    const buttons = wrapper.findAll('button')
    const toggleBtn = buttons.find((b) => b.text().includes('Read more'))
    if (toggleBtn) {
      await toggleBtn.trigger('click')
      expect(wrapper.text()).toContain('Show less')
    }
  })

  it('renderiza o texto do enredo', () => {
    const wrapper = mount(Midia, { props: { midia: mockMidia }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('mind-bending thriller')
  })
})
