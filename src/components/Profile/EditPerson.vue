<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogClose, DialogContent } from '../ui/dialog'
import usePersonsStore from '@/stores/persons.store'
import BadgePersonComponent from '../BadgePersonComponent.vue'

const isOpen = ref(false)
const personsStore = usePersonsStore()

const pronto = () => {
  personsStore.savePersons()
  isOpen.value = false
}

watch(isOpen, (val) => {
  if (!val) personsStore.savePersons()
})

defineExpose({ isOpen })
</script>

<template>
  <Dialog v-model:open="isOpen" aria-labelledby="edit-person-title">
    <DialogContent class="w-full sm:max-w-150 min-h-60 max-h-150" :show-close-button="false" role="dialog" aria-modal="true">
      <DialogClose class="absolute right-md top-md text-gray-400 cursor-pointer hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full" as-child :aria-label="$t('editPerson.closeAriaLabel')">
        <i class="material-symbols-rounded icon-filled" style="font-weight: 700; font-size: 20px" aria-hidden="true">close</i>
      </DialogClose>
      <header class="text-center my-3">
        <h2 id="edit-person-title" class="font-bold text-2xl">{{ $t('editPerson.title') }}</h2>
        <p class="text-sm text-muted-foreground mt-1">{{ $t('editPerson.subtitle') }}</p>
      </header>
      <ul class="flex flex-wrap gap-3 justify-center overflow-auto max-h-70" role="group" :aria-label="$t('editPerson.traitsLabel')">
        <li v-for="person in personsStore.persons" :key="person.id">
          <BadgePersonComponent :person="person" />
        </li>
      </ul>
      <button class="bg-primary text-white py-2 px-8 rounded-lg hover:bg-primary/90 transition-colors mt-3 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none" @click="pronto" :aria-label="$t('editPerson.saveAriaLabel')">
        {{ $t('editPerson.doneButton') }}
      </button>
    </DialogContent>
  </Dialog>
</template>