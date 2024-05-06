import { createApp } from 'vue'
import { createPinia, type PiniaPlugin } from 'pinia'
import { emitter } from '@/plugin/emitter'
import { publishPlugin, subscribePlugin } from 'com-stores'
import { createStore } from './stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(publishPlugin(emitter) as unknown as PiniaPlugin)

type CPinia = Parameters<typeof createStore>[0]
createStore(pinia as unknown as CPinia)

app.use(pinia)
app.use(router)

app.mount('#app')
