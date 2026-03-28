<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  desc: string
}>()
</script>

<template>
  <article
    class="flex flex-col items-center justify-between bg-transparent max-w-90 p-lg w-full h-50 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    aria-label="Feature card"
  >
    <div
      class="bg-primary/20 text-primary rounded-full flex justify-center p-2"
      aria-hidden="true"
    >
      <i
        class="material-symbols-rounded notranslate"
        style="font-weight: 300; font-size: 30px;"
      >
        {{ icon }}
      </i>
    </div>
    <div class="text-center">
      <h3 class="font-bold text-lg/10">{{ title }}</h3>
      <p class="text-sm text-gray-400">{{ desc }}</p>
    </div>
  </article>
</template>