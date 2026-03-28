<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import router from '@/router/routes'
import useSuggestStore from '@/stores/suggest.store'
import { ArrowLeft } from 'lucide-vue-next'
import PubliGoogleAdSenseComponent from '@/components/PubliGoogleAdSenseComponent.vue'

const { t } = useI18n()
const budget = ref<number>(0)
const budgetOptions = [0, 20, 40, 70, 100, 150, 200, 300, 399]

function selectBudget(value: number) {
  budget.value = value
}

async function handleNext() {
  if (budget.value === 0) budget.value = 399
  useSuggestStore().price = budget.value
  router.replace('/result')
}

function formatOption(option: number): string {
  if (option === 0) return t('extraInfo.noLimit')
  return t('extraInfo.budgetValue', { value: option })
}
</script>

<template>
  <div class="animate-in fade-in duration-500 flex flex-col min-h-[80vh]">
    <button
      class="flex items-center gap-2 self-start duration-200 ease-in-out text-gray-400 hover:text-gray-600 font-bold mt-md focus-visible:outline-none focus-visible:underline"
      :aria-label="$t('selectCategory.back')"
      @click="router.go(-1)"
    >
      <ArrowLeft aria-hidden="true" />
      {{ $t('selectCategory.back') }}
    </button>

    <section class="flex flex-col items-center py-md" aria-labelledby="budget-heading">
      <h1 id="budget-heading" class="text-3xl font-bold tracking-tight text-foreground text-center">
        {{ $t('extraInfo.title') }}
      </h1>
      <p class="text-muted-foreground text-center mt-2">
        {{ $t('extraInfo.subtitle') }}
      </p>
    </section>

    <section class="flex flex-col items-center flex-1 w-full gap-8 mt-5">
      <div>
        <Label
          class="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 block text-center"
          id="budget-label"
        >
          {{ $t('extraInfo.budgetLabel') }}
        </Label>

        <ul
          class="flex flex-wrap justify-center gap-5 max-w-150 mt-5"
          role="radiogroup"
          aria-labelledby="budget-label"
        >
          <li
            v-for="option in budgetOptions"
            :key="option"
            role="radio"
            :aria-checked="budget === option"
            :aria-label="formatOption(option)"
            tabindex="0"
            class="group relative flex flex-col items-center justify-center h-20 p-3 rounded-2xl border-2 transition-all duration-300 ease-out cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            :class="[
              budget === option
                ? 'border-primary bg-primary/[0.04] shadow-sm scale-[1.02]'
                : 'border-slate-100 bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5',
            ]"
            @click="selectBudget(option)"
            @keydown.enter="selectBudget(option)"
            @keydown.space.prevent="selectBudget(option)"
          >
            <i
              class="material-symbols-outlined text-xl mb-1 transition-colors duration-300"
              :class="
                budget === option ? 'text-primary' : 'text-slate-400 group-hover:text-primary/60'
              "
              aria-hidden="true"
            >
              {{ option === 0 ? 'money_off' : 'wallet' }}
            </i>

            <span
              class="font-bold text-sm leading-tight transition-colors text-center"
              :class="budget === option ? 'text-primary' : 'text-slate-700'"
            >
              {{ formatOption(option) }}
            </span>

            <div
              v-if="budget === option"
              class="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shadow-sm scale-in"
              aria-hidden="true"
            >
              <i class="material-symbols-rounded !text-[14px]">check</i>
            </div>
          </li>
        </ul>
      </div>

      <PubliGoogleAdSenseComponent :ad-slot="5528477355" />

      <Button
        size="lg"
        class="w-full h-14 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 mt-auto mb-8 shadow-md hover:shadow-lg transition-all max-w-85 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        :aria-label="$t('extraInfo.submitLabel')"
        @click="handleNext"
      >
        {{ $t('extraInfo.submitButton') }}
        <i class="material-symbols-outlined text-2xl" aria-hidden="true">arrow_right_alt</i>
      </Button>
    </section>
  </div>
</template>

<style scoped>
.scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}
@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
