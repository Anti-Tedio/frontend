<script setup lang="ts">
import { Info, X } from 'lucide-vue-next'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from 'reka-ui'

defineProps<{ info: string; active: boolean }>()
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <button class="flex items-center justify-center rounded-full p-0.5 transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current" :class="active ? 'text-white/80' : 'text-primary/60'" :aria-label="$t('infoPerson.triggerLabel')">
        <Info :size="16" aria-hidden="true" />
      </button>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[50]" aria-hidden="true" />
      <DialogContent class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-70 bg-white rounded-2xl shadow-2xl z-[51] overflow-hidden border border-primary/10" role="dialog" aria-modal="true" aria-labelledby="trait-detail-heading">
        <div class="relative p-6 bg-gradient-to-b from-primary/10 to-transparent">
          <DialogClose as-child>
            <button class="absolute right-3 top-3 text-primary/40 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full" :aria-label="$t('infoPerson.closeLabel')">
              <X :size="18" aria-hidden="true" />
            </button>
          </DialogClose>
          <h3 id="trait-detail-heading" class="text-primary font-bold mb-2 flex items-center gap-2">
            <i class="material-symbols-rounded" aria-hidden="true">description</i>
            {{ $t('infoPerson.dialogTitle') }}
          </h3>
          <p class="text-primary/80 leading-relaxed text-sm font-medium">{{ info }}</p>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>