<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, Home, User, Info, LogOut, Zap, Globe, Check } from 'lucide-vue-next'
import IconProfile from '../Profile/IconProfile.vue'
import { token } from '@/utils/refreshToken'
import useUserStore from '@/stores/user.store'
import BuyCreditComponent from '../BuyCreditComponent.vue'

const { t, locale } = useI18n()
const router = useRouter()

const emit = defineEmits<{ logout: [] }>()

const isSheetOpen = ref(false)

// locale.value = String(localStorage.getItem('lang')??'en')

const languages = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

function setLocale(code: string) {
  localStorage.setItem('lang', code)
  window.navigation.reload()
}

function navigate(name: string) {
  router.replace({ name })
  isSheetOpen.value = false
}

function handleLogout() {
  emit('logout')
  isSheetOpen.value = false
}
</script>

<template>
  <nav class="flex items-center" :aria-label="$t('nav.home')">
    <div class="hidden md:flex items-center gap-6" role="menubar">
      <template v-if="token">
        <div
          class="flex items-center bg-primary/10 rounded-2xl py-1 px-2 gap-1.5 text-sm text-primary"
          :aria-label="$t('nav.credits', { count: useUserStore().credits ?? 0 })"
        >
          <Zap class="fill-primary text-primary w-4" aria-hidden="true" />
          <span class="font-medium">{{ useUserStore().credits ?? 0 }}</span>
          <BuyCreditComponent />
        </div>

        <a
          href="/"
          role="menuitem"
          class="text-sm text-zinc-600 hover:text-primary transition-colors uppercase font-semibold no-underline"
          @click.prevent="navigate('home')"
        >
          {{ $t('nav.home') }}
        </a>
        <a
          href="/about"
          role="menuitem"
          class="text-sm text-zinc-600 hover:text-primary transition-colors uppercase font-semibold no-underline"
          @click.prevent="navigate('about')"
        >
          {{ $t('nav.about') }}
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger
            class="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-primary transition-colors uppercase font-semibold focus:outline-none"
            :aria-label="$t('nav.language')"
          >
            <Globe class="w-4 h-4" aria-hidden="true" />
            <span>{{ languages.find((l) => l.code === locale)?.flag }}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40">
            <DropdownMenuItem
              v-for="lang in languages"
              :key="lang.code"
              class="flex items-center gap-2 cursor-pointer"
              @click="setLocale(lang.code)"
            >
              <span>{{ lang.flag }}</span>
              <span class="flex-1 text-sm">{{ lang.label }}</span>
              <Check
                v-if="locale == lang.code"
                class="w-3.5 h-3.5 text-primary"
                aria-hidden="true"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <IconProfile />
      </template>

      <template v-else>
        <a
          href="/"
          role="menuitem"
          class="text-sm text-zinc-600 hover:text-primary transition-colors no-underline"
          @click.prevent="navigate('home')"
        >
          {{ $t('nav.home') }}
        </a>
        <a
          href="/about"
          role="menuitem"
          class="text-sm text-zinc-600 hover:text-primary transition-colors no-underline"
          @click.prevent="navigate('about')"
        >
          {{ $t('nav.about') }}
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger
            class="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-primary transition-colors focus:outline-none"
            :aria-label="$t('nav.language')"
          >
            <Globe class="w-4 h-4" aria-hidden="true" />
            <span>{{ languages.find((l) => l.code === locale)?.flag }}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-40">
            <DropdownMenuItem
              v-for="lang in languages"
              :key="lang.code"
              class="flex items-center gap-2 cursor-pointer"
              @click="setLocale(lang.code)"
            >
              <span>{{ lang.flag }}</span>
              <span class="flex-1 text-sm">{{ lang.label }}</span>
              <Check
                v-if="locale === lang.code"
                class="w-3.5 h-3.5 text-primary"
                aria-hidden="true"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          class="text-sm font-bold bg-primary rounded-2xl text-white px-3.5 py-2 hover:bg-primary/90 transition-colors"
          @click="useUserStore().popUpLogin = true"
          :aria-label="$t('auth.signInButton')"
        >
          {{ $t('nav.signIn') }}
        </button>
      </template>
    </div>

    <div class="flex md:hidden items-center gap-3">
      <Sheet v-model:open="isSheetOpen">
        <SheetTrigger
          class="text-primary bg-primary/15 rounded-full flex p-2 hover:bg-primary/25 transition-colors"
          :aria-label="$t('nav.openMenu')"
          :aria-expanded="isSheetOpen"
        >
          <Menu class="w-5 h-5" aria-hidden="true" />
        </SheetTrigger>

        <SheetContent
          side="right"
          class="w-72 flex flex-col pt-10 px-0"
          role="dialog"
          :aria-label="$t('nav.openMenu')"
        >
          <div class="px-6 pb-4">
            <template v-if="token">
              <div class="flex items-center gap-3">
                <IconProfile />
                <div>
                  <p class="text-sm font-semibold text-zinc-800">{{ useUserStore().name }}</p>
                  <div
                    class="flex items-center gap-1"
                    :aria-label="$t('nav.credits', { count: useUserStore().credits ?? 0 })"
                  >
                    <Zap class="text-primary fill-primary w-3" aria-hidden="true" />
                    <span class="text-xs text-zinc-500 font-medium">
                      {{ $t('nav.credits', { count: useUserStore().credits ?? 0 }) }}
                    </span>
                    <BuyCreditComponent />
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <p class="text-sm font-semibold text-zinc-800">{{ $t('nav.welcome') }}</p>
              <p class="text-xs text-zinc-400 mt-0.5">{{ $t('nav.welcomeSubtitle') }}</p>
            </template>
          </div>

          <Separator />

          <nav class="flex flex-col flex-1 px-2 py-3 gap-1">
            <SheetClose as-child>
              <a
                href="/"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-700 hover:bg-primary/30 hover:text-primary transition-colors w-full text-left no-underline"
              >
                <Home class="w-4 h-4" aria-hidden="true" />
                {{ $t('nav.home') }}
              </a>
            </SheetClose>
            <SheetClose as-child>
              <a
                href="/about"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-700 hover:bg-primary/30 hover:text-primary transition-colors w-full text-left no-underline"
              >
                <Info class="w-4 h-4" aria-hidden="true" />
                {{ $t('nav.about') }}
              </a>
            </SheetClose>
            <template v-if="token">
              <SheetClose as-child>
                <a
                  href="/profile"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-700 hover:bg-primary/30 hover:text-primary transition-colors w-full text-left no-underline"
                >
                  <User class="w-4 h-4" aria-hidden="true" />
                  {{ $t('nav.profile') }}
                </a>
              </SheetClose>
            </template>

            <Separator class="my-1" />
            <p class="px-4 pt-1 pb-0.5 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
              {{ $t('nav.language') }}
            </p>
            <button
              v-for="lang in languages"
              :key="lang.code"
              class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors w-full text-left"
              :class="
                locale === lang.code
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-zinc-700 hover:bg-primary/30 hover:text-primary'
              "
              @click="setLocale(lang.code)"
              :aria-pressed="locale === lang.code"
            >
              <Globe class="w-4 h-4" aria-hidden="true" />
              <span>{{ lang.flag }} {{ lang.label }}</span>
              <Check v-if="locale === lang.code" class="w-3.5 h-3.5 ml-auto" aria-hidden="true" />
            </button>
          </nav>

          <Separator />

          <div class="px-2 py-3">
            <template v-if="token">
              <SheetClose as-child>
                <button
                  class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                  @click="handleLogout"
                  :aria-label="$t('nav.signOut')"
                >
                  <LogOut class="w-4 h-4" aria-hidden="true" />
                  {{ $t('nav.signOut') }}
                </button>
              </SheetClose>
            </template>
            <template v-else>
              <SheetClose as-child>
                <button
                  class="w-full text-sm font-bold bg-primary rounded-2xl text-white px-3.5 py-2.5 hover:bg-primary/90 transition-colors"
                  @click="useUserStore().popUpLogin = true"
                >
                  {{ $t('nav.signIn') }}
                </button>
              </SheetClose>
            </template>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </nav>
</template>
