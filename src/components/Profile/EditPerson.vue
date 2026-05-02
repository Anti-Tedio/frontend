<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { Dialog, DialogClose, DialogContent } from '../ui/dialog'
import BadgePersonComponent from '../BadgePersonComponent.vue'
import type { Person } from '@/types'

defineProps<{
  persons: Person[]
}>()

defineEmits(['handle-edit-persons'])

const isOpen = ref(false)

defineExpose({ isOpen })
</script>

<template>
  <Dialog v-model:open="isOpen" aria-labelledby="edit-person-title">
    <DialogContent
      class="flex flex-col items-center gap-0 w-full sm:max-w-150 max-h-[85vh] p-6 rounded-3xl"
      :show-close-button="false"
      role="dialog"
      aria-modal="true"
    >
      <!-- Botão fechar: alinhado ao canto, ícone consistente com o resto do projeto -->
      <DialogClose
        class="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        :aria-label="$t('editPerson.closeAriaLabel')"
      >
        <X class="size-5" aria-hidden="true" />
      </DialogClose>

      <!-- Header com respiro adequado -->
      <header class="text-center w-full pt-2 pb-5">
        <h2
          id="edit-person-title"
          class="font-bold text-2xl text-slate-900"
        >
          {{ $t('editPerson.title') }}
        </h2>
        <p class="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          {{ $t('editPerson.subtitle') }}
        </p>
      </header>

      <!-- Lista com fade-out indicando scroll -->
      <div class="relative w-full">
        <ul
          class="flex flex-wrap gap-2.5 justify-center overflow-y-auto max-h-72 px-1 pb-2"
          role="group"
          :aria-label="$t('editPerson.traitsLabel')"
        >
          <li v-for="person in persons" :key="person.id">
            <BadgePersonComponent :person="person" />
          </li>
        </ul>
        <!-- Indicador visual de scroll -->
        <div
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"
          aria-hidden="true"
        />
      </div>

      <!-- Botão primário centralizado e com largura total -->
      <button
        class="mt-5 w-full bg-primary text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        :aria-label="$t('editPerson.saveAriaLabel')"
        @click="$emit('handle-edit-persons')"
      >
        {{ $t('editPerson.doneButton') }}
      </button>
    </DialogContent>
  </Dialog>
</template>