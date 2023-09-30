<template>
  <button @click="closeTab">Close Tab</button>
</template>

<script setup lang="ts">
import { useModals } from '../plugin'
import TabClose from './TabClose.vue'

const { openModal } = useModals()

async function closeTab() {
  const userChoice = await openModal(TabClose)

  if (userChoice === 'save-and-close') {
    // save and close
    console.log("Save and Close")
  } else if (userChoice === 'close') {
    // close
    console.log("Close")
  } else {
    // cancel
    console.log("Cancel")
  }
}
</script>

<style scoped>
</style>
