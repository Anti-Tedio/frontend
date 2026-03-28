<script setup lang="ts">
import BadgePersonComponent from '@/components/BadgePersonComponent.vue'
import PubliGoogleAdSenseComponent from '@/components/PubliGoogleAdSenseComponent.vue'
import { Skeleton } from '@/components/ui/skeleton'
import router from '@/router/routes'
import usePersonsStore from '@/stores/persons.store'
import { ArrowRight } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'

const personsStore = usePersonsStore()
const isReady = ref(false)

const nextPage = async () => {
  await personsStore.savePersons()
  router.push('/categorys')
}

watch(
  () => personsStore.persons,
  () => {
    if (personsStore.persons.length > 0) isReady.value = true
  },
)

onMounted(() => {
  if (personsStore.persons.length > 0) isReady.value = true
  if (personsStore.selected.length >= 3) {
    router.replace({ name: 'categorys' })
  }
})
</script>

<template>
  <div class="animate-in fade-in duration-500">
    <section class="py-md" aria-labelledby="select-person-heading">
      <h1 id="select-person-heading" class="text-3xl font-bold text-center">
        {{ $t('selectPerson.title') }}
      </h1>
      <p class="text-gray-400 text-center p-sm">{{ $t('selectPerson.subtitle') }}</p>
    </section>

    <section class="flex flex-col items-center gap-15 mt-xs" aria-label="Personality selection">
      <ul
        v-if="!isReady"
        class="flex flex-wrap justify-center gap-2"
        :aria-label="$t('selectPerson.loading')"
        aria-busy="true"
      >
        <li v-for="n in 6" :key="n"><Skeleton class="bg-gray-200 w-30 h-10 rounded-2xl" /></li>
      </ul>
      <ul
        v-else
        class="flex flex-wrap justify-center gap-2"
        :aria-label="$t('selectPerson.traitsLabel')"
        role="group"
      >
        <li v-for="person in personsStore.persons" :key="person.id">
          <BadgePersonComponent :person="person" />
        </li>
      </ul>

      <p class="text-xs text-gray-400 font-medium -mt-10" aria-live="polite" aria-atomic="true">
        <span v-if="personsStore.selected.length === 0">{{ $t('selectPerson.counterNone') }}</span>
        <span v-else-if="personsStore.selected.length < 3">{{
          $t('selectPerson.counterSome', { count: 3 - personsStore.selected.length })
        }}</span>
        <span v-else class="text-primary">{{
          $t('selectPerson.counterReady', { count: personsStore.selected.length })
        }}</span>
      </p>

      <PubliGoogleAdSenseComponent :ad-slot="9853028881" />

      <button
        class="text-white text-xl font-bold py-sm rounded-2xl flex items-center justify-center gap-3 w-full max-w-90 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        :class="
          personsStore.selected.length >= 3
            ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-md shadow-primary/25'
            : 'bg-primary/40 cursor-not-allowed'
        "
        :disabled="personsStore.selected.length < 3"
        :aria-disabled="personsStore.selected.length < 3"
        :aria-label="$t('selectPerson.continueAriaLabel')"
        @click="nextPage"
      >
        {{ $t('selectPerson.continueButton') }}
        <ArrowRight aria-hidden="true" />
      </button>
    </section>
  </div>
</template>
