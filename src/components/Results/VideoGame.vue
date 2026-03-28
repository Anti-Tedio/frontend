<script setup lang="ts">
import type { SuggestVideoGame } from '@/types/suggest'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const props = defineProps<{
  game: SuggestVideoGame
}>()

const { locale } = useI18n()

const url_buy = computed(() => {
  switch (props.game.price.store.toLowerCase().trim()) {
    case 'steam':
      return `https://store.steampowered.com/app/${props.game.price.idSteam}`
    case 'epic game store':
      return `https://store.epicgames.com/?q=${props.game.title}`
    case 'gog':
      return `https://www.gog.com/game/${props.game.title.replace(' ', '_')}`
    case 'nuuvem':
      return `https://www.nuuvem.com/item/${props.game.title.replace(' ', '-')}`
    default:
      return `https://store.steampowered.com/`
  }
})

const releaseDate = computed(() =>
  new Date(props.game.year).toLocaleDateString(
    locale.value === 'pt' ? 'pt-BR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  ),
)

const formattedPrice = computed(() =>
  new Intl.NumberFormat(locale.value === 'pt' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: 'BRL',
  }).format(props.game.price.price),
)
</script>

<template>
  <div
    v-if="game"
    class="flex flex-col md:flex-row md:justify-between gap-5"
    :aria-label="game.title"
  >

    <figure
      class="relative w-full md:w-[300px] flex-shrink-0 group"
      :aria-label="game.title"
    >
      <div class="overflow-hidden rounded-2xl shadow-lg border-4 border-slate-50">
        <img
          :src="game.img"
          :alt="`${$t('videoGame.coverAlt')} ${game.title}`"
          class="w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div
        class="absolute -bottom-4 -right-4 w-16 h-16 flex flex-col items-center justify-center bg-emerald-500 text-white rounded-2xl shadow-xl border-4 border-white"
        :aria-label="$t('videoGame.criticScore', { score: game.rating })"
      >
        <span class="text-xs font-bold uppercase leading-none" aria-hidden="true">
          {{ $t('videoGame.score') }}
        </span>
        <span class="text-2xl font-black">{{ game.rating }}</span>
      </div>

      <figcaption class="sr-only">{{ game.title }}</figcaption>
    </figure>

    <section class="flex flex-col flex-grow p-4" aria-labelledby="game-detail-title">
      <header class="mb-4">
        <time
          class="text-slate-400 text-sm font-medium block mb-1"
          :datetime="String(game.year)"
        >
          {{ releaseDate }}
        </time>

        <h1
          id="game-detail-title"
          class="text-4xl font-black text-slate-900 tracking-tight leading-tight"
        >
          {{ game.title }}
        </h1>

        <p class="text-primary font-bold flex items-center gap-1.5 mt-1">
          <i class="material-symbols-rounded !text-lg" aria-hidden="true">developer_board</i>
          {{ game.creator }}
        </p>
      </header>

      <ul
        class="flex flex-wrap gap-1.5 mb-6 list-none p-0"
        aria-label="Genres"
      >
        <li
          v-for="genre in game.genres"
          :key="genre"
        >
          <span class="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
            {{ genre }}
          </span>
        </li>
      </ul>

      <div class="relative mb-8">
        <i
          class="material-symbols-rounded absolute -left-2 -top-4 text-primary/10 !text-5xl select-none"
          aria-hidden="true"
        >
          format_quote
        </i>
        <p class="text-sm text-slate-600 italic leading-relaxed relative transition-all duration-300">
          {{ game.plot }}
        </p>
      </div>

      <div class="mt-auto flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div>
          <span class="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {{ $t('videoGame.availableOn', { store: game.price.store }) }}
          </span>
          <span class="text-2xl font-black text-slate-900">{{ formattedPrice }}</span>
        </div>

        <a
          :href="url_buy"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          :aria-label="$t('videoGame.buyNowLabel', { title: game.title, store: game.price.store, price: formattedPrice })"
        >
          <i class="material-symbols-rounded" aria-hidden="true">shopping_cart</i>
          {{ $t('videoGame.buyNow') }}
        </a>
      </div>
    </section>

  </div>
</template>