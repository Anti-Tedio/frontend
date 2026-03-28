<script setup lang="ts">
import useSuggestStore from '@/stores/suggest.store'
import useCategorysStore from '@/stores/categorys.store'
import router from '@/router/routes'
import { computed, onMounted } from 'vue'
import Midia from '@/components/Results/Midia.vue'
import Book from '@/components/Results/Book.vue'
import VideoGame from '@/components/Results/VideoGame.vue'
import PubliGoogleAdSenseComponent from '@/components/PubliGoogleAdSenseComponent.vue'
import Loading from '@/components/Results/Loading.vue'
import useUserStore from '@/stores/user.store'

const suggestStore = useSuggestStore()
const categoryStore = useCategorysStore()
const category = computed(() => categoryStore.selected?.title['en']?.toLowerCase())

async function fetchSuggestion() {
  if (useUserStore().credits <= 0) {
    useUserStore().buyCredits = true
    return router.replace({ name: 'categorys' })
  }
  try {
    suggestStore.loading = true
    await suggestStore.getRecommendation()
    useUserStore().credits--
  } catch {
    router.replace({ name: 'categorys' })
  } finally {
    setTimeout(() => {
      suggestStore.loading = false
    }, 1000)
  }
}

onMounted(() => {
  fetchSuggestion()
})
</script>

<template>
  <div class="animate-in fade-in duration-500">
    <Loading />
    <article
      class="flex flex-col items-center p-sm shadow-[0px_0px_10px_1px_rgba(0,0,0,0.1)] rounded-3xl mt-7"
      aria-live="polite"
      aria-atomic="true"
      :aria-label="$t('result.articleLabel')"
    >
      <Midia
        v-if="
          ['movie', 'series', 'anime', 'cartoon'].includes(category ?? '') &&
          suggestStore.suggestMidia
        "
        :midia="suggestStore.suggestMidia"
      />
      <Book
        v-else-if="category === 'book' && suggestStore.suggestBook"
        :book="suggestStore.suggestBook"
      />
      <VideoGame
        v-else-if="category === 'video game' && suggestStore.suggestVideoGame"
        :game="suggestStore.suggestVideoGame"
      />
    </article>

    <PubliGoogleAdSenseComponent :ad-slot="9032608090" />

    <div
      class="flex flex-wrap justify-center gap-4"
      role="group"
      :aria-label="$t('result.actionsLabel')"
    >
      <button
        class="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold text-sm hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        :aria-label="$t('result.tryDifferentLabel')"
        @click="router.push('/categorys')"
      >
        <i class="material-symbols-rounded !text-[18px]" aria-hidden="true">shuffle</i>
        {{ $t('result.tryDifferent') }}
      </button>

      <button
        class="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary/90 hover:scale-[1.02] shadow-md shadow-primary/25 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        :aria-label="$t('result.tryAgainLabel')"
        @click="fetchSuggestion()"
      >
        <i class="material-symbols-rounded !text-[18px]" aria-hidden="true">refresh</i>
        {{ $t('result.tryAgain') }}
      </button>
    </div>
  </div>
</template>
