import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import DeleteAccountView from '@/views/DeleteAccountView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      deleteAccount: {
        title: 'Deletar minha conta',
        subtitle: 'Entenda o que acontecerá com seus dados.',
        creditsTitle: 'Créditos Perdidos',
        creditsDesc: 'Todos os créditos comprados e não usados serão removidos.',
        historyTitle: 'Histórico e Preferências',
        historyDesc: 'Suas sugestões personalizadas e histórico serão apagados.',
        dataTitle: 'Dados Pessoais',
        dataDesc: 'Suas informações de perfil e configurações serão removidas.',
        importantNote: 'Sua conta não será deletada imediatamente. Ela ficará suspensa por {days}.',
        important: 'Importante:',
        thirtyDays: '30 dias',
        emailWord: 'e-mail',
        whatYouLose: 'O que você vai perder',
        proceedButton: 'Prosseguir com Deleção',
        cancelButton: 'Mudei de ideia, manter minha conta',
        modalTitle: 'Confirmação Final',
        modalDesc: 'Para confirmar a deleção, digite {word} abaixo.',
        deleteWord: 'DELETAR',
        deleteWordDisplay: '"DELETAR"',
        confirmButton: 'Confirmar Deleção',
        deleting: 'Deletando...',
        inputPlaceholder: 'Digite aqui...',
        inputHint: 'Digite a palavra DELETAR em letras maiúsculas',
      },
    },
  },
})

function createTestRouter() {
  return createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] })
}

describe('DeleteAccountView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza o título da página', () => {
    const wrapper = shallowMount(DeleteAccountView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Deletar minha conta')
  })

  it('mostra as três seções do que será perdido', () => {
    const wrapper = mount(DeleteAccountView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('Créditos Perdidos')
    expect(wrapper.html()).toContain('Histórico e Preferências')
    expect(wrapper.html()).toContain('Dados Pessoais')
  })

  it('renderiza o botão de prosseguir com deleção', () => {
    const wrapper = shallowMount(DeleteAccountView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('proceedButton')
  })

  it('renderiza o botão de cancelar', () => {
    const wrapper = shallowMount(DeleteAccountView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('cancelButton')
  })

  it('mostra aviso sobre os 30 dias', () => {
    const wrapper = mount(DeleteAccountView, { global: { plugins: [i18n, createTestRouter()] } })
    expect(wrapper.html()).toContain('30 dias')
  })

  it('possui elemento main com id de heading', () => {
    const wrapper = mount(DeleteAccountView, { global: { plugins: [i18n, createTestRouter()] } })
    const main = wrapper.find('[aria-labelledby="delete-account-heading"]')
    expect(main.exists()).toBe(true)
  })
})