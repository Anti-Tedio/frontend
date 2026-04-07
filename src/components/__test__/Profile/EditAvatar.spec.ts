import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'
import EditAvatar from '@/components/Profile/EditAvatar.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      editAvatar: {
        dialogTitle: 'Profile Photo',
        previewLabel: 'Profile photo preview',
        newPhotoLabel: 'New photo selected',
        newBadge: 'NEW',
        dropzoneLabel: 'Click or drag an image',
        dropzoneActive: 'Drop here',
        dropzoneText: 'Click or drag',
        dropzoneHint: 'JPEG, PNG or WebP \u00b7 max 5MB',
        errorFormat: 'Invalid format. Please use JPEG, PNG, or WebP.',
        errorSize: 'Image too large. Maximum size is {max}MB.',
        discard: 'Discard',
        discardLabel: 'Discard selected photo',
        confirm: 'Confirm',
        confirmLabel: 'Confirm and upload photo',
        uploading: 'Uploading\u2026',
        cancel: 'Cancel',
        cancelLabel: 'Cancel and close dialog',
      },
    },
  },
})

describe('EditAvatar.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza a estrutura do componente', () => {
    const wrapper = shallowMount(EditAvatar, { global: { plugins: [i18n] } })
    expect(wrapper.exists()).toBe(true)
  })

  it('expõe a propriedade isOpen', () => {
    const wrapper = mount(EditAvatar, { global: { plugins: [i18n] } })
    expect(wrapper.vm.isOpen).toBe(false)
  })
})
