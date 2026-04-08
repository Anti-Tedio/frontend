<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Clock, Sparkles, Play } from 'lucide-vue-next'

interface Props {
    open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'buy-credits'): void
    (e: 'watch-ad'): void
}>()

const { t } = useI18n()

const isOpen = ref(props.open)

watch(() => props.open, (val) => {
    isOpen.value = val
})
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogContent class="sm:max-w-[380px] overflow-hidden p-0 border-none shadow-2xl">
            <div 
                class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" 
                role="presentation"
            />
            
            <DialogHeader class="pt-8 px-6">
                <div class="mx-auto mb-4 relative">
                    <div class="absolute inset-0 bg-amber-500/20 blur-xl rounded-full" aria-hidden="true" />
                    <div 
                        class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/10 border border-amber-200/50 dark:border-amber-700/30 shadow-sm"
                        aria-hidden="true"
                    >
                        <Clock class="h-7 w-7 text-amber-600 dark:text-amber-400" />
                    </div>
                </div>
                
                <DialogTitle class="text-2xl font-bold text-center tracking-tight">
                    {{ t('credits.dialog.title') }}
                </DialogTitle>
                <DialogDescription class="text-center text-balance leading-relaxed px-2">
                    {{ t('credits.waitOrBuy.description') }}
                </DialogDescription>
            </DialogHeader>

            <div class="p-6 pt-2">
                <section 
                    class="relative group rounded-2xl bg-secondary/30 p-4 border border-border/40 transition-colors hover:bg-secondary/50"
                    aria-labelledby="recharge-title"
                >
                    <div class="flex items-start gap-3">
                        <Sparkles class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                            <h3 id="recharge-title" class="text-sm font-semibold text-foreground leading-none">
                                {{ t('credits.waitOrBuy.rechargeSoon') }}
                            </h3>
                            <p class="mt-2 text-xs text-muted-foreground/80 leading-snug">
                                {{ t('credits.waitOrBuy.rechargeNote') }}
                            </p>
                        </div>
                    </div>
                </section>

                <nav class="flex flex-col gap-3 mt-8" :aria-label="t('credits.dialog.title')">
                    <Button
                        class="w-full h-12 text-base font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
                        @click="emit('buy-credits')"
                    >
                        <ShoppingCart class="h-5 w-5" aria-hidden="true" />
                        {{ t('credits.dialog.buyCredits') }}
                    </Button>

                    <div class="flex items-center gap-3 px-3 py-1" role="separator">
                        <div class="flex-1 h-px bg-border/40" aria-hidden="true" />
                        <span class="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
                            {{ t('common.or', 'ou') }}
                        </span>
                        <div class="flex-1 h-px bg-border/40" aria-hidden="true" />
                    </div>

                    <Button
                        class="w-full h-12 text-base font-bold border-2 border-green-500/30 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-500/50 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
                        variant="outline"
                        :disabled="true"
                        @click="emit('watch-ad')"
                    >
                        <Play class="h-5 w-5 fill-current" aria-hidden="true" />
                        {{ t('credits.watchOrBuy.watchAd') }}
                    </Button>

                    <Button
                        variant="ghost"
                        class="w-full h-11 text-muted-foreground hover:text-foreground transition-colors mt-1"
                        @click="isOpen = false"
                    >
                        {{ t('credits.waitOrBuy.wait') }}
                    </Button>
                </nav>
            </div>
        </DialogContent>
    </Dialog>
</template>