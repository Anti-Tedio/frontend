import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import PendingPaymentView from '@/views/PendingPaymentView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      paymentPending: {
        title: 'Almost there!',
        subtitle: 'We\'re waiting for your payment confirmation.',
        pixTitle: 'Pix Copy & Paste Code',
        pixCodeLabel: 'Pix code',
        pixCopyLabel: 'Copy Pix code',
        pixNote: 'After payment, access will be released.',
        checkButton: 'I paid \u2014 check now',
        checkButtonLabel: 'Check payment status',
        backButton: 'Back to home',
      },
    },
  },
})

describe('PendingPaymentView.vue', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
    setActivePinia(createPinia())
  })

  it('renderiza o texto do título', () => {
    const wrapper = mount(PendingPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Almost there!')
  })

  it('renderiza o texto do subtítulo', () => {
    const wrapper = mount(PendingPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('waiting for your payment confirmation')
  })

  it('renderiza o rótulo do código pix', () => {
    const wrapper = mount(PendingPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Pix code')
  })

  it('renderiza o botão de voltar para a página inicial', () => {
    const wrapper = mount(PendingPaymentView, { global: { plugins: [i18n] } })
    expect(wrapper.text()).toContain('Back to home')
  })
})
