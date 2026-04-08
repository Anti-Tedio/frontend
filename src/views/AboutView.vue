<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
    ExternalLinkIcon,
    GithubIcon,
    LinkedinIcon,
    MailIcon,
    ServerIcon,
    MonitorIcon,
    ZapIcon,
    ImageIcon,
    HeartIcon,
    SparklesIcon,
    ArrowRight,
    User,
    Layers,
    LanguagesIcon,
    ArrowLeftIcon,
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import TechCard, { type TechItem } from '@/components/about/TechCard.vue'

const { t } = useI18n()
const router = useRouter()

const { tm, locale } = useI18n()

const openSection = ref<number | null>(null)
const showLocaleMenu = ref(false)

const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
]

function changeLanguage(code: string) {
    localStorage.setItem('lang', code)
    window.location.reload()
}

const S: Record<string, string> = {
    AI: 'bg-violet-100 text-violet-700',
    Runtime: 'bg-amber-100 text-amber-700',
    Framework: 'bg-blue-100 text-blue-700',
    ORM: 'bg-teal-100 text-teal-700',
    Database: 'bg-orange-100 text-orange-700',
    Cache: 'bg-red-100 text-red-700',
    Auth: 'bg-green-100 text-green-700',
    Language: 'bg-sky-100 text-sky-700',
    Build: 'bg-yellow-100 text-yellow-700',
    Styling: 'bg-emerald-100 text-emerald-700',
    UI: 'bg-pink-100 text-pink-700',
    State: 'bg-indigo-100 text-indigo-700',
    Router: 'bg-cyan-100 text-cyan-700',
    i18n: 'bg-purple-100 text-purple-700',
    Forms: 'bg-fuchsia-100 text-fuchsia-700',
    Icons: 'bg-slate-100 text-slate-600',
    Typography: 'bg-rose-100 text-rose-700',
    Media: 'bg-orange-100 text-orange-700',
    Books: 'bg-amber-100 text-amber-700',
    Games: 'bg-violet-100 text-violet-700',
    Payment: 'bg-green-100 text-green-700',
    Email: 'bg-blue-100 text-blue-700',
    SVG: 'bg-pink-100 text-pink-700',
}
function s(badge: string) { return S[badge] ?? 'bg-slate-100 text-slate-600' }

const backend = computed<TechItem[]>(() => [
    { name: 'Bun', description: t('about.bunDesc'), url: 'https://bun.sh', badge: 'Runtime', styles: s('Runtime') },
    { name: 'Hono', description: t('about.honoDesc'), url: 'https://hono.dev', badge: 'Framework', styles: s('Framework') },
    { name: 'Prisma ORM', description: t('about.prismaDesc'), url: 'https://www.prisma.io', badge: 'ORM', styles: s('ORM') },
    { name: 'PostgreSQL', description: t('about.postgresDesc'), url: 'https://www.postgresql.org', badge: 'Database', styles: s('Database') },
    { name: 'Redis / Valkey', description: t('about.redisDesc'), url: 'https://valkey.io', badge: 'Cache', styles: s('Cache') },
    { name: 'JWT', description: t('about.jwtDesc'), url: 'https://jwt.io', badge: 'Auth', styles: s('Auth') },
])

const frontend = computed<TechItem[]>(() => [
    { name: 'Vue 3', description: t('about.vue3Desc'), url: 'https://vuejs.org', badge: 'Framework', styles: s('Framework') },
    { name: 'TypeScript', description: t('about.typescriptDesc'), url: 'https://www.typescriptlang.org', badge: 'Language', styles: s('Language') },
    { name: 'Vite', description: t('about.viteDesc'), url: 'https://vitejs.dev', badge: 'Build', styles: s('Build') },
    { name: 'Tailwind CSS', description: t('about.tailwindDesc'), url: 'https://tailwindcss.com', badge: 'Styling', styles: s('Styling') },
    { name: 'shadcn-vue', description: t('about.shadcnDesc'), url: 'https://www.shadcn-vue.com', badge: 'UI', styles: s('UI') },
    { name: 'Pinia', description: t('about.piniaDesc'), url: 'https://pinia.vuejs.org', badge: 'State', styles: s('State') },
    { name: 'Vue Router', description: t('about.vueRouterDesc'), url: 'https://router.vuejs.org', badge: 'Router', styles: s('Router') },
    { name: 'Vue I18n', description: t('about.vueI18nDesc'), url: 'https://vue-i18n.intlify.dev', badge: 'i18n', styles: s('i18n') },
    { name: 'VeeValidate + Zod', description: t('about.veeValidateDesc'), url: 'https://vee-validate.logaretm.com', badge: 'Forms', styles: s('Forms') },
    { name: 'Lucide Vue Next', description: t('about.lucideDesc'), url: 'https://lucide.dev', badge: 'Icons', styles: s('Icons') },
])

const apis = computed<TechItem[]>(() => [
    { name: 'Google Gemini', description: t('about.geminiDesc'), url: 'https://ai.google.dev', badge: 'AI', styles: s('AI') },
    { name: 'OMDB API', description: t('about.omdbDesc'), url: 'https://www.omdbapi.com', badge: 'Media', styles: s('Media') },
    { name: 'Google Books API', description: t('about.googleBooksDesc'), url: 'https://developers.google.com/books', badge: 'Books', styles: s('Books') },
    { name: 'IsThereAnyDeal API', description: t('about.istadDesc'), url: 'https://isthereanydeal.com', badge: 'Games', styles: s('Games') },
    { name: 'Google Cloud Translation', description: t('about.gcloudTranslateDesc'), url: 'https://cloud.google.com/translate', badge: 'i18n', styles: s('i18n') },
    { name: 'Google OAuth', description: t('about.googleOauthDesc'), url: 'https://developers.google.com/identity', badge: 'Auth', styles: s('Auth') },
    { name: 'Facebook OAuth', description: t('about.facebookOauthDesc'), url: 'https://developers.facebook.com', badge: 'Auth', styles: s('Auth') },
    { name: 'Stripe', description: t('about.stripeDesc'), url: 'https://stripe.com', badge: 'Payment', styles: s('Payment') },
    { name: 'Mercado Pago', description: t('about.mercadoPagoDesc'), url: 'https://www.mercadopago.com.br/developers', badge: 'Payment', styles: s('Payment') },
    { name: 'Resend', description: t('about.resendDesc'), url: 'https://resend.com', badge: 'Email', styles: s('Email') },
])

const assets = computed<TechItem[]>(() => [
    { name: 'SVGrepo', description: t('about.svgrepoDesc'), url: 'https://www.svgrepo.com', badge: 'SVG', styles: s('SVG') },
    { name: 'Lucide Icons', description: t('about.lucideAssetsDesc'), url: 'https://lucide.dev', badge: 'Icons', styles: s('Icons') },
    { name: 'Google Fonts', description: t('about.googleFontsDesc'), url: 'https://fonts.google.com', badge: 'Typography', styles: s('Typography') },
    { name: 'Material Symbols', description: t('about.materialSymbolsDesc'), url: 'https://fonts.google.com/icons', badge: 'Icons', styles: s('Icons') },
])

const creator = {
    name: 'Ezequiel Santos',
    avatar: 'https://github.com/Cleitinho69.png',
    initials: 'ES',
}

interface CreatorLink { icon: 'github' | 'linkedin' | 'email'; label: string; href: string }
const creatorLinks: CreatorLink[] = [
    { icon: 'github', label: 'GitHub', href: 'https://github.com/Cleitinho69' },
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ezequiel-santos-de-queiroz-a670383bb/' },
    { icon: 'email', label: 'E-mail', href: 'mailto:ezequielqueiroz2007@outlook.com' },
]

const repoFrontend = 'https://github.com/Anti Tédio/frontend'
const repoBackend = 'https://github.com/Anti Tédio/backend'
</script>

<template>
    <div class="animate-in fade-in duration-500 max-w-5xl mx-auto px-4 py-10 space-y-20 pb-24">

        <nav class="flex items-center justify-between mb-8">
            <button @click="router.back()"
                class="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                <ArrowLeftIcon :size="18" />
            </button>

            <div class="relative">
                <button @click="showLocaleMenu = !showLocaleMenu"
                    class="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors uppercase">
                    <LanguagesIcon :size="18" />
                    {{ locale }}
                </button>

                <div v-if="showLocaleMenu"
                    class="absolute right-0 mt-2 w-32 bg-white border border-slate-100 rounded-xl shadow-lg z-10 overflow-hidden">
                    <button v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)"
                        class="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
                        :class="{ 'text-primary font-bold': locale === lang.code }">
                        {{ lang.name }}
                    </button>
                </div>
            </div>
        </nav>

        <header class="text-center space-y-6" aria-labelledby="about-hero-heading">
            <div class="relative inline-block" aria-hidden="true">
                <div class="absolute inset-0 animate-pulse bg-primary/20 rounded-full blur-xl" />
                <div
                    class="relative inline-flex p-5 bg-gradient-to-br from-primary to-primary/70 rounded-full text-white shadow-lg">
                    <SparklesIcon :size="48" />
                </div>
            </div>

            <h1 id="about-hero-heading"
                class="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent">
                Anti Tédio
            </h1>

            <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {{ $t('about.subtitle') }}
            </p>

            <div class="flex flex-wrap gap-3 justify-center pt-2">
                <Badge v-for="cat in ['🎬 Movies & Series', '📚 Books', '🎮 Games', '🤖 Generative AI']" :key="cat"
                    variant="outline" class="px-4 py-2 text-sm border-primary/30 bg-primary/5">
                    {{ cat }}
                </Badge>
            </div>

            <button
                class="mt-2 bg-primary text-white font-bold text-lg py-md px-xl rounded-2xl inline-flex items-center gap-3 hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                :aria-label="$t('about.ctaLabel')" @click="router.push('/persons')">
                {{ $t('about.ctaButton') }}
                <ArrowRight class="w-5 h-5" aria-hidden="true" />
            </button>
        </header>

        <section class="bg-white rounded-3xl shadow-lg p-8 border border-slate-100 hover:shadow-xl transition-shadow"
            aria-labelledby="about-project-heading">
            <div class="flex items-center gap-3 mb-6">
                <div class="p-3 bg-primary/10 rounded-2xl" aria-hidden="true">
                    <HeartIcon :size="28" class="text-primary" />
                </div>
                <h2 id="about-project-heading" class="text-2xl font-bold text-slate-800">
                    {{ $t('about.projectTitle') }}
                </h2>
            </div>
            <p class="text-slate-600 leading-relaxed mb-4">{{ $t('about.projectText1') }}</p>
            <p class="text-slate-600 leading-relaxed">{{ $t('about.projectText2') }}</p>
        </section>

        <section class="flex flex-col items-center gap-10" aria-labelledby="about-how-heading">
            <h2 id="about-how-heading" class="text-3xl font-bold text-slate-900 text-center">
                {{ $t('about.howTitle') }}
            </h2>
            <ol class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full list-none p-0">
                <li
                    class="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                    <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4"
                        aria-hidden="true">
                        <User class="w-6 h-6" />
                    </div>
                    <span class="text-xs font-black text-primary/50 uppercase tracking-widest mb-2"
                        aria-hidden="true">01</span>
                    <h3 class="font-bold text-slate-900 mb-2">{{ $t('about.step1Title') }}</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">{{ $t('about.step1Desc') }}</p>
                </li>
                <li
                    class="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                    <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4"
                        aria-hidden="true">
                        <Layers class="w-6 h-6" />
                    </div>
                    <span class="text-xs font-black text-primary/50 uppercase tracking-widest mb-2"
                        aria-hidden="true">02</span>
                    <h3 class="font-bold text-slate-900 mb-2">{{ $t('about.step2Title') }}</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">{{ $t('about.step2Desc') }}</p>
                </li>
                <li
                    class="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-primary/10 bg-primary/[0.02] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                    <div class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mb-4"
                        aria-hidden="true">
                        <SparklesIcon class="w-6 h-6" />
                    </div>
                    <span class="text-xs font-black text-primary/50 uppercase tracking-widest mb-2"
                        aria-hidden="true">03</span>
                    <h3 class="font-bold text-slate-900 mb-2">{{ $t('about.step3Title') }}</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">{{ $t('about.step3Desc') }}</p>
                </li>
            </ol>
        </section>

        <section aria-labelledby="about-stats-heading">
            <h2 id="about-stats-heading" class="sr-only">{{ $t('about.statsTitle') }}</h2>
            <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 list-none p-0">
                <li v-for="i in 4" :key="i"
                    class="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md transition-all duration-200">
                    <span class="text-4xl font-black text-primary">{{ $t(`about.stat${i}Value`) }}</span>
                    <span class="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{{
                        $t(`about.stat${i}Label`) }}</span>
                </li>
            </ul>
        </section>

        <div class="grid md:grid-cols-2 gap-6">
            <section aria-labelledby="backend-heading">
                <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 bg-slate-100 rounded-xl text-slate-600" aria-hidden="true">
                        <ServerIcon :size="22" />
                    </div>
                    <h2 id="backend-heading" class="text-xl font-bold text-slate-800">{{ $t('about.backendTitle') }}
                    </h2>
                </div>
                <ul class="grid gap-2 list-none p-0">
                    <TechCard v-for="item in backend" :key="item.name" :item="item" />
                </ul>
            </section>

            <section aria-labelledby="frontend-heading">
                <div class="flex items-center gap-3 mb-4">
                    <div class="p-2 bg-slate-100 rounded-xl text-slate-600" aria-hidden="true">
                        <MonitorIcon :size="22" />
                    </div>
                    <h2 id="frontend-heading" class="text-xl font-bold text-slate-800">{{ $t('about.frontendTitle') }}
                    </h2>
                </div>
                <ul class="grid gap-2 list-none p-0">
                    <TechCard v-for="item in frontend" :key="item.name" :item="item" />
                </ul>
            </section>
        </div>

        <section aria-labelledby="apis-heading">
            <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-slate-100 rounded-xl text-slate-600" aria-hidden="true">
                    <ZapIcon :size="22" />
                </div>
                <h2 id="apis-heading" class="text-xl font-bold text-slate-800">{{ $t('about.apisTitle') }}</h2>
            </div>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                <TechCard v-for="item in apis" :key="item.name" :item="item" />
            </ul>
        </section>

        <section aria-labelledby="assets-heading">
            <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-slate-100 rounded-xl text-slate-600" aria-hidden="true">
                    <ImageIcon :size="22" />
                </div>
                <h2 id="assets-heading" class="text-xl font-bold text-slate-800">{{ $t('about.assetsTitle') }}</h2>
            </div>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
                <TechCard v-for="item in assets" :key="item.name" :item="item" />
            </ul>
        </section>

        <div class="grid md:grid-cols-2 gap-4">
            <a :href="repoFrontend" target="_blank" rel="noopener noreferrer"
                class="group p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:scale-[1.02] transition-all duration-300 shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                :aria-label="$t('about.repoFrontendTitle')">
                <div class="flex items-center gap-3 mb-3">
                    <GithubIcon :size="28" aria-hidden="true" />
                    <h2 class="font-bold text-lg">{{ $t('about.repoFrontendTitle') }}</h2>
                </div>
                <p class="text-slate-300 text-sm">{{ $t('about.repoFrontendDesc') }}</p>
                <div class="mt-4 flex items-center gap-2 text-primary transition-all">
                    <span class="text-sm font-medium">{{ $t('about.viewSource') }}</span>
                    <ExternalLinkIcon :size="14" aria-hidden="true" />
                </div>
            </a>
            <a :href="repoBackend" target="_blank" rel="noopener noreferrer"
                class="group p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:scale-[1.02] transition-all duration-300 shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                :aria-label="$t('about.repoBackendTitle')">
                <div class="flex items-center gap-3 mb-3">
                    <ServerIcon :size="28" aria-hidden="true" />
                    <h2 class="font-bold text-lg">{{ $t('about.repoBackendTitle') }}</h2>
                </div>
                <p class="text-slate-300 text-sm">{{ $t('about.repoBackendDesc') }}</p>
                <div class="mt-4 flex items-center gap-2 text-primary transition-all">
                    <span class="text-sm font-medium">{{ $t('about.viewSource') }}</span>
                    <ExternalLinkIcon :size="14" aria-hidden="true" />
                </div>
            </a>
        </div>

        <section class="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-200 shadow-lg"
            aria-labelledby="creator-heading">
            <div class="text-center space-y-2 mb-8">
                <h2 id="creator-heading" class="text-2xl font-bold text-slate-800">
                    {{ $t('about.creatorHeading') }}
                </h2>
            </div>

            <div class="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
                <div class="relative" aria-hidden="true">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-md opacity-50 animate-pulse" />
                    <div
                        class="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300">
                        <img :src="creator.avatar" :alt="`${creator.name} profile photo`"
                            class="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                <div>
                    <h3 class="text-2xl font-bold text-slate-800">{{ creator.name }}</h3>
                    <Badge
                        class="mt-2 px-4 py-1 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/10">
                        {{ $t('about.creatorRole') }}
                    </Badge>
                    <p class="text-slate-600 mt-4 leading-relaxed mx-auto">
                        {{ $t('about.creatorBio') }}
                    </p>
                </div>

                <div class="flex flex-wrap gap-3 justify-center pt-2" role="list">
                    <a v-for="link in creatorLinks" :key="link.href" :href="link.href" target="_blank"
                        rel="noopener noreferrer" :aria-label="link.label" role="listitem"
                        class="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                        <GithubIcon v-if="link.icon === 'github'" :size="18"
                            class="text-slate-500 group-hover:text-primary transition-colors" aria-hidden="true" />
                        <LinkedinIcon v-else-if="link.icon === 'linkedin'" :size="18"
                            class="text-slate-500 group-hover:text-primary transition-colors" aria-hidden="true" />
                        <MailIcon v-else-if="link.icon === 'email'" :size="18"
                            class="text-slate-500 group-hover:text-primary transition-colors" aria-hidden="true" />
                        <span class="text-sm font-medium text-slate-600 group-hover:text-primary transition-colors">{{
                            link.label }}</span>
                    </a>
                </div>
            </div>
        </section>

        <footer class="text-center space-y-3 pt-4">
            <Separator />
            <p class="text-sm text-slate-400 pt-4">
                {{ $t('about.copyright', { year: new Date().getFullYear() }) }}
            </p>
            <p class="text-xs text-slate-400">
                <i18n-t keypath="about.iconCredits" tag="span">
                    <template #lucide>
                        <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer"
                            class="hover:text-primary transition-colors focus-visible:underline focus-visible:outline-none">Lucide</a>
                    </template>
                    <template #svgrepo>
                        <a href="https://www.svgrepo.com" target="_blank" rel="noopener noreferrer"
                            class="hover:text-primary transition-colors focus-visible:underline focus-visible:outline-none">SVG
                            Repo</a>
                    </template>
                </i18n-t>
            </p>
        </footer>

    </div>
</template>