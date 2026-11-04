import { describe, it, expect } from 'vitest'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CreditsExhaustedDialog from '@/components/CreditsExhaustedDialog.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      credits: {
        dialog: { title: "You're out of credits", buyCredits: 'Buy credits' },
        waitOrBuy: {
          description: 'Watch a quick video...',
          rechargeSoon: 'Recharge soon',
          rechargeNote: 'Credits will be available soon',
          wait: 'Wait',
        },
        watchOrBuy: { watchAd: 'Watch video' },
      },
      common: { or: 'or' },
    },
  },
})

describe('CreditsExhaustedDialog.vue', () => {
  it('renderiza quando open é true', () => {
    const wrapper = shallowMount(CreditsExhaustedDialog, {
      props: { open: true },
      global: { plugins: [i18n], stubs: { Dialog: true, DialogContent: true, DialogHeader: true, DialogTitle: true, DialogDescription: true, Button: true } },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders when open is false', () => {
    const wrapper = shallowMount(CreditsExhaustedDialog, {
      props: { open: false },
      global: { plugins: [i18n], stubs: { Dialog: true, DialogContent: true, DialogHeader: true, DialogTitle: true, DialogDescription: true, Button: true } },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('emits buy-credits on button click', async () => {
    const wrapper = mount(CreditsExhaustedDialog, {
      props: { open: true },
      global: { plugins: [i18n] },
    })
    await flushPromises()
    const buyBtn = wrapper.findAllComponents({ name: 'Button' }).find((b) => b.text().includes('Buy credits'))
    expect(buyBtn).toBeDefined()
    await buyBtn!.trigger('click')
    expect(wrapper.emitted('buy-credits')).toHaveLength(1)
  })

  it('mantém o botão de vídeo desabilitado', async () => {
    const wrapper = mount(CreditsExhaustedDialog, {
      props: { open: true },
      global: { plugins: [i18n] },
    })
    await flushPromises()
    const watchBtn = wrapper.findAllComponents({ name: 'Button' }).find((b) => b.text().includes('Watch video'))
    expect(watchBtn).toBeDefined()
    expect(watchBtn!.attributes('disabled')).toBeDefined()
    await watchBtn!.trigger('click')
    expect(wrapper.emitted('watch-ad')).toBeUndefined()
  })
})
