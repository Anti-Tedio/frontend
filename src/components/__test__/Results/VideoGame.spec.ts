import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import VideoGame from '../../Results/VideoGame.vue'
import type { SuggestVideoGame } from '@/types/suggest'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      videoGame: {
        availableOn: 'Available on {store}',
        buyNow: 'Buy Now',
        buyNowLabel: 'Buy {title} on {store} for {price}',
        score: 'Score',
        criticScore: 'Critic score: {score}',
        coverAlt: 'Cover',
      },
    },
  },
})

describe('VideoGame.vue', () => {
  const mockGame: SuggestVideoGame = {
    id: '1',
    title: 'Hollow Knight',
    img: 'https://example.com/hollow-knight.jpg',
    plot: 'A vast, ruined kingdom awaits beneath the fading town of Dirtmouth.',
    year: '2017-02-24',
    creator: 'Team Cherry',
    genres: ['Metroidvania', 'Indie', 'Action'],
    rating: '9.2',
    categoryId: 1,
    price: { store: 'Steam', price: 39.99, idSteam: 367520 },
  }

  it('renderiza o título do jogo', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Hollow Knight')
  })

  it('renderiza o nome do criador', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Team Cherry')
  })

  it('renderiza a capa', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/hollow-knight.jpg')
  })

  it('renderiza os gêneros', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Metroidvania')
    expect(wrapper.text()).toContain('Indie')
    expect(wrapper.text()).toContain('Action')
  })

  it('renderiza a pontuação/classificação', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('9.2')
    expect(wrapper.text()).toContain('Score')
  })

  it('possui link de compra apontando para Steam quando a loja é Steam', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    const link = wrapper.find('a[href="https://store.steampowered.com/app/367520"]')
    expect(link.exists()).toBe(true)
  })

  it('possui link de compra apontando para GOG quando a loja é GOG', () => {
    const gameGog = { ...mockGame, price: { ...mockGame.price, store: 'gog', idSteam: 0 } }
    const wrapper = mount(VideoGame, { props: { game: gameGog }, global: { plugins: [i18n] } })
    const link = wrapper.find('a[href="https://www.gog.com/game/Hollow_Knight"]')
    expect(link.exists()).toBe(true)
  })

  it('formata o preço em BRL', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('R$')
  })

  it('renderiza o texto do botão "Comprar Agora"', () => {
    const wrapper = mount(VideoGame, { props: { game: mockGame }, global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Buy Now')
  })
})
