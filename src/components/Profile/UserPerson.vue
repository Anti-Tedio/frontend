<script setup lang="ts">
import { Pencil } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import type { Person } from '@/types'
import { useI18n } from 'vue-i18n'

defineEmits(['edit'])

defineProps<{
  personsSelect: Person[]
}>()

const { locale } = useI18n()
</script>

<template>
  <div
    class="p-4 rounded-2xl bg-white border border-slate-200/60"
    role="region"
    :aria-label="$t('profile.selectedTraitsLabel')"
  >
    <ul
      class="flex flex-wrap gap-2 list-none p-0 m-0"
      :aria-label="$t('profile.selectedTraitsLabel')"
    >
      <li v-for="person in personsSelect" :key="person.id">
        <Badge
          variant="secondary"
          class="px-3 py-1 text-primary text-sm font-medium rounded-full bg-primary/10 border border-primary/20"
        >
          {{ person.trait[locale || 'en'] }}
        </Badge>
      </li>
    </ul>
  </div>
</template>