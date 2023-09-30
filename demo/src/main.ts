import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { plugin } from "vue-promise-modals"
import { vCodePlugin } from "./plugins/v-code"

createApp(App)
.use(vCodePlugin)
.use(plugin, {
  transition: {
    name: "modal" // Uses the modal-* classes for transition animations for the modals
  }
})
.mount('#app')
