<script setup lang="ts">
import Login from '@/components/login/Login.vue'
import useUserStore from '../stores/user.store'
import router from '../router/routes'
import useCategorysStore from '../stores/categorys.store'
import { onMounted, ref, watch } from 'vue'
import { refreshToken, token } from '../lib/refreshToken'
import NavBarComponent from '@/components/NavBar/NavBarComponent.vue'
import { Zap } from 'lucide-vue-next'
import useProductStore from '../stores/product.store'
import usePersonsStore from '../stores/persons.store'
import VerifyEmailCode from '@/components/login/VerifyEmailCode.vue'
import CookieConsentComponent from '@/components/CookieConsentComponent.vue'
import CreditsExhaustedDialog from '@/components/CreditsExhaustedDialog.vue'

const categoryStore = useCategorysStore()
const userStore = useUserStore()

const openCreditsExhaustedDialog = ref(false)

watch(
  () => userStore.credits,
  (newCredits) => {
    if (newCredits <= 0 && token.value) {
      setTimeout(() => {
        openCreditsExhaustedDialog.value = true;
      }, 1000);
    } else {
      openCreditsExhaustedDialog.value = false;
    }
  },
  { immediate: true }
);

function fetchStart() {
  categoryStore.getCategory()
  useProductStore().getProduct()
  refreshToken().then(async () => {
    await userStore.getUser()
  })
  usePersonsStore().getPersons()
}

onMounted(() => {
  fetchStart();
})
</script>

<template>
  <header
    class="fixed top-0 backdrop-blur-sm flex justify-between items-center w-full p-sm bg-white/70 z-50 select-none"
    role="banner">
    <a href="/" class="flex items-center gap-2 text-primary cursor-pointer no-underline" :aria-label="$t('nav.home')"
      @click.prevent="router.push('/')">
      <div class="w-12" aria-hidden="true">
        <img src="/src/assets/logo.webp" alt="Anti-Tédio logo" width="48" height="48" />
      </div>
      <span class="text-2xl font-bold font-sans tracking-tight">ANTI-TÉDIO</span>
    </a>

    <NavBarComponent @logout="userStore.logout()" />
  </header>

  <main class="mt-17 p-sm" id="main-content">
    <VerifyEmailCode />
    <CreditsExhaustedDialog :open="openCreditsExhaustedDialog" @buy-credits="userStore.buyCredits = true" />
    <Login />
    <router-view />
  </main>

  <CookieConsentComponent />

  <footer class="p-sm flex flex-wrap justify-between gap-10 mt-10 border-t border-gray-100" role="contentinfo"
    :aria-label="$t('footer.navigation')">
    <section :aria-label="$t('footer.tagline')" class="w-150">
      <a href="/" class="flex items-center gap-2 text-primary no-underline" :aria-label="$t('nav.home')"
        @click.prevent="router.push('/')">
        <Zap class="fill-primary" aria-hidden="true" />
        <span class="text-2xl font-bold font-sans tracking-tight">ANTI-TÉDIO</span>
      </a>
      <p class="text-gray-400 text-md font-medium mt-sm leading-relaxed">
        {{ $t('footer.tagline') }}
      </p>
    </section>

    <nav :aria-label="$t('footer.navigation')" class="w-100">
      <h2 class="font-bold text-gray-500 tracking-widest text-xs uppercase">
        {{ $t('footer.navigation') }}
      </h2>
      <ul class="flex flex-col mt-sm text-gray-700 gap-3 font-medium list-none p-0">
        <li>
          <a href="/" class="hover:text-primary transition-colors" @click.prevent="router.push('/')">
            {{ $t('nav.home') }}
          </a>
        </li>
        <li>
          <a href="/profile" class="hover:text-primary transition-colors">
            {{ $t('footer.myAccount') }}
          </a>
        </li>
        <li>
          <a href="/persons" class="hover:text-primary transition-colors">
            {{ $t('footer.explore') }}
          </a>
        </li>
      </ul>
    </nav>

    <nav :aria-label="$t('footer.support')" class="w-100">
      <h2 class="font-bold text-gray-500 tracking-widest text-xs uppercase">
        {{ $t('footer.support') }}
      </h2>
      <ul class="flex flex-col mt-sm text-gray-700 gap-3 font-medium list-none p-0">
        <li>
          <a href="/privacy" class="hover:text-primary transition-colors">{{
            $t('footer.privacy')
            }}</a>
        </li>
        <li>
          <a href="/terms" class="hover:text-primary transition-colors">{{ $t('footer.terms') }}</a>
        </li>
        <li>
          <a href="/contact" class="hover:text-primary transition-colors">{{
            $t('footer.contact')
            }}</a>
        </li>
      </ul>
    </nav>

    <p class="w-full text-center text-xs text-gray-300 pt-4 border-t border-gray-100">
      {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
    </p>
  </footer>
</template>