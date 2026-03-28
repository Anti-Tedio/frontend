<script setup lang="ts">
import { ClockIcon, CopyIcon, RefreshCcwIcon } from 'lucide-vue-next'
import router from '@/router/routes'

// TODO: replace with actual Pix code from store/props
const pixCode = '0002010102124300160010BR.GOV.BCB.PIX0114...'

const copyPix = () => {
  navigator.clipboard.writeText(pixCode).catch(console.error)
}

// const checkStatus = () => {
//   // TODO: call payment status API
//   console.log('Checking payment status…')
// }

const goBack = () => router.push('/')
</script>

<template>
  <main class="flex items-center justify-center p-4" aria-labelledby="payment-pending-heading">
    <div class="w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center border border-slate-100 max-w-250 flex flex-col gap-5">

      <div class="mb-6 flex justify-center" aria-hidden="true">
        <div class="bg-amber-50 p-4 rounded-full border-4 border-amber-100 text-amber-500 animate-pulse">
          <ClockIcon :size="48" stroke-width="2.5" />
        </div>
      </div>

      <h1 id="payment-pending-heading" class="text-3xl font-bold text-slate-800 mb-2">
        {{ $t('paymentPending.title') }}
      </h1>
      <p class="text-slate-500 mb-8 px-4">{{ $t('paymentPending.subtitle') }}</p>

      <section class="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100" aria-labelledby="pix-section-heading">
        <h2 id="pix-section-heading" class="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
          {{ $t('paymentPending.pixTitle') }}
        </h2>
        <div class="flex items-center gap-2 bg-white p-3 rounded-xl border border-amber-200">
          <code class="text-xs text-slate-600 truncate flex-1 font-mono" :aria-label="$t('paymentPending.pixCodeLabel')">
            {{ pixCode }}
          </code>
          <button
            @click="copyPix"
            class="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            :aria-label="$t('paymentPending.pixCopyLabel')"
          >
            <CopyIcon :size="18" aria-hidden="true" />
          </button>
        </div>
        <p class="mt-4 text-[10px] text-amber-700 leading-relaxed">
          <i18n-t keypath="paymentPending.pixNote" tag="span">
            <template #brand><strong>Anti-Tédio</strong></template>
          </i18n-t>
        </p>
      </section>

      <div class="space-y-3">
        <!-- <button
          @click="checkStatus"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          :aria-label="$t('paymentPending.checkButtonLabel')"
        >
          <RefreshCcwIcon :size="20" aria-hidden="true" />
          {{ $t('paymentPending.checkButton') }}
        </button> -->
        <button
          @click="goBack"
          class="w-full bg-transparent hover:bg-slate-50 text-slate-400 font-medium py-2 rounded-xl transition-colors text-sm focus-visible:outline-none focus-visible:underline"
          :aria-label="$t('paymentPending.backButton')"
        >
          {{ $t('paymentPending.backButton') }}
        </button>
      </div>

    </div>
  </main>
</template>