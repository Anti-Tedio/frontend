<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue'
import router from '@/router/routes'
import { ArrowRight, Sparkles, Zap, Shield, Clock } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const categories = [
  { icon: 'movie', labelKey: 'home.catMovie' as const },
  { icon: 'tv', labelKey: 'home.catSeries' as const },
  { icon: 'swords', labelKey: 'home.catAnime' as const },
  { icon: 'auto_stories', labelKey: 'home.catBook' as const },
  { icon: 'sports_esports', labelKey: 'home.catGame' as const },
  { icon: 'theater_comedy', labelKey: 'home.catCartoon' as const },
]

const steps = [
  { step: 1, iconKey: 'Person', titleKey: 'home.step1Title', descKey: 'home.step1Desc' },
  { step: 2, iconKey: 'category', titleKey: 'home.step2Title', descKey: 'home.step2Desc' },
  { step: 3, iconKey: 'rocket_launch', titleKey: 'home.step3Title', descKey: 'home.step3Desc' },
]

const stats = [
  { value: '6', labelKey: 'home.statCategories' as const },
  { value: '10+', labelKey: 'home.statAPIs' as const },
  { value: '∞', labelKey: 'home.statSuggestions' as const },
]

const advantages = [
  {
    icon: Zap,
    titleKey: 'home.advantage1Title' as const,
    descKey: 'home.advantage1Desc' as const,
  },
  {
    icon: Shield,
    titleKey: 'home.advantage2Title' as const,
    descKey: 'home.advantage2Desc' as const,
  },
  {
    icon: Clock,
    titleKey: 'home.advantage3Title' as const,
    descKey: 'home.advantage3Desc' as const,
  },
]
</script>

<template>
  <div class="animate-in fade-in duration-500">

    <!-- Hero -->
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
            <strong class="text-gray-500 font-semibold">Anti Tédio</strong>
          </template>
        </i18n-t>
      </p>
      <button class="bg-primary py-md px-xl flex items-center gap-4 text-white text-xl font-bold rounded-2xl mt-md hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none" @click="router.push('/persons')" :aria-label="$t('home.ctaLabel')">
        {{ $t('home.ctaButton') }}
        <ArrowRight aria-hidden="true" />
      </button>
    </section>

    <!-- Categories -->
    <section class="mt-35 max-w-4xl mx-auto px-sm" aria-labelledby="categories-heading">
      <h2 id="categories-heading" class="text-2xl font-bold text-center tracking-tight">{{ $t('home.categoriesTitle') }}</h2>
      <p class="text-gray-400/80 text-center mt-2 max-w-100 mx-auto">{{ $t('home.categoriesSubtitle') }}</p>
      <ul class="flex flex-wrap justify-center gap-8 mt-8" role="list" :aria-label="$t('home.categoriesAriaLabel')">
        <li v-for="cat in categories" :key="cat.icon" class="flex flex-col items-center gap-2 text-gray-500 transition-colors hover:text-primary">
          <i class="material-symbols-rounded !text-3xl" aria-hidden="true">{{ cat.icon }}</i>
          <span class="text-sm font-medium">{{ $t(cat.labelKey) }}</span>
        </li>
      </ul>
    </section>

    <!-- How it works -->
    <section class="mt-35 px-sm" aria-labelledby="how-it-works-heading">
      <h2 id="how-it-works-heading" class="text-2xl font-bold text-center tracking-tight">{{ $t('home.howTitle') }}</h2>
      <p class="text-gray-400/80 text-center mt-2 max-w-100 mx-auto">{{ $t('home.howSubtitle') }}</p>
      <ul class="flex flex-col md:flex-row justify-center gap-8 mt-8 max-w-250 mx-auto" role="list" :aria-label="$t('home.howAriaLabel')">
        <li v-for="s in steps" :key="s.step" class="flex-1 flex items-start gap-5 p-6 rounded-2xl shadow-md bg-white/60 hover:shadow-lg transition-shadow">
          <div class="flex flex-col items-center gap-1">
            <span class="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">{{ s.step }}</span>
            <i class="material-symbols-rounded text-xl text-primary mt-2" aria-hidden="true">{{ s.iconKey }}</i>
          </div>
          <div>
            <h3 class="font-bold text-lg">{{ $t(s.titleKey) }}</h3>
            <p class="text-sm text-gray-400 mt-1">{{ $t(s.descKey) }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Features -->
    <section class="mt-35 max-w-4xl mx-auto px-sm" aria-labelledby="features-heading">
      <h2 id="features-heading" class="sr-only">{{ $t('home.featuresHeading') }}</h2>
      <div class="flex flex-wrap justify-center gap-8">
        <CardComponent icon="electric_bolt" :title="$t('home.feature1Title')" :desc="$t('home.feature1Desc')" />
        <CardComponent icon="Person" :title="$t('home.feature2Title')" :desc="$t('home.feature2Desc')" />
        <CardComponent icon="History" :title="$t('home.feature3Title')" :desc="$t('home.feature3Desc')" />
      </div>
    </section>

    <!-- Advantages -->
    <section class="mt-35 px-sm" aria-labelledby="advantages-heading">
      <h2 id="advantages-heading" class="text-2xl font-bold text-center tracking-tight">{{ $t('home.advantagesTitle') }}</h2>
      <div class="flex flex-col md:flex-row justify-center gap-6 mt-8 max-w-3xl mx-auto">
        <div v-for="(a, index) in advantages" :key="index" class="flex-1 flex items-start gap-3 p-5 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
          <component :is="a.icon" class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 class="font-semibold text-base">{{ $t(a.titleKey) }}</h3>
            <p class="text-sm text-gray-400 mt-1">{{ $t(a.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="mt-35 px-sm" aria-labelledby="stats-heading">
      <h2 id="stats-heading" class="sr-only">{{ $t('home.statsTitle') }}</h2>
      <div class="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
        <div v-for="s in stats" :key="s.value" class="text-center">
          <p class="text-4xl font-bold text-primary">{{ s.value }}</p>
          <p class="text-sm text-gray-400 mt-1 font-medium">{{ $t(s.labelKey) }}</p>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="mt-35 mb-8 flex flex-col items-center px-sm" aria-labelledby="final-cta-heading">
      <h2 id="final-cta-heading" class="text-3xl font-bold text-center tracking-tight">{{ $t('home.finalTitle') }}</h2>
      <p class="text-gray-400/80 text-center mt-2 max-w-100">{{ $t('home.finalSubtitle') }}</p>
      <button class="bg-primary py-md px-xl flex items-center gap-4 text-white text-xl font-bold rounded-2xl mt-8 hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none" @click="router.push('/persons')" :aria-label="$t('home.ctaLabel')">
        {{ $t('home.ctaButton') }}
        <ArrowRight aria-hidden="true" />
      </button>
    </section>

  </div>
</template>
