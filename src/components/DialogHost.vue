<template>
  <TransitionGroup v-bind="modalSystem.options?.transition ?? {}">
    <template
      v-for="modal in modalSystem.modalStack"
      :key="modal.id"
    >
        <component
          :is="modal.component"
          v-bind="modal.props"
          @modal-resolve="modalSystem.closeModal(modal.id, $event)"
          @modal-reject="modalSystem.closeModalAsRejected(modal.id, $event)"
        />
    </template>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { ModalSystem, ModalSystemSymbol } from "../plugin"

const modalSystem = inject<ModalSystem>(ModalSystemSymbol)!
</script>