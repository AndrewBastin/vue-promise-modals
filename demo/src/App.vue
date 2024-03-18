<template>
  <header>
    <h1 class="header-icon">💬</h1>
    <h1>vue-promise-modals</h1>
  </header>
  <main>
    <p>
      <span class="code-text">vue-promise-modals</span> is a simple Vue 3 plugin for opening modals using promises while
      maintaining type safety and inference.
    </p>
    <br /> <br />
    <h1>
      Installation
    </h1>
    <p>
    <ul>
      <li>
        <p>Install the NPM package.</p>
        <pre v-code="'bash'">$ npm install vue-promise-modals</pre>
      </li>
      <li>
        <p>Install the plugin on the Vue app</p>
        <pre v-code="'javascript'">import App from "./App.vue"
import { createApp } from "vue"
import { plugin } from "vue-promise-modals"

createApp(App)
  .use(VuePromiseModalsPlugin, {
    // Options go here
  })</pre>
      </li>
      <li>
        <p>Define DialogHost component on the component where you want to render the modals.</p>
        <pre v-code="'vue'">&lt;template&gt;
  ...
  &lt;DialogHost /&gt;
  ...
&lt;/template&gt;
&lt;script&gt;
  import { DialogHost } from "vue-promise-modals"
&lt;/script&gt;
</pre>
      </li>
    </ul>
    </p>
    <h1>
      Usage
    </h1>
    <p>
      <span class="code-text">vue-promise-modals</span> exposes a <span class="code-text">useModals</span> composable
      that returns the <span class="code-text">openModal</span> function that can be used to open modals. The modals are <i>'resolved'</i> using either the <span class="code-text">modal-resolve</span> (for
      successful completion) or <span class="code-text">modal-reject</span> (for failure) events.
    </p>

    <ul>
      <li>
        <p>Example Modal Component</p>
        <pre v-code="'vue'">&lt;!-- GreetModal.vue --&gt;
&lt;template&gt;
  &lt;dialog open&gt;
    &lt;h1&gt;Hello &#123;&#123; props.name &#125;&#125;!&lt;/h1&gt;

    &lt;button @click=&quot;emit('modal-reject')&quot;&gt;
      Close
    &lt;/button&gt;
  &lt;/dialog&gt;
&lt;/template&gt;

&lt;script setup lang=&quot;ts&quot;&gt;
// Use props to define modal inputs
const props = defineProps&lt;{
  name: string
}&gt;();

// Use emits to define modal outputs
const emit = defineEmits&lt;{
  (e: 'modal-reject'): void // Emit can also accept a payload
  (e: 'modal-resolve', value: { name: string }): void
}&gt;();
&lt;/script&gt;</pre>
      </li>
      <li>
        <p>Summoning the modal</p>
        <pre v-code="'vue'">&lt;script setup lang=&quot;ts&quot;&gt;
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
&lt;/script&gt;</pre>
      </li>
    </ul>
    <h2>Transitions</h2>
    <p>
      Transition animations can be applied to the modals by passing in the options in the
      <span class="code-text">vue-promise-modals</span> Vue plugin. The plugin options follow
      the same options as the props accepted by the
      <a href="https://vuejs.org/api/built-in-components.html#transitiongroup">Vue <span class="code-text">TransitionGroup</span> element</a>.
    </p>
    <h1>Demo</h1>
    <p>
      <div>
        <button class="demo-button" @click="openSimpleModal">Simple Modal</button>
      </div>

      <div>
        <button class="demo-button" @click="openModalWithInput">Modal with input</button>
        <p>
          <span>Status: </span>
          <span
            v-if="modalWithInputReturn === undefined"
          >
            Not Opened
          </span>

          <span
            v-else-if="modalWithInputReturn.type === 'resolve'"
            :style="{ color: 'green' }"
          >
            Resolved with value '{{ modalWithInputReturn.value }}'
          </span>

          <span
            v-else-if="modalWithInputReturn.type === 'reject'"
            :style="{ color: 'red' }"
          >
            Cancelled
          </span>
        </p>
      </div>

      <div>
        <button class="demo-button" @click="openNestedModalDemo">Nested Modals</button>
      </div>
    </p>
    <DialogHost />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { DialogHost, useModals } from 'vue-promise-modals'
import SimpleModal from "./components/example/SimpleModal.vue"
import ModalWithInput from "./components/example/ModalWithInput.vue"
import NestedModal from "./components/example/NestedModal.vue";

type ModalWithInputReturn =
  | { type: "resolve"; value: string }
  | { type: "reject" }

const count = ref(0)
const modalWithInputReturn = ref<ModalWithInputReturn>()

const { openModal } = useModals()

function openSimpleModal() {
  count.value++

  openModal(SimpleModal, {
    openCount: count.value
  })
}

async function openModalWithInput() {
  try {
    const result = await openModal(ModalWithInput)
    modalWithInputReturn.value = { type: "resolve", value: result.text }
  } catch (_) {
    modalWithInputReturn.value = { type: "reject" }
  }
}

function openNestedModalDemo() {
  openModal(NestedModal)
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
}

header h1 {
  width: fit-content;
}

.header-icon {
  font-size: 5rem;
  margin: 0;
}
</style>
