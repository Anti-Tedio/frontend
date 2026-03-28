<script setup lang="ts">
import { ExternalLinkIcon } from 'lucide-vue-next'

export interface TechItem {
  name: string
  description: string
  url: string
  badge?: string
  styles: string
}

const props = defineProps<{ item: TechItem }>()

function openExternalLink() {
  window.open(props.item.url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <li
    role="listitem"
    class="flex items-start gap-3 p-3 group rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    tabindex="0"
    :aria-label="`${item.name} — ${item.description}`"
    @click="openExternalLink"
    @keydown.enter="openExternalLink"
    @keydown.space.prevent="openExternalLink"
  >
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="font-semibold group-hover:text-primary text-slate-800 text-sm transition-colors">
          {{ item.name }}
        </span>
        <span
          v-if="item.badge"
          :class="['text-[10px] font-bold px-2 py-0.5 rounded-full', item.styles]"
        >
          {{ item.badge }}
        </span>
      </div>
      <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">{{ item.description }}</p>
    </div>
    <ExternalLinkIcon
      :size="14"
      class="text-slate-300 group-hover:text-primary transition-colors shrink-0 mt-0.5"
      aria-hidden="true"
    />
  </li>
</template>