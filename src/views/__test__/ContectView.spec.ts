import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import ContectView from '@/views/ContectView.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      contact: {
        badge: 'Contact us',
        title: 'Get in ',
        titleHighlight: 'touch',
        subtitle: 'Have any questions, suggestions, or want to collaborate?',
        emailLabel: 'E-mail',
        hoursLabel: 'Response time',
        hoursValue: 'Mon – Fri, 9 AM to 6 PM',
        locationLabel: 'Location',
        locationValue: 'São Paulo, Brazil',
        successTitle: 'Message sent!',
        sendAnother: 'Send another message',
        errorTitle: 'Error sending',
        tryAgain: 'Try again',
        formName: 'Name',
        formNamePlaceholder: 'Your name',
        formEmail: 'E-mail',
        formEmailPlaceholder: 'you@example.com',
        formSubject: 'Subject',
        formSubjectPlaceholder: 'What is it about?',
        formMessage: 'Message',
        formMessagePlaceholder: 'Write your message here...',
        requiredFields: 'Fields with * are required',
        sendButton: 'Send message',
        sending: 'Sending...',
        validationName: 'Name must be at least 2 characters',
        validationEmail: 'Invalid e-mail',
        validationSubject: 'Subject must be at least 3 characters',
        validationMessage: 'Message must be at least 10 characters',
        genericError: 'Failed to send the message.',
      },
    },
  },
})

describe('ContectView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza o cabeçalho de contato', () => {
    const wrapper = shallowMount(ContectView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('Get in')
  })

  it('renderiza a estrutura do formulário', () => {
    const wrapper = shallowMount(ContectView, { global: { plugins: [i18n] } })
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('renderiza estrutura de contato', () => {
    const wrapper = shallowMount(ContectView, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toContain('contato@')
  })
})
