<script setup lang="ts">
import type { History } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User2 } from 'lucide-vue-next'
import useCategorysStore from '@/stores/categorys.store'
import Badge from '../ui/badge/Badge.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ item: History }>()
const { locale } = useI18n()
const categoryStore = useCategorysStore()
const expanded = ref(false)

const category = computed(() =>
  categoryStore.categorys.find((c) => c.id == props.item.recommended.categoryId),
)

// category.title is Record<string, string> — pick current locale, fallback to 'en'
const categoryLabel = computed(
  () => category.value?.title[locale.value] ?? category.value?.title['en'] ?? '',
)

// 'video-game' and 'book' are the internal keys used in the en locale
const isVideoGame = computed(() => category.value?.title['en']?.toLowerCase() === 'video game')
const isBook = computed(() => category.value?.title['en']?.toLowerCase() === 'book')

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(locale.value === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })

const imageUrl = computed(() =>
  props.item.recommended.img?.replace('http://', 'https://').replace('&edge=curl', ''),
)
</script>

<template>
  <article
    class="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
    :aria-label="`${$t('result.articleLabel')}: ${item.recommended.title}`"
  >
    <Card class="p-0">
      <CardContent class="p-5 sm:p-3">
        <div class="flex flex-col sm:flex-row min-h-[180px]">

          <!-- Cover image -->
          <figure
            class="relative sm:w-32 md:w-40 h-fit overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-100 rounded-lg"
          >
            <img
              class="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              :src="imageUrl"
              :alt="`Cover of ${item.recommended.title}`"
              loading="lazy"
            />

            <!-- Score badge — video game -->
            <div
              v-if="isVideoGame"
              class="absolute top-4 left-4 sm:top-2 sm:left-2 w-18 h-18 sm:w-13 sm:h-13 flex flex-col items-center justify-center bg-emerald-500 text-white rounded-2xl shadow-xl border-4 border-white"
              :aria-label="$t('historyCard.criticScore', { score: item.recommended.rating })"
            >
              <span class="text-xs sm:text-[7px] font-bold uppercase leading-none" aria-hidden="true">
                {{ $t('historyCard.score') }}
              </span>
              <span class="text-2xl sm:text-sm font-black">{{ item.recommended.rating }}</span>
            </div>

            <!-- Rating badge — everything except book -->
            <div
              v-else-if="!isBook"
              class="absolute top-4 left-4 sm:top-2 sm:left-2 flex items-center gap-1.5 px-3 py-1.5 sm:px-1 sm:py-0.5 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-md shadow-xl border border-yellow-200"
              :aria-label="$t('historyCard.rating', { score: item.recommended.rating })"
            >
              <i class="material-symbols-rounded text-yellow-500 !text-[22px] sm:!text-[15px] icon-filled" aria-hidden="true">star_rate</i>
              <span class="font-bold text-slate-800 text-lg sm:text-xs">{{ item.recommended.rating }}</span>
            </div>
          </figure>

          <!-- Content -->
          <div class="flex-1 p-4 md:p-5 flex flex-col">
            <header class="flex items-center justify-between mb-3">
              <Badge
                variant="secondary"
                class="bg-primary/5 text-primary border-none text-[10px] uppercase tracking-wider font-bold"
              >
                {{ categoryLabel || $t('historyCard.uncategorized') }}
              </Badge>
              <time
                class="flex items-center text-[10px] font-medium text-slate-400"
                :datetime="item.createdAt"
                :aria-label="$t('historyCard.recommendedOn', { date: formatDate(item.createdAt) })"
              >
                <Calendar class="w-3 h-3 mr-1" aria-hidden="true" />
                {{ formatDate(item.createdAt) }}
              </time>
            </header>

            <div class="mb-3">
              <h3 class="font-bold text-lg md:text-xl leading-tight text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                {{ item.recommended.title }}
              </h3>
              <p class="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <User2 class="w-3 h-3" aria-hidden="true" />
                {{ $t('historyCard.by', { name: item.recommended.creator }) }}
              </p>
            </div>

            <div class="relative">
              <p
                :id="`plot-${item.recommended.id}`"
                class="text-sm text-slate-600 italic leading-relaxed transition-all duration-300"
                :class="expanded ? '' : 'line-clamp-2 md:line-clamp-3'"
              >
                <span class="text-primary/20 text-2xl font-serif not-italic" aria-hidden="true">"</span>
                {{ item.recommended.plot }}
              </p>
              <button
                class="text-xs font-semibold text-primary mt-1 hover:underline focus-visible:outline-none focus-visible:underline"
                :aria-expanded="expanded"
                :aria-controls="`plot-${item.recommended.id}`"
                @click="expanded = !expanded"
              >
                {{ expanded ? $t('historyCard.showLess') : $t('historyCard.readMore') }}
              </button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  </article>
</template>

<style scoped>
.line-clamp-2,
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>