<script setup lang="ts">
import { useRouter } from 'vue-router'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Settings, LogOut, User } from 'lucide-vue-next'
import Avatar from '../ui/avatar/Avatar.vue'
import { AvatarImage } from '../ui/avatar'
import useUserStore from '@/stores/user.store'

const router = useRouter()
function goToSettings() { router.push('/profile') }
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="pointer-events-none sm:pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full" :aria-label="$t('nav.accountMenu', { name: useUserStore().name })" aria-haspopup="menu">
      <Avatar v-if="useUserStore().avatarUrl" class="w-13 h-13 md:w-10 md:h-10">
        <AvatarImage :src="useUserStore().avatarUrl" :alt="`${useUserStore().name}'s avatar`" />
      </Avatar>
      <div v-else class="text-primary bg-primary/15 rounded-full flex p-2 outline-none transition-colors hover:bg-primary/25" aria-hidden="true">
        <User class="w-8 h-8 md:w-5 md:h-5" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-44" role="menu">
      <DropdownMenuItem class="flex items-center gap-2 cursor-pointer" role="menuitem" @click="goToSettings">
        <Settings class="w-4 h-4 text-zinc-500" aria-hidden="true" />
        <span>{{ $t('nav.settings') }}</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50" role="menuitem" @click="useUserStore().logout()">
        <LogOut class="w-4 h-4" aria-hidden="true" />
        <span>{{ $t('nav.signOut') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>