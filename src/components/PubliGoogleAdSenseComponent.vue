<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{
    adSlot:number
}>()

onMounted(() => {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.error('Erro ao carregar o anúncio:', e)
  }
})
</script>

<template>
  <div class="p-sm my-8 w-full flex flex-col items-center justify-center overflow-hidden">
    <span class="mb-2 text-[10px] uppercase tracking-widest text-gray-400"> Publicidade </span>

    <div
      class="ad-slot-wrapper w-full min-h-[250px] bg-gray-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center border border-dashed border-gray-200 dark:border-slate-700"
    >
      <ins
        class="adsbygoogle"
        style="display: block"
        data-ad-client="ca-pub-7928315210189653"
        :data-ad-slot="adSlot"
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
      </ins>
    </div>
  </div>
</template>
