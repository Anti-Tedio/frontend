<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import usePersonsStore from '@/stores/persons.store'
import { useI18n } from 'vue-i18n'
defineEmits(['edit'])

const { locale } = useI18n()
</script>

<template>
  <div
    class="space-y-3 p-sm shadow-md rounded-2xl bg-white/30"
    role="region"
    :aria-label="$t('profile.myPersonality')"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium">{{ $t('profile.myPersonality') }}</h3>
      <button
        class="flex items-center bg-black/10 p-1 hover:bg-primary/20 hover:text-primary transition-all duration-200 rounded-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        @click="$emit('edit')"
        :aria-label="$t('profile.editTraitsLabel')"
      >
        <i class="material-symbols-rounded" style="font-size: 20px" aria-hidden="true">edit</i>
      </button>
    </div>
    <ul class="flex flex-wrap gap-2 list-none p-0" :aria-label="$t('profile.selectedTraitsLabel')">
      <li v-for="person in usePersonsStore().selected" :key="person.id">
        <Badge
          variant="secondary"
          class="px-3 py-1 text-primary text-sm font-medium rounded-full bg-primary/15"
          >{{ person.trait[locale || 'en'] }}</Badge
        >
      </li>
    </ul>
  </div>
</template>
