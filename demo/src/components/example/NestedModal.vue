<template>
  <dialog ref="dialog">
    <div class="dialog-header">
      <h2>Nested Modal Demo</h2>
      <button class="dialog-close" @click="emit('modal-resolve', {})">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"/></svg>
      </button>
    </div>
    <div>
      <button @click="openNestedModal">
        Open Nested Modal
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useModals } from "vue-promise-modals"
import NestedSecondModal from "./NestedSecondModal.vue";

const { openModal } = useModals()

const emit = defineEmits<{
  (e: "modal-resolve", data: {}): void
}>()

const dialog = ref<HTMLDialogElement>()

onMounted(() => {
  dialog.value?.showModal()
})

function openNestedModal() {
  openModal(NestedSecondModal)
}
</script>
