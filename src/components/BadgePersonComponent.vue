<script setup lang="ts">
import usePersonsStore from '@/stores/persons.store'
import type { Person } from '@/types'
import InfoPersonComponent from './InfoPersonComponent.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

defineProps<{ person: Person }>()
</script>

<template>
  <button
    @click="usePersonsStore().selectPerson(person)"
    :aria-pressed="person.isActive"
    :aria-label="
      person.isActive
        ? $t('badgePerson.selected', { trait: person.trait[locale || 'en'] })
        : $t('badgePerson.unselected', { trait: person.trait[locale || 'en'] })
    "
    :disabled="usePersonsStore().selected.length >= 8 && !person.isActive"
    class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-xl"
  >
    <Badge
      variant="secondary"
      class="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm md:text-base rounded-xl border-2 transition-all duration-200 cursor-pointer select-none"
      :class="[
        person.isActive
          ? 'bg-primary border-primary text-white shadow-md scale-[1.02]'
          : 'bg-white border-primary/20 text-primary hover:border-primary/50',
        usePersonsStore().selected.length >= 8 && !person.isActive
          ? 'opacity-40 grayscale pointer-events-none'
          : '',
      ]"
    >
      <span class="text-xl" aria-hidden="true">{{ person.icon }}</span>
      <span class="leading-tight">{{ person.trait[locale||'en'] }}</span>
      <div @click.stop :aria-label="$t('infoPerson.triggerLabel')">
        <InfoPersonComponent :info="person.desc[locale||'en']!" :active="person.isActive" />
      </div>
    </Badge>
  </button>
</template>
