<script setup lang="ts">
import { ref } from 'vue'
import { Card } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Camera, User, MoreVertical, LogOut, Trash2, KeyRound } from 'lucide-vue-next'

defineProps<{ username: string; avatarUrl?: string }>()
const emit = defineEmits<{
  (e: 'edit-photo'): void
  (e: 'logout'): void
  (e: 'delete-account'): void
  (e: 'change-password'): void
  (e: 'privacy-settings'): void
  (e: 'notification-settings'): void
}>()
const isHoveringAvatar = ref(false)
</script>

<template>
  <Card class="p-6 border-none bg-white/30 backdrop-blur-sm" role="region" :aria-label="$t('profile.myAccount')">
    <div class="flex items-center justify-center sm:justify-between">
      <div class="flex flex-col items-center gap-5 sm:flex-row sm:items-center" @mouseenter="isHoveringAvatar = true" @mouseleave="isHoveringAvatar = false">
        <div class="relative w-30 h-30 sm:w-18 sm:h-18 shrink-0 self-center">
          <div class="w-30 h-30 sm:w-18 sm:h-18 rounded-full overflow-hidden bg-muted ring-2 ring-border flex items-center justify-center">
            <img v-if="avatarUrl" :src="avatarUrl" :alt="`${username}'s profile photo`" class="w-full h-full object-cover" />
            <User v-else class="w-20 h-20 sm:w-7 sm:h-7 text-muted-foreground" aria-hidden="true" />
          </div>
          <button :class="['absolute inset-0 rounded-full flex items-center justify-center', 'bg-black/50 transition-opacity duration-200', isHoveringAvatar ? 'opacity-100' : 'opacity-0', 'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2']" :aria-label="$t('profile.editPhotoLabel')" @click="emit('edit-photo')">
            <Camera class="w-10 h-10 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
          </button>
        </div>
        <div>
          <p class="text-sm text-muted-foreground uppercase tracking-wider font-semibold hidden sm:block">{{ $t('profile.member') }}</p>
          <h1 class="text-2xl font-bold tracking-tight">{{ username }}</h1>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger class="h-8 w-8 absolute right-6 sm:flex flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-black/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring self-start" :aria-label="$t('profile.accountOptionsLabel')" aria-haspopup="menu">
          <MoreVertical class="w-5 h-5" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-52" role="menu">
          <DropdownMenuLabel>{{ $t('profile.myAccount') }}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="emit('change-password')" class="cursor-pointer" role="menuitem">
            <KeyRound class="w-4 h-4 mr-2" aria-hidden="true" />
            {{ $t('profile.changePassword') }}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="emit('logout')" class="cursor-pointer" role="menuitem">
            <LogOut class="w-4 h-4 mr-2" aria-hidden="true" />
            {{ $t('profile.signOut') }}
          </DropdownMenuItem>
          <DropdownMenuItem @click="emit('delete-account')" class="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" role="menuitem">
            <Trash2 class="w-4 h-4 mr-2" aria-hidden="true" />
            {{ $t('profile.deleteAccount') }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Card>
</template>