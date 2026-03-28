<script setup lang="ts">
import type { SuggestMidia } from '@/types/suggest';
import { ref } from 'vue'

defineProps<{
  midia: SuggestMidia
}>()

const expanded = ref(false)
</script>

<template>
  <div v-if="midia" class="flex flex-col md:flex-row gap-5 items-start">

    <figure
      class="relative w-full md:w-[320px] flex-shrink-0 group"
      :aria-label="$t('midia.coverLabel', { title: midia.title })"
    >
      <div class="overflow-hidden rounded-2xl shadow-lg border border-primary/10">
        <img
          :src="midia.img"
          :alt="$t('midia.coverAlt', { title: midia.title })"
          class="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div
        class="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-yellow-200"
        :aria-label="$t('midia.ratingLabel', { score: midia.rating })"
      >
        <i class="material-symbols-rounded text-yellow-500 !text-[20px] icon-filled" aria-hidden="true">star_rate</i>
        <span class="font-bold text-slate-800 text-lg">{{ midia.rating }}</span>
      </div>
    </figure>

    <section class="flex flex-col h-full p-3" aria-labelledby="midia-title">
      <div class="mb-4">
        <h1 id="midia-title" class="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
          {{ midia.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-3 text-slate-500 font-medium">
          <span class="flex items-center gap-1">
            <i class="material-symbols-rounded !text-lg" aria-hidden="true">calendar_today</i>
            <time :datetime="String(midia.year)">{{ midia.year }}</time>
          </span>
          <span class="w-1 h-1 bg-slate-300 rounded-full" aria-hidden="true" />
          <span class="flex items-center gap-1">
            <i class="material-symbols-rounded !text-lg" aria-hidden="true">person</i>
            {{ midia.creator }}
          </span>
        </div>
      </div>

      <ul class="flex flex-wrap gap-2 mb-6 list-none p-0" :aria-label="$t('midia.genresLabel')">
        <li
          v-for="gen in midia.genres"
          :key="gen"
          class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-lg border border-primary/5"
        >
          {{ gen }}
        </li>
      </ul>

      <div class="mb-8">
        <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          {{ $t('midia.synopsis') }}
          <div class="h-[1px] flex-grow bg-slate-100" aria-hidden="true" />
        </h2>
        <div class="relative">
          <p
            :id="`plot-${midia.title}`"
            :class="expanded ? '' : 'line-clamp-2 md:line-clamp-3'"
            class="text-sm text-slate-600 italic leading-relaxed relative transition-all duration-300"
          >
            <span class="text-primary/20 absolute -left-3 -top-1 text-2xl font-serif" aria-hidden="true">"</span>
            {{ midia.plot }}
          </p>
          <button
            @click="expanded = !expanded"
            :aria-expanded="expanded"
            :aria-controls="`plot-${midia.title}`"
            class="text-xs font-semibold text-primary mt-1 hover:underline focus-visible:outline-none focus-visible:underline"
          >
            {{ expanded ? $t('midia.showLess') : $t('midia.readMore') }}
          </button>
        </div>
      </div>

      <div class="mt-auto pt-6 border-t border-slate-100">
        <span class="block text-xs font-bold text-slate-400 uppercase mb-3">{{ $t('midia.availableOn') }}</span>
        <ul class="flex gap-3 flex-wrap list-none p-0" :aria-label="$t('midia.platformsLabel')">
          <li
            v-for="plat in midia.platforms"
            :key="plat"
            class="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-white hover:shadow-sm transition-all"
          >
            <i class="material-symbols-rounded !text-lg text-primary" aria-hidden="true">play_circle</i>
            {{ plat }}
          </li>
        </ul>
      </div>
    </section>

  </div>

  <!-- Skeleton -->
  <div v-else class="flex flex-col lg:flex-row gap-8 animate-pulse" aria-busy="true" :aria-label="$t('midia.loadingLabel')">
    <div class="w-full lg:w-[320px] h-[450px] bg-slate-200 rounded-2xl" />
    <div class="flex-grow space-y-4 py-4">
      <div class="h-10 bg-slate-200 rounded-lg w-3/4" />
      <div class="h-4 bg-slate-200 rounded-lg w-1/2" />
      <div class="h-32 bg-slate-200 rounded-lg w-full" />
    </div>
  </div>
</template>