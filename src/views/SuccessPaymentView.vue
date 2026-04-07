<script setup lang="ts">
import router from '@/router/routes'
import { CheckIcon } from 'lucide-vue-next'
const goToApp = () => router.push({ name: 'home' })
</script>

<template>
  <div class="flex justify-center">
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center border border-slate-100 flex flex-col gap-5 max-w-200 mt-10" role="main" aria-labelledby="payment-success-heading">
      <div class="mb-6 flex justify-center" aria-hidden="true">
        <div class="relative">
          <div class="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
          <div class="relative bg-green-500 text-white p-4 rounded-full shadow-lg">
            <CheckIcon :size="48" stroke-width="3" />
          </div>
        </div>
      </div>
      <h1 id="payment-success-heading" class="text-3xl font-bold text-slate-800 mb-2" role="status" aria-live="polite">
        {{ $t('paymentSuccess.title') }}
      </h1>
      <p class="text-slate-500 mb-8">{{ $t('paymentSuccess.subtitle') }}</p>
      <button @click="goToApp" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-200 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:outline-none" :aria-label="$t('paymentSuccess.startExploringLabel')">
        {{ $t('paymentSuccess.startExploring') }}
      </button>
    </div>
  </div>
</template>