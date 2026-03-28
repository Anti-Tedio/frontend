<script setup lang="ts">
import { AlertCircleIcon, InfoIcon } from 'lucide-vue-next'
</script>

<template>
  <main class="flex items-center justify-center p-4" aria-labelledby="payment-failed-heading">
    <div class="w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center border border-slate-100 max-w-250">
      <div class="mb-6 flex justify-center text-rose-500" aria-hidden="true">
        <div class="bg-rose-50 p-4 rounded-full border-4 border-rose-100">
          <AlertCircleIcon :size="48" stroke-width="2.5" />
        </div>
      </div>
      <h1 id="payment-failed-heading" class="text-3xl font-bold text-slate-800 mb-2">{{ $t('paymentFailure.title') }}</h1>
      <p class="text-slate-500 mb-8 px-2">{{ $t('paymentFailure.subtitle') }}</p>
      <aside class="bg-rose-50 rounded-2xl p-4 mb-8 text-left border border-rose-100" :aria-label="$t('paymentFailure.reasonsLabel')">
        <div class="flex items-start gap-3">
          <InfoIcon :size="18" class="text-rose-600 mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <h2 class="text-sm font-bold text-rose-900 leading-tight">{{ $t('paymentFailure.reasonsTitle') }}</h2>
            <ul class="text-xs text-rose-700 mt-1 list-disc list-inside space-y-1">
              <li>{{ $t('paymentFailure.reason1') }}</li>
              <li>{{ $t('paymentFailure.reason2') }}</li>
              <li>{{ $t('paymentFailure.reason3') }}</li>
            </ul>
          </div>
        </div>
      </aside>
      <p class="mt-6 text-xs text-slate-400" role="note">{{ $t('paymentFailure.noCharge') }}</p>
    </div>
  </main>
</template>