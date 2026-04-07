import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TechCard from '../about/TechCard.vue'
import type { TechItem } from '../about/TechCard.vue'

describe('TechCard.vue', () => {
  const mockItem: TechItem = {
    name: 'Vue 3',
    description: 'Progressive framework',
    url: 'https://vuejs.org',
    styles: 'bg-blue-100 text-blue-700',
  }

  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  it('renderiza o nome e descrição do item', () => {
    const wrapper = mount(TechCard, { props: { item: mockItem } })
    expect(wrapper.text()).toContain('Vue 3')
    expect(wrapper.text()).toContain('Progressive framework')
  })

  it('NÃO renderiza badge quando a prop badge está ausente', () => {
    const wrapper = mount(TechCard, { props: { item: mockItem } })
    expect(wrapper.findAll('span.text-\\[10px\\]')).toHaveLength(0)
  })

  it('renderiza badge quando o item tem badge', () => {
    const itemWithBadge: TechItem = {
      ...mockItem,
      badge: 'Framework',
    }
    const wrapper = mount(TechCard, { props: { item: itemWithBadge } })
    expect(wrapper.text()).toContain('Framework')
  })

  it('abre link externo em nova aba ao clicar', async () => {
    const wrapper = mount(TechCard, { props: { item: mockItem } })
    await wrapper.trigger('click')
    expect(window.open).toHaveBeenCalledWith('https://vuejs.org', '_blank', 'noopener,noreferrer')
  })

  it('abre link externo ao pressionar Enter', async () => {
    const wrapper = mount(TechCard, { props: { item: mockItem } })
    await wrapper.trigger('keydown.enter')
    expect(window.open).toHaveBeenCalledWith('https://vuejs.org', '_blank', 'noopener,noreferrer')
  })

  it('abre link externo ao pressionar Espaço (prevenindo padrão)', async () => {
    const wrapper = mount(TechCard, { props: { item: mockItem } })
    await wrapper.trigger('keydown.space')
    expect(window.open).toHaveBeenCalledWith('https://vuejs.org', '_blank', 'noopener,noreferrer')
  })

  it('define aria-label acessível com nome e descrição', () => {
    const wrapper = mount(TechCard, { props: { item: mockItem } })
    expect(wrapper.attributes('aria-label')).toBe('Vue 3 — Progressive framework')
  })
})
