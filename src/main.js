/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { registerLayouts } from './layouts/register.js';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import emitter from '@/emitter.js'

const app = createApp(App)

app.provide('$emitter', emitter)
app.config.globalProperties.$emitter = emitter

registerPlugins(app)
registerLayouts(app)
app.mount('#app')
