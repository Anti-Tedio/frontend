<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import router from '@/router/routes'
import { ArrowRight, Sparkles } from 'lucide-vue-next'
</script>

<template>
  <div class="animate-in fade-in duration-500 flex flex-col items-center">
    <section class="mt-xl flex flex-col items-center" aria-labelledby="hero-heading">
      <p class="text-xs font-bold uppercase tracking-widest text-primary/70 mb-4 flex items-center gap-2">
        <Sparkles class="w-3 h-3" aria-hidden="true" />
        {{ $t('home.badge') }}
      </p>
      <h1 id="hero-heading" class="text-5xl font-bold font-sans text-center leading-tight">
        <i18n-t keypath="home.title" tag="span">
          <template #boredom>
            <span class="text-primary underline decoration-wavy decoration-primary/40">{{ $t('home.boredomWord') }}</span>
          </template>
        </i18n-t>
      </h1>
      <p class="text-center mt-lg text-xl font-medium text-gray-400/80 px-sm max-w-2xl leading-relaxed">
        <i18n-t keypath="home.subtitle" tag="span">
          <template #brand>
            <strong class="text-gray-500 font-semibold">Anti-Tédio</strong>
          </template>
        </i18n-t>
      </p>
    </section>
    <button class="bg-primary py-md px-xl flex items-center gap-4 text-white text-xl font-bold rounded-2xl mt-md hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none" @click="router.push('/persons')" :aria-label="$t('home.ctaLabel')">
      {{ $t('home.ctaButton') }}
      <ArrowRight aria-hidden="true" />
    </button>
    <section class="flex flex-wrap justify-center gap-8 mt-[80px]" aria-labelledby="features-heading">
      <h2 id="features-heading" class="sr-only">{{ $t('home.featuresHeading') }}</h2>
      <CardComponent icon="electric_bolt" :title="$t('home.feature1Title')" :desc="$t('home.feature1Desc')" />
      <CardComponent icon="Person" :title="$t('home.feature2Title')" :desc="$t('home.feature2Desc')" />
      <CardComponent icon="History" :title="$t('home.feature3Title')" :desc="$t('home.feature3Desc')" />
    </section>
  </div>
</template>