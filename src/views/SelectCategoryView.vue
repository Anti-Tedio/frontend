<script setup lang="ts">
import router from '@/router/routes'
import useCategorysStore from '@/stores/categorys.store'
import usePersonsStore from '@/stores/persons.store'
import useUserStore from '@/stores/user.store'
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { defineAsyncComponent, type Component } from 'vue'
import { useI18n } from 'vue-i18n'

const categoryStore = useCategorysStore()

const { locale } = useI18n()

const iconsMap: Record<string, Component> = {
  anime: defineAsyncComponent(() => import('@/components/icons/category/animeIcon.vue')),
  book: defineAsyncComponent(() => import('@/components/icons/category/bookIcon.vue')),
  cartoon: defineAsyncComponent(() => import('@/components/icons/category/cartoonIcon.vue')),
  movie: defineAsyncComponent(() => import('@/components/icons/category/movieIcon.vue')),
  series: defineAsyncComponent(() => import('@/components/icons/category/serieIcon.vue')),
  'video game': defineAsyncComponent(
    () => import('@/components/icons/category/video-gameIcon.vue'),
  ),
}

async function handleNext() {
  await usePersonsStore()
    .savePersons()
    .then(() => {
      if (categoryStore.selected?.title['en']?.toLowerCase() === 'video game') return router.push('/extra-info')
      router.push('/result')
    })
    .catch(() => {
      useUserStore().popUpLogin = true
    })
}
</script>

<template>
  <div class="animate-in fade-in duration-500">
    <button
      class="flex items-center gap-2 self-start duration-200 ease-in-out text-gray-400 hover:text-gray-600 font-bold mt-md focus-visible:outline-none focus-visible:underline"
      @click="router.go(-1)"
      :aria-label="$t('selectCategory.back')"
    >
      <ArrowLeft aria-hidden="true" />
      {{ $t('selectCategory.back') }}
    </button>

    <section class="py-md" aria-labelledby="category-heading">
      <h1 id="category-heading" class="text-3xl font-bold text-center">
        {{ $t('selectCategory.title') }}
      </h1>
      <p class="text-gray-400 text-center p-sm">{{ $t('selectCategory.subtitle') }}</p>
    </section>

    <section class="flex flex-col items-center gap-15 mt-xs w-full">
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-4"
        role="radiogroup"
        :aria-label="$t('selectCategory.categoriesLabel')"
      >
        <li
          v-for="cat in categoryStore.categorys"
          :key="cat.id"
          v-show="cat.isActive"
          @click="categoryStore.selectCategory(cat)"
          @keydown.enter="categoryStore.selectCategory(cat)"
          @keydown.space.prevent="categoryStore.selectCategory(cat)"
          role="radio"
          :aria-checked="cat.select"
          :aria-label="`${cat.title}${cat.select ? ' — ' + $t('selectCategory.selected') : ''}`"
          tabindex="0"
          class="group relative flex items-center gap-4 h-24 p-4 rounded-3xl border-2 transition-all duration-300 ease-out cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          :class="
            cat.select
              ? 'border-primary bg-primary/[0.04] shadow-sm scale-[1.02]'
              : 'border-slate-100 bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5'
          "
        >
          <div
            class="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300"
            :class="
              cat.select
                ? 'bg-primary/50 text-white'
                : 'bg-primary/10 text-primary group-hover:bg-primary/20'
            "
            aria-hidden="true"
          >
            <component :is="iconsMap[cat.title['en']?.toLowerCase()!]" v-bind="cat" class="w-7 h-7" />
          </div>
          <div class="flex flex-col flex-grow">
            <span
              class="font-bold text-lg leading-tight transition-colors uppercase"
              :class="cat.select ? 'text-primary' : 'text-slate-700'"
              >{{ cat.title[locale || 'en'] }}</span
            >
            <span
              v-if="cat.select"
              class="text-xs font-semibold text-primary uppercase tracking-wider animate-in fade-in slide-in-from-left-2"
              aria-hidden="true"
              >{{ $t('selectCategory.selected') }}</span
            >
          </div>
          <div
            v-if="cat.select"
            class="absolute top-3 right-3 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center shadow-sm scale-in"
            aria-hidden="true"
          >
            <i class="material-symbols-rounded !text-[14px]">check</i>
          </div>
        </li>
      </ul>

      <button
        class="text-white text-xl font-bold py-sm rounded-2xl flex items-center justify-center gap-3 max-w-100 w-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        :class="
          categoryStore.selected
            ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-md shadow-primary/25'
            : 'bg-primary/40 cursor-not-allowed'
        "
        :disabled="!categoryStore.selected"
        :aria-label="
          categoryStore.selected?.title['en'] === 'video game'
            ? $t('selectCategory.continueAriaLabel')
            : $t('selectCategory.resultAriaLabel')
        "
        @click="handleNext"
      >
        {{
          categoryStore.selected?.title['en'] === 'video game'
            ? $t('selectCategory.continueButton')
            : $t('selectCategory.resultButton')
        }}
        <ArrowRight aria-hidden="true" />
      </button>
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
