<script setup lang="ts">
import type { Suggestion } from '@/types';
import { ref } from 'vue'

const props = defineProps<{
  book: Suggestion
}>()

const publishDate = new Date(props.book.year).toLocaleDateString('pt-BR', {
  year: 'numeric',
  month: 'long',
})

const expanded = ref(false)

const AccessLink = () => {
  window.open(props.book.link)
}
</script>

<template>
  <div v-if="book" class="flex flex-col md:flex-row gap-5 items-start">

    <figure
      class="relative w-full md:w-[280px] flex-shrink-0 perspective-1000"
      :aria-label="$t('book.coverLabel', { title: book.title })"
    >
      <div class="relative group shadow-[10px_10px_20px_rgba(0,0,0,0.2),-2px_0_5px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden border-black/20">
        <img
          :src="book.img"
          :alt="$t('book.coverAlt', { title: book.title })"
          class="w-full object-cover transition-transform duration-500 group-hover:brightness-110"
          loading="lazy"
        />
        <div class="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-white/20 to-transparent" aria-hidden="true" />
      </div>
    </figure>

    <section class="flex flex-col flex-grow p-3" aria-labelledby="book-title">
      <header class="mb-6">
        <h1 id="book-title" class="text-4xl font-serif font-black text-slate-900 leading-tight mb-2 italic">
          {{ book.title }}
        </h1>
        <div class="flex flex-col gap-1">
          <p class="text-xl text-primary font-medium flex items-center gap-2">
            <span class="text-slate-400 font-light italic">{{ $t('book.by') }}</span>
            {{ book.creator }}
          </p>
          <p class="text-sm text-slate-500 flex items-center gap-1">
            <i class="material-symbols-rounded !text-sm" aria-hidden="true">auto_stories</i>
            {{ $t('book.publishedIn') }}
            <time :datetime="String(book.year)">{{ publishDate }}</time>
          </p>
        </div>
      </header>

      <ul class="flex gap-2 mb-6 list-none p-0" :aria-label="$t('book.genresLabel')">
        <li
          v-for="genre in book.genres"
          :key="genre"
          class="px-3 py-0.5 bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 rounded uppercase"
        >
          {{ genre }}
        </li>
      </ul>

      <div class="mb-8 relative">
        <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          {{ $t('book.synopsis') }}
          <div class="h-[1px] flex-grow bg-slate-100" aria-hidden="true" />
        </h2>
        <div class="relative">
          <p
            :id="`synopsis-${book.title}`"
            :class="expanded ? '' : 'line-clamp-2 md:line-clamp-3'"
            class="text-sm text-slate-600 italic leading-relaxed relative transition-all duration-300"
          >
            <span class="text-primary/20 absolute -left-3 -top-1 text-2xl font-serif" aria-hidden="true">"</span>
            {{ book.plot }}
          </p>
          <button
            @click="expanded = !expanded"
            class="text-xs font-semibold text-primary mt-1 hover:underline focus-visible:outline-none focus-visible:underline"
            :aria-expanded="expanded"
            :aria-controls="`synopsis-${book.title}`"
          >
            {{ expanded ? $t('book.showLess') : $t('book.readMore') }}
          </button>
        </div>
      </div>

      <div class="mt-auto flex flex-wrap gap-4 pt-6 border-t border-slate-100">
        <button
          class="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:outline-none"
          :aria-label="$t('book.readSampleLabel')"
          @click="AccessLink"
        >
          <i class="material-symbols-rounded" aria-hidden="true">menu_book</i>
          {{ $t('book.readSample') }}
        </button>
      </div>
    </section>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');
.font-serif { font-family: 'Merriweather', serif; }
h1 { font-family: 'Playfair Display', serif; }
</style>