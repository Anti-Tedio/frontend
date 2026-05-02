<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDateFormat } from '@vueuse/core'
import {
  User2, AlertTriangle, ThumbsDown,
  Meh, ThumbsUp, Heart, Star
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import type { Category, History, Rating } from '@/types'

const props = defineProps<{
  item: History,
  categories: Category[],
  rating: Rating
}>()

const emit = defineEmits(['saveRating'])

const { locale, t } = useI18n()
const expanded = ref(false)
const selectedRating = ref<Rating>(props.rating)
const plotEl = ref<HTMLElement | null>(null)
const isTruncated = ref(false)

const category = computed(() =>
  props.categories.find((c) => c.id == props.item.recommended.categoryId)
)

const categoryLabel = computed(() =>
  category.value?.title[locale.value] ?? category.value?.title['en'] ?? ''
)

const isVideoGame = computed(() => category.value?.title['en']?.toLowerCase() === 'video game')
const isBook = computed(() => category.value?.title['en']?.toLowerCase() === 'book')

const formattedDate = useDateFormat(props.item.createdAt, 'DD/MM/YY', {
  locales: locale.value === 'pt' ? 'pt-BR' : 'en-US'
})

const imageUrl = computed(() =>
  props.item.recommended.img?.replace('http://', 'https://').replace('&edge=curl', '')
)

function toggleRating(value: number){
  selectedRating.value.value = selectedRating.value.value === value ? null : value
  emit('saveRating', selectedRating.value)
}

function checkTruncation() {
  if (plotEl.value) {
    isTruncated.value = plotEl.value.scrollHeight > plotEl.value.clientHeight
  }
}

onMounted(() => {
  checkTruncation()
})

watch(expanded, () => {
  if (!expanded.value) {
    setTimeout(checkTruncation, 50)
  }
})

const ratingOptions = [
  { value: 0, icon: AlertTriangle, bgColor: 'bg-destructive', textColor: 'text-destructive', ring: 'ring-destructive/30', label: 'notRecommend' },
  { value: 1, icon: ThumbsDown, bgColor: 'bg-orange-500', textColor: 'text-orange-500', ring: 'ring-orange-500/30', label: 'dislike' },
  { value: 2, icon: Meh, bgColor: 'bg-yellow-400', textColor: 'text-yellow-400', ring: 'ring-yellow-400/30', label: 'neutral' },
  { value: 3, icon: ThumbsUp, bgColor: 'bg-blue-400', textColor: 'text-blue-400', ring: 'ring-blue-400/30', label: 'like' },
  { value: 4, icon: Heart, bgColor: 'bg-pink-500', textColor: 'text-pink-500', ring: 'ring-pink-500/30', label: 'love' },
] as const
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:border-slate-800/50 dark:bg-slate-950/60 sm:flex-row"
    :aria-label="`${t('result.articleLabel')}: ${item.recommended.title}`">
    <figure class="relative aspect-[3/4] shrink-0 overflow-hidden sm:w-40 md:w-44">
      <img class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" :src="imageUrl"
        :alt="item.recommended.title" />

      <div v-if="!isBook && !isVideoGame"
        class="absolute top-2 left-2 flex items-center gap-1 rounded-lg border border-white/20 bg-white/80 px-1.5 py-0.5 shadow-sm backdrop-blur-md dark:bg-slate-900/80">
        <Star class="size-3 fill-yellow-500 text-yellow-500" />
        <span class="text-xs font-bold text-slate-800 dark:text-slate-100">
          {{ item.recommended.rating }}
        </span>
      </div>

      <div v-else-if="isVideoGame"
        class="absolute top-2 left-2 flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-emerald-500 shadow-lg ring-2 ring-white dark:ring-slate-900">
        <span class="text-[8px] font-bold text-emerald-100 uppercase leading-none">
          {{ t('videoGame.score') }}
        </span>
        <span class="text-sm font-black text-white">{{ item.recommended.rating }}</span>
      </div>
    </figure>

    <div class="flex flex-1 flex-col p-4 sm:p-5">
      <header class="flex items-center justify-between">
        <Badge variant="outline"
          class="h-6 border-primary/20 bg-primary/5 px-2.5 text-[11px] font-bold uppercase tracking-wider text-primary">
          {{ categoryLabel || t('historyCard.uncategorized') }}
        </Badge>
        <time class="text-xs font-semibold text-slate-400">
          {{ formattedDate }}
        </time>
      </header>

      <main class="mt-3 grow">
        <h3 class="line-clamp-1 text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          {{ item.recommended.title }}
        </h3>

        <div class="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <User2 class="size-3.5 text-primary/70" />
          <span class="truncate">{{ t('historyCard.by', { name: item.recommended.creator }) }}</span>
        </div>

        <div class="mt-3">
          <p ref="plotEl" :id="`plot-${item.recommended.id}`"
            class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-all"
            :class="expanded ? '' : 'line-clamp-2'">
            {{ item.recommended.plot }}
          </p>
          <button v-if="isTruncated || expanded"
            class="mt-1.5 text-xs font-semibold text-primary hover:underline underline-offset-2"
            @click="expanded = !expanded">
            {{ expanded ? t('historyCard.showLess') : t('historyCard.readMore') }}
          </button>
        </div>
      </main>

      <footer class="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3 dark:border-slate-800/50">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-widest text-slate-400">
            {{ t('historyCard.yourRating') }}
          </span>
          <span v-if="selectedRating.value !== null" class="text-xs font-semibold text-shadow"
            :class="`${ratingOptions[selectedRating.value]!.textColor}`">
            {{ t(`historyCard.${ratingOptions[selectedRating.value]!.label}`) }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button v-for="rate in ratingOptions" :key="rate.value" @click="toggleRating(rate.value)" :class="[
            'relative flex size-9 items-center justify-center rounded-lg border transition-all duration-200 active:scale-90',
            rating.value === rate.value
              ? `${rate.bgColor} border-transparent text-white shadow-md ring-2 ${rate.ring}`
              : 'border-slate-200 bg-white text-slate-400 hover:border-primary/50 dark:border-slate-800 dark:bg-slate-900'
          ]">
            <component :is="rate.icon" class="size-4" />
          </button>
        </div>
      </footer>
    </div>
  </article>
</template>