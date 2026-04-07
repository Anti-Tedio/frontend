<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import useSuggestStore from '@/stores/suggest.store'
import { Vue3Lottie } from 'vue3-lottie'
import loading from '@/assets/loading.json'

const suggestStore = useSuggestStore()

const messages = ['loading.message1', 'loading.message2', 'loading.message3']
const currentMessageKey = ref(messages[0])
let msgInterval: ReturnType<typeof setInterval>

onMounted(() => {
  let msgIndex = 0
  msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % messages.length
    currentMessageKey.value = messages[msgIndex]
  }, 2500)
})

onUnmounted(() => {
  clearInterval(msgInterval)
})
</script>

<template>
  <Dialog :open="suggestStore.loading">

    <!-- Backdrop overlay -->
    <div class="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm" v-if="suggestStore.loading" aria-hidden="true" />

    <DialogContent class="sm:max-w-120 flex flex-col items-center gap-6 p-10 rounded-3xl border-none shadow-2xl"
      role="dialog" aria-modal="true" :aria-label="$t('loading.title')" :aria-busy="suggestStore.loading">
      <div class="relative flex items-center justify-center" aria-hidden="true">
        <div class="absolute inset-0 bg-primary/30 rounded-full animate-ping opacity-30 scale-110" />
        <div class="relative w-30 h-30 rounded-full flex items-center justify-center">
          <Vue3Lottie class="absolute" :animation-data="loading" :height="300" :width="300" />
        </div>
      </div>

      <div class="text-center space-y-1">
        <h2 class="text-xl font-black text-slate-900 tracking-tight">{{ $t('loading.title') }}</h2>
        <p class="text-sm text-slate-500 transition-all duration-500" aria-live="polite" aria-atomic="true">
          {{ $t(currentMessageKey!) }}
        </p>
      </div>

      <div class="w-full space-y-1">
        <Progress :model-value="suggestStore.progress"
          class="h-2 rounded-full bg-primary/10 transition-all duration-300 ease-in-out"
          :aria-label="$t('loading.progressLabel')" :aria-valuenow="suggestStore.progress" aria-valuemin="0"
          aria-valuemax="100" />
        <p class="text-right text-xs text-slate-400 font-medium">{{ suggestStore.progress }}%</p>
      </div>
    </DialogContent>
  </Dialog>
</template>
