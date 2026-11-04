import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import Book from '@/components/Results/Book.vue'
import type { Suggestion } from '@/types'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      book: {
        by: 'by',
        publishedIn: 'Published in',
        synopsis: 'Synopsis',
        readSample: 'Read a Sample',
        readSampleLabel: 'Read free sample',
        coverLabel: 'Cover of {title}',
        coverAlt: 'Cover of {title}',
        genresLabel: 'Genres',
        showLess: 'Show less',
        readMore: 'Read more',
      },
    },
  },
})

describe('Book.vue', () => {
  const mockBook: Suggestion = {
    id: 'b1',
    title: '1984',
    img: 'https://example.com/cover.jpg',
    plot: 'A dystopian novel about totalitarian surveillance.',
    year: '1949',
    creator: 'George Orwell',
    categoryId: 3,
    genres: ['Dystopian', 'Political fiction'],
    link: 'https://books.google.com/sample/1984',
  }

  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  it('renderiza título e criador', () => {
    const wrapper = mount(Book, { props: { book: mockBook }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('1984')
    expect(wrapper.text()).toContain('George Orwell')
  })

  it('renderiza a imagem da capa do livro', () => {
    const wrapper = mount(Book, { props: { book: mockBook }, global: { plugins: [i18n] } })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/cover.jpg')
  })

  it('renderiza os gêneros', () => {
    const wrapper = mount(Book, { props: { book: mockBook }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Dystopian')
    expect(wrapper.text()).toContain('Political fiction')
  })

  it('clica em "Ler mais" para alternar sinopse', async () => {
    const wrapper = mount(Book, { props: { book: mockBook }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Read more')
  })

  it('abre link de amostra ao clicar no botão', async () => {
    const wrapper = mount(Book, { props: { book: mockBook }, global: { plugins: [i18n] } })
    const buttons = wrapper.findAll('button')
    const sampleBtn = buttons.find((b) => b.text().includes('Read a Sample'))
    expect(sampleBtn).toBeDefined()
    await sampleBtn!.trigger('click')
    expect(window.open).toHaveBeenCalled()
  })

  it('mostra texto de data de publicação', () => {
    const wrapper = mount(Book, { props: { book: mockBook }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Published in')
  })

  it('mostra conteúdo da sinopse', () => {
    const wrapper = mount(Book, { props: { book: mockBook }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('dystopian')
  })
})
