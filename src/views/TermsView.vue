<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ScrollTextIcon, ChevronDownIcon, ArrowLeftIcon, LanguagesIcon } from 'lucide-vue-next'

const { tm, locale } = useI18n()
const router = useRouter()

const openSection = ref<number | null>(null)
const showLocaleMenu = ref(false)

const languages = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
]

function toggle(index: number) {
  openSection.value = openSection.value === index ? null : index
}

function changeLanguage(code: string) {
  localStorage.setItem('lang', code)
  window.location.reload()
}

const sections = tm('terms.sections') as Array<{ title: string; content: string }>

function renderContent(text: string) {
  return text
    .split('\n')
    .map((line) =>
      line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/^•\s/, '<span class="text-primary mr-1">•</span> '),
    )
    .join('<br/>')
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-500">
    <nav class="flex items-center justify-between mb-8">
      <button
        @click="router.back()"
        class="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
      >
        <ArrowLeftIcon :size="18" />
      </button>

      <div class="relative">
        <button
          @click="showLocaleMenu = !showLocaleMenu"
          class="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors uppercase"
        >
          <LanguagesIcon :size="18" />
          {{ locale }}
        </button>

        <div
          v-if="showLocaleMenu"
          class="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-10 overflow-hidden"
        >
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="changeLanguage(lang.code)"
            class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
            :class="{ 'text-primary font-bold': locale === lang.code }"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>
    </nav>

    <header class="text-center space-y-4 mb-12">
      <div
        class="inline-flex p-4 bg-primary/10 rounded-full text-primary mx-auto"
        aria-hidden="true"
      >
        <ScrollTextIcon :size="40" />
      </div>
      <h1 class="text-4xl font-bold tracking-tight text-slate-900">
        {{ $t('terms.pageTitle') }}
      </h1>
      <p class="text-slate-400 text-sm">{{ $t('terms.lastUpdated') }}</p>
      <p class="text-slate-500 text-base mx-auto leading-relaxed">
        {{ $t('terms.intro') }}
      </p>
    </header>

    <ul class="space-y-3 list-none p-0" role="list">
      <li
        v-for="(section, index) in sections"
        :key="index"
        class="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all duration-200"
        :class="openSection === index ? 'shadow-md border-primary/20' : 'hover:border-primary/20'"
      >
        <button
          class="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-slate-800 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          :aria-expanded="openSection === index"
          @click="toggle(index)"
        >
          <span>{{ section.title }}</span>
          <ChevronDownIcon
            :size="18"
            class="flex-shrink-0 text-slate-400 transition-transform duration-300"
            :class="openSection === index ? 'rotate-180 text-primary' : ''"
            aria-hidden="true"
          />
        </button>

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="openSection === index"
            class="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-50"
          >
            <div class="pt-4 space-y-1" v-html="renderContent(section.content)" />
          </div>
        </Transition>
      </li>
    </ul>

    <footer
      class="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p class="text-sm text-slate-500 text-center sm:text-left">
        {{ $t('terms.contactQuestion') }}
        <a
          href="mailto:contato@mail.antitedio.com.br"
          class="text-primary font-semibold hover:underline focus-visible:outline-none focus-visible:underline"
        >
          contato@mail.antitedio.com.br
        </a>
      </p>
      <button
        class="text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:underline flex-shrink-0"
        @click="router.push('/privacy')"
      >
        {{ $t('terms.viewPrivacy') }}
      </button>
    </footer>
  </div>
</template>
