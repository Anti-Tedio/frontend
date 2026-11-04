import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import FailurePaymentView from '@/views/FailurePaymentView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      paymentFailure: {
        title: 'Something went wrong',
        subtitle: 'Unfortunately, we couldn\'t process your payment.',
        reasonsTitle: 'Common reasons:',
        reason1: 'Insufficient balance or card limit reached.',
        reason2: 'Incorrect card details entered.',
        reason3: 'Transaction declined by the issuing bank.',
        noCharge: 'No charges were made to your card.',
        reasonsLabel: 'Common reasons for payment failure',
      },
    },
  },
})

describe('FailurePaymentView.vue', () => {
  it('renderiza o texto do título', () => {
    const wrapper = shallowMount(FailurePaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Something went wrong')
  })

  it('renderiza a lista de motivos', () => {
    const wrapper = shallowMount(FailurePaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Insufficient balance')
    expect(wrapper.html()).toContain('Incorrect card details')
    expect(wrapper.html()).toContain('Transaction declined')
  })

  it('mostra aviso de "sem cobrança"', () => {
    const wrapper = shallowMount(FailurePaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('No charges were made')
  })

  it('possui aside com rótulo de motivos', () => {
    const wrapper = shallowMount(FailurePaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Common reasons')
  })
})
