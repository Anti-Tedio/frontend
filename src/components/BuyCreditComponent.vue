<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types'
import { Plus, Zap, Loader2, Sparkles, Star } from 'lucide-vue-next'
import useProductStore from '@/stores/product.store'
import useUserStore from '@/stores/user.store'

const loading = ref<string | null>(null)
const productStore = useProductStore()

const formatPrice = (product: Product): string => {
  if (product.currency === 'BRL') return `R$ ${product.price.toFixed(2).replace('.', ',')}`
  return `$ ${product.price.toFixed(2)}`
}
const pricePerCredit = (product: Product): string => {
  const value = product.price / product.credits
  if (product.currency === 'BRL') return `R$ ${value.toFixed(3).replace('.', ',')} / credit`
  return `$ ${value.toFixed(3)} / credit`
}
const isPopular = (index: number) => index === Math.floor(productStore.products.length / 2)

const handlePurchase = async (prod: Product) => {
  loading.value = prod.id
  try {
    const url = await productStore.buyProduct(prod)
    if (url) window.location.href = url
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = null
  }
}
</script>

<template>
  <Dialog v-model:open="useUserStore().buyCredits">
    <DialogTrigger as-child>
      <button class="text-primary rounded-full hover:bg-primary/10 transition-colors p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1" :aria-label="$t('buyCredits.triggerLabel')">
        <Plus class="size-4" aria-hidden="true" />
      </button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[90dvw] max-w-dvw max-h-dvh p-6 overflow-auto" role="dialog" aria-modal="true" aria-labelledby="credits-dialog-title">
      <DialogHeader class="text-center space-y-2 pb-2">
        <div class="flex items-center justify-center gap-2">
          <Sparkles class="size-5 text-primary/80" aria-hidden="true" />
          <DialogTitle id="credits-dialog-title" class="text-2xl font-bold tracking-tight">{{ $t('buyCredits.dialogTitle') }}</DialogTitle>
          <Sparkles class="size-5 text-primary/80" aria-hidden="true" />
        </div>
        <p class="text-sm text-muted-foreground mx-auto">{{ $t('buyCredits.dialogSubtitle') }}</p>
      </DialogHeader>
      <ul class="grid grid-cols-1 sm:grid-cols-3 gap-7" :aria-label="$t('buyCredits.plansLabel')" role="list">
        <li v-for="(prod, index) in productStore.products" :key="prod.id" role="listitem">
          <Card :class="['relative flex flex-col h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1', isPopular(index) ? 'border-primary shadow-primary/50 scale-[1.03] z-10' : 'border-border']">
            <div v-if="isPopular(index)" class="absolute -top-3 left-1/2 -translate-x-1/2" :aria-label="$t('buyCredits.mostPopular')">
              <Badge class="bg-primary hover:bg-primary text-white text-xs px-3 py-0.5 shadow-sm">
                <Star class="size-3 mr-1 fill-white" aria-hidden="true" />
                {{ $t('buyCredits.mostPopularBadge') }}
              </Badge>
            </div>
            <CardHeader class="pb-2 pt-6 text-center">
              <CardTitle class="text-lg font-semibold">{{ prod.name }}</CardTitle>
              <p class="text-sm text-muted-foreground font-medium">{{ $t('buyCredits.credits', { count: prod.credits }) }}</p>
            </CardHeader>
            <CardContent class="flex-1 flex flex-col items-center justify-center gap-1 py-4">
              <p class="text-4xl font-extrabold tracking-tight" :class="isPopular(index) ? 'text-primary' : ''">{{ formatPrice(prod) }}</p>
              <p class="text-xs text-muted-foreground">{{ pricePerCredit(prod) }}</p>
            </CardContent>
            <CardFooter class="pt-0 pb-4">
              <Button class="w-full gap-2 transition-all duration-200" :class="isPopular(index) ? 'bg-primary hover:bg-primary shadow-sm shadow-primary/30' : 'variant-outline'" :variant="isPopular(index) ? 'default' : 'outline'" :disabled="loading === prod.id" :aria-busy="loading === prod.id" :aria-label="`${$t('buyCredits.buyNow')} ${prod.name} — ${formatPrice(prod)}`" @click="handlePurchase(prod)">
                <Loader2 v-if="loading === prod.id" class="size-4 animate-spin" aria-hidden="true" />
                <Zap v-else class="size-4" aria-hidden="true" />
                {{ loading === prod.id ? $t('buyCredits.processing') : $t('buyCredits.buyNow') }}
              </Button>
            </CardFooter>
          </Card>
        </li>
      </ul>
      <p class="text-center text-xs text-muted-foreground mt-4">{{ $t('buyCredits.securityNote') }}</p>
    </DialogContent>
  </Dialog>
</template>