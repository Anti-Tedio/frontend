<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const visible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent')
  if (!consent) {
    visible.value = true
  }
})

function acceptAll() {
  localStorage.setItem('cookie_consent', 'all')
  visible.value = false
}

function acceptEssential() {
  localStorage.setItem('cookie_consent', 'essential')
  visible.value = false
}
</script>

<template>
  <Transition name="cookie-slide">
    <div
      v-if="visible"
      role="dialog"
      aria-modal="false"
      :aria-label="t('cookieConsent.ariaLabel')"
      class="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 py-4 sm:py-5"
    >
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-800 mb-1">{{ t('cookieConsent.title') }}</p>
          <p class="text-xs text-gray-500 leading-relaxed">
            {{ t('cookieConsent.description') }}
            <a
              href="/privacy"
              class="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >{{ t('cookieConsent.learnMore') }}</a>.
          </p>
        </div>
        <div class="flex flex-shrink-0 gap-2 flex-wrap sm:flex-nowrap">
          <button
            class="flex-1 sm:flex-none text-xs font-semibold px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            @click="acceptEssential"
          >
            {{ t('cookieConsent.essential') }}
          </button>
          <button
            class="flex-1 sm:flex-none text-xs font-semibold px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all shadow-sm shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            @click="acceptAll"
          >
            {{ t('cookieConsent.acceptAll') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-slide-enter-active,
.cookie-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.cookie-slide-enter-from,
.cookie-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
