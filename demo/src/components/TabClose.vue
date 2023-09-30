<template>
  <dialog open>
    <div>
      <h1>Do you want to close the tab ? Unsaved changes will be lost</h1>
      <button @click="openNestedModal">Open Nested Modal</button>
      <button @click="emit('modal-resolve', 'cancel')">Cancel</button>
      <button @click="emit('modal-resolve', 'save-and-close')">Save and Close</button>
      <button @click="emit('modal-resolve', 'close')">Close</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useModals } from '../plugin'
import TestDialogInput from './TestDialogInput.vue';

const emit = defineEmits<{
  (e: "modal-resolve", value: 'save-and-close' | 'close' | 'cancel'): void
}>()

const { openModal } = useModals()

async function openNestedModal() {
  try {
    const userInput = await openModal(TestDialogInput, {
      name: "Sample text."
    })
    
    console.log("Modal Resolved:", userInput)
  } catch (e) {
    console.log("Modal Rejected:", e)
  }
}
</script>

<style scoped>
</style>