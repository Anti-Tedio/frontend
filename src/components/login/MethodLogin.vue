<script setup lang="ts">
import useUserStore from '@/stores/user.store'
import facebookIcon from '../icons/facebookIcon.vue'
import googleIcon from '../icons/googleIcon.vue'

const userStore = useUserStore()
defineEmits(['email'])
</script>

<template>
  <section class="flex flex-col items-center justify-center gap-7 animate-in fade-in slide-in-from-right-2 duration-300" aria-labelledby="login-method-heading">
    <div class="rounded-2xl" aria-hidden="true">
      <img src="/src/assets/logo.png" class="w-25" alt="Anti-Tédio logo" width="100" height="100" />
    </div>
    <header class="text-center">
      <h2 id="login-method-heading" class="text-2xl font-bold">{{ $t('auth.welcomeTitle') }}</h2>
      <p class="font-medium text-sm text-gray-500 mt-1">{{ $t('auth.chooseMethod') }}</p>
    </header>
    <div class="w-full flex flex-col gap-4" role="group" :aria-label="$t('auth.chooseMethod')">
      <button class="w-full h-15 border-2 border-gray-100 rounded-2xl fill-gray-700 font-medium flex justify-center items-center gap-4 hover:border-primary/30 hover:bg-primary/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" @click="userStore.loginProvider('google')" :aria-label="$t('auth.continueGoogle')">
        <googleIcon class="w-5" aria-hidden="true" />
        {{ $t('auth.continueGoogle') }}
      </button>
      <button class="w-full h-15 border-2 border-gray-100 rounded-2xl font-medium flex justify-center items-center gap-4 hover:border-primary/30 hover:bg-primary/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" @click="userStore.loginProvider('facebook')" :aria-label="$t('auth.continueMeta')">
        <facebookIcon class="w-5" aria-hidden="true" />
        {{ $t('auth.continueMeta') }}
      </button>
    </div>
    <div class="flex items-center gap-3 w-full" role="separator">
      <span class="flex-1 h-px bg-gray-100" aria-hidden="true"></span>
      <span class="text-xs text-gray-400 font-medium uppercase tracking-widest" aria-hidden="true">or</span>
      <span class="flex-1 h-px bg-gray-100" aria-hidden="true"></span>
    </div>
    <button class="w-full h-15 bg-primary rounded-2xl font-medium flex justify-center items-center gap-4 text-white hover:bg-primary/90 hover:scale-[1.02] transition-all duration-150 shadow-md shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none" @click="$emit('email')" :aria-label="$t('auth.signInEmail')">
      <span class="material-symbols-outlined" aria-hidden="true">mail</span>
      {{ $t('auth.signInEmail') }}
    </button>
    <p class="text-sm text-center font-medium text-gray-400">
      <i18n-t keypath="auth.termsNotice" tag="span">
        <template #terms>
          <a class="text-gray-600 hover:text-primary underline transition-colors" href="/terms">{{ $t('auth.termsLink') }}</a>
        </template>
        <template #privacy>
          <a class="text-gray-600 hover:text-primary underline transition-colors" href="/privacy">{{ $t('auth.privacyLink') }}</a>
        </template>
      </i18n-t>
    </p>
  </section>
</template>