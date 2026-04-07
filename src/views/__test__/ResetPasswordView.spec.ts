import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      resetPassword: {
        title: 'Nova Senha',
        subtitle: 'Crie uma senha forte para recuperar seu acesso ao {brand}.',
        invalidLink: 'Este link é inválido ou expirado.',
        backToHome: 'Voltar para Home',
        newPasswordLabel: 'Nova Senha',
        newPasswordPlaceholder: 'Sua nova senha',
        confirmPasswordLabel: 'Confirmar Senha',
        confirmPasswordPlaceholder: 'Repita sua senha',
        submitButton: 'Redefinir Senha',
        updating: 'Atualizando...',
        rememberedPassword: 'Lembrou a senha?',
        signIn: 'Entrar',
        validationMin: 'A senha deve ter pelo menos 8 caracteres',
        validationUppercase: 'Adicione pelo menos uma letra maiúscula',
        validationNumber: 'Adicione pelo menos um número',
        validationMatch: 'As senhas não coincidem',
      },
      auth: { showPassword: 'Mostrar senha', hidePassword: 'Esconder senha' },
    },
  },
})

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' }, name: 'home' },
      { path: '/reset-password', component: { template: '<div />' }, name: 'reset' },
    ],
  })
}

describe('ResetPasswordView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.removeItem('cookie_consent')
  })

  it('renderiza o cabeçalho do card', () => {
    const wrapper = shallowMount(ResetPasswordView, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Nova Senha')
  })

  it('renderiza o subtítulo com o nome da marca', () => {
    const wrapper = shallowMount(ResetPasswordView, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Crie uma senha forte')
  })

  it('renderiza o formulário com campos de senha', () => {
    const wrapper = shallowMount(ResetPasswordView, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Nova Senha')
    expect(wrapper.html()).toContain('Confirmar Senha')
  })

  it('renderiza o botão de redefinir senha', () => {
    const wrapper = shallowMount(ResetPasswordView, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Redefinir Senha')
  })

  it('renderiza o link "Lembrou a senha?"', () => {
    const wrapper = shallowMount(ResetPasswordView, {
      global: { plugins: [i18n, createTestRouter()] },
    })
    expect(wrapper.html()).toContain('Lembrou a senha?')
  })
})