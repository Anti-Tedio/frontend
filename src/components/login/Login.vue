<script setup lang="ts">
import MethodLogin from './MethodLogin.vue'
import LoginEmail from './LoginEmail.vue'
import { ref } from 'vue'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import router from '@/router/routes'
import { X } from 'lucide-vue-next'
import useUserStore from '@/stores/user.store'

const userStore = useUserStore()

const email = ref(false)
</script>

<template>
  <Dialog
    v-model:open="userStore.popUpLogin"
    @vue:before-unmount="router.push('/persons')"
    aria-label="Authentication dialog"
  >
    <!-- Backdrop overlay -->
    <div
      class="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm"
      v-if="userStore.popUpLogin"
      aria-hidden="true"
    />

    <DialogContent
      class="bg-white sm:max-w-100 w-full z-51 rounded-3xl p-lg max-h-dvh overflow-auto"
      :show-close-button="false"
      role="dialog"
      aria-modal="true"
      :aria-label="email ? 'Sign in with email' : 'Choose sign in method'"
    >
      <DialogClose
        class="absolute right-md top-md text-gray-400 cursor-pointer hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-0.5"
        as-child
        aria-label="Close sign in dialog"
      >
        <X aria-hidden="true" />
      </DialogClose>

      <MethodLogin @email="email = !email" v-if="!email" />
      <LoginEmail @back-method-login="email = false" v-else />
    </DialogContent>
  </Dialog>
</template>