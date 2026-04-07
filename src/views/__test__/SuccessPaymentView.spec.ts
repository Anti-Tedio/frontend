import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import SuccessPaymentView from '@/views/SuccessPaymentView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      paymentSuccess: {
        title: 'Payment Confirmed!',
        subtitle: 'Your transaction was completed successfully.',
        startExploring: 'Start Exploring',
        startExploringLabel: 'Start exploring recommendations',
      },
    },
  },
})

describe('SuccessPaymentView.vue', () => {
  it('renderiza o texto do título', () => {
    const wrapper = shallowMount(SuccessPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Payment Confirmed!')
  })

  it('renderiza o texto do subtítulo', () => {
    const wrapper = shallowMount(SuccessPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('transaction was completed successfully')
  })

  it('renderiza o botão de começar a explorar', () => {
    const wrapper = shallowMount(SuccessPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Start Exploring')
  })

  it('mostra ícone de sucesso via componente CheckIcon', () => {
    const wrapper = shallowMount(SuccessPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('status')
  })
})
