import { createApp } from 'vue'
import { createPinia, type PiniaPlugin } from 'pinia'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import { emitter } from '@/plugin/emitter'
import { publishPlugin, subscribePlugin } from 'com-stores'
import { createStore } from "./stores"

import App from './App.vue'
import router from './router'

import microApps from './micro-app'

const app = createApp(App)

const pinia = createPinia()
pinia.use(publishPlugin(emitter) as unknown as PiniaPlugin)

type Pinia = Parameters<typeof subscribePlugin>[1]
const piniaPlugin = subscribePlugin(emitter, pinia as unknown as Pinia)
type CPinia = Parameters<typeof createStore>[0]
createStore(pinia as unknown as CPinia)

app.use(pinia)
app.use(router)

app.mount('#app')

registerMicroApps(
  microApps.map((item) => {
    return {
      ...item,
      props: {
        ...item.props,
        emitter,
        piniaPlugin
      }
    }
  })
)

if (import.meta.env.MODE === 'production') {
  start({ sandbox: { strictStyleIsolation: true } })
} else {
  start()
}
