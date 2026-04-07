import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardComponent from '../CardComponent.vue'

describe('CardComponent.vue', () => {
  const defaultProps = {
    icon: 'star',
    title: 'Test Title',
    desc: 'Test description',
  }

  it('renderiza título e descrição passados via props', () => {
    const wrapper = mount(CardComponent, { props: defaultProps })
    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test description')
  })

  it('renderiza a prop icon dentro do elemento de ícone material-symbols', () => {
    const wrapper = mount(CardComponent, { props: defaultProps })
    const iconSpan = wrapper.find('i.material-symbols-rounded')
    expect(iconSpan.exists()).toBe(true)
    expect(iconSpan.text()).toBe('star')
  })

  it('possui aria-label correto para acessibilidade', () => {
    const wrapper = mount(CardComponent, { props: defaultProps })
    expect(wrapper.attributes('aria-label')).toBe('Feature card')
  })

  it('aplica classes base do tailwind', () => {
    const wrapper = mount(CardComponent, { props: defaultProps })
    const article = wrapper.find('article')
    expect(article.classes()).toContain('rounded-2xl')
    expect(article.classes()).toContain('shadow-md')
  })

  it('updates content dynamically when props change', async () => {
    const wrapper = mount(CardComponent, { props: defaultProps })
    await wrapper.setProps({ icon: 'rocket', title: 'New Title', desc: 'New desc' })
    expect(wrapper.text()).toContain('New Title')
    expect(wrapper.text()).toContain('New desc')
    expect(wrapper.find('i.material-symbols-rounded').text()).toBe('rocket')
  })
})
