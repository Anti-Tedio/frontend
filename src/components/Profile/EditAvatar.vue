<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { UploadCloud, X } from 'lucide-vue-next'
import useUserStore from '@/stores/user.store'

const isOpen = ref(false)
defineExpose({ isOpen })

const userStore = useUserStore()
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isDragging = ref(false)
const errorMessage = ref('')
const isUploading = ref(false)

const MAX_MB = 5
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp']

function validateFile(file: File): boolean {
  errorMessage.value = ''
  if (!VALID_TYPES.includes(file.type)) {
    errorMessage.value = 'error.format'
    return false
  }
  if (file.size > MAX_MB * 1024 * 1024) {
    errorMessage.value = 'error.size'
    return false
  }
  return true
}

function handleFile(file: File) {
  if (!validateFile(file)) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

function onFileInput(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) handleFile(input.files[0])
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  if (e.dataTransfer?.files?.[0]) handleFile(e.dataTransfer.files[0])
}

function discard() {
  selectedFile.value = null
  previewUrl.value = null
  errorMessage.value = ''
}

async function confirm() {
  if (!selectedFile.value) return
  isUploading.value = true
  try {
    await userStore.editAvatar(selectedFile.value)
    discard()
    isOpen.value = false
  } catch (e) {
    console.error('Avatar upload error:', e)
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen" aria-labelledby="edit-avatar-title">
    <DialogContent class="sm:max-w-100 rounded-2xl p-0 overflow-hidden" role="dialog" aria-modal="true">
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-slate-100">
        <div class="flex items-center justify-between">
          <DialogTitle id="edit-avatar-title" class="text-lg font-bold text-slate-900">
            {{ $t('editAvatar.dialogTitle') }}
          </DialogTitle>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 space-y-5">
        <!-- Preview -->
        <figure v-if="previewUrl" class="relative flex flex-col items-center gap-3" :aria-label="$t('editAvatar.previewLabel')">
          <div class="relative">
            <img :src="previewUrl" alt="" class="w-28 h-28 rounded-full object-cover ring-4 ring-primary/20 shadow-lg" />
            <span class="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow" :aria-label="$t('editAvatar.newPhotoLabel')">
              {{ $t('editAvatar.newBadge') }}
            </span>
          </div>
          <figcaption class="sr-only">{{ $t('editAvatar.previewLabel') }}</figcaption>
        </figure>

        <!-- Drop zone -->
        <div
          role="button"
          tabindex="0"
          :aria-label="$t('editAvatar.dropzoneLabel')"
          class="relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :class="isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-slate-200 hover:border-primary/40 hover:bg-slate-50'"
          @click="($refs.fileInput as HTMLInputElement).click()"
          @keydown.enter="($refs.fileInput as HTMLInputElement).click()"
          @keydown.space.prevent="($refs.fileInput as HTMLInputElement).click()"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="onDrop"
        >
          <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" class="sr-only" @change="onFileInput" />
          <UploadCloud class="w-8 h-8 text-slate-400" aria-hidden="true" />
          <p class="text-sm font-medium text-slate-500 text-center">
            {{ isDragging ? $t('editAvatar.dropzoneActive') : $t('editAvatar.dropzoneText') }}
          </p>
          <p class="text-xs text-slate-400">{{ $t('editAvatar.dropzoneHint') }}</p>
        </div>

        <!-- Error -->
        <p v-if="errorMessage" class="text-xs text-rose-600 font-medium text-center" role="alert" aria-live="assertive">
          <template v-if="errorMessage === 'error.format'">{{ $t('editAvatar.errorFormat') }}</template>
          <template v-else-if="errorMessage === 'error.size'">{{ $t('editAvatar.errorSize', { max: MAX_MB }) }}</template>
        </p>
      </div>

      <!-- Actions -->
      <div class="px-6 pb-6 flex gap-3">
        <template v-if="selectedFile">
          <Button variant="outline" class="flex-1 rounded-xl" :aria-label="$t('editAvatar.discardLabel')" @click="discard">
            {{ $t('editAvatar.discard') }}
          </Button>
          <Button class="flex-1 rounded-xl" :disabled="isUploading" :aria-busy="isUploading" :aria-label="$t('editAvatar.confirmLabel')" @click="confirm">
            {{ isUploading ? $t('editAvatar.uploading') : $t('editAvatar.confirm') }}
          </Button>
        </template>
        <template v-else>
          <DialogClose as-child>
            <Button variant="ghost" class="w-full rounded-xl text-slate-400" :aria-label="$t('editAvatar.cancelLabel')">
              {{ $t('editAvatar.cancel') }}
            </Button>
          </DialogClose>
        </template>
      </div>
    </DialogContent>
  </Dialog>
</template>