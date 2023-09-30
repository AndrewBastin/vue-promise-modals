<div align="center">

# vue-promise-modals

</div>

A Vue 3 library to create modals that are resolved with promises.

**A demo of this library is available at [vue-promise-modals.andrewbast.in](https://vue-promise-modals.andrewbast.in).**

## Installation
 - Install the NPM package.
   ```bash
   $ npm install vue-promise-modals
   ```

 - Install the plugin on the Vue app
   ```js
   import App from "./App.vue"
   import { createApp } from "vue"
   import VuePromiseModalsPlugin from "vue-promise-modals"
   
   createApp(App)
     .use(VuePromiseModalsPlugin, {
       // Options go here
     })
   ```

 - Define DialogHost component on the component where you want to render the modals.
   ```vue
   <template>
     ...
     <DialogHost />
     ...
   </template>
   ```

## Usage
vue-promise-modals exposes a useModals composable that returns the openModal function that can be used to open modals. The modals are 'resolved' using either the modal-resolve (for successful completion) or modal-reject (for failure) events.

### Example Modal Component
```vue
<!-- GreetModal.vue -->
<template>
  <dialog open>
    <h1>Hello {{ props.name }}!</h1>

    <button @click="emit('modal-reject')">
      Close
    </button>
  </dialog>
</template>

<script setup lang="ts">
// Use props to define modal inputs
const props = defineProps<{
  name: string
}>();

// Use emits to define modal outputs
const emit = defineEmits<{
  (e: 'modal-reject'): void // Emit can also accept a payload
  (e: 'modal-resolve', value: { name: string }): void
}>();
</script>
```

### Summoning the modal
```vue
<script setup lang="ts">
import { useModals } from 'vue-promise-modals';
import GreetModal from "./GreetModal.vue";

const { openModal } = useModals()

async function openDialog() {
  try {
    const result = await openModal(GreetModal, {
      // Props go here (and its type checked!)
      name: `Modal ${counter++}`,
    })

    // The result value will be the same value emitted through the `modal-resolve` event
    console.log(result.name)
  } catch (e) {
    // The error value will be the same value as emitted through the `modal-reject` event
    console.log("Modal Rejected:", e)
  }
}
</script>
```

### Transitions
Transition animations can be applied to the modals by passing in the options in the `vue-promise-modals` Vue plugin. The plugin options follow the same options as the props accepted by the [Vue `TransitionGroup` element](https://vuejs.org/api/built-in-components.html#transitiongroup).

```js
import { createApp } from 'vue'
import App from './App.vue'
import { plugin } from "vue-promise-modals"

createApp(App)
.use(plugin, {
  transition: {
    name: "modal" // Uses the modal-* classes for transition animations for the modals
  }
})
.mount('#app')
```