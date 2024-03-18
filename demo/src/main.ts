import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { plugin } from "vue-promise-modals"
import { vCodePlugin } from "./plugins/v-code"

const app = createApp(App).use(vCodePlugin)
 
// @ts-expect-error TODO: check weird type checking error here
app.use(plugin, { 
  transition: {
    name: "modal" // Uses the modal-* classes for transition animations for the modals
  }
})
.mount('#app')
