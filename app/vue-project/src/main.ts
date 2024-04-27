import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, type PiniaPlugin } from 'pinia'
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps
} from 'vite-plugin-qiankun/dist/helper'
import mitt, { type Emitter } from 'mitt'

import App from './App.vue'
import { routes } from './router'

let router = null
let instance: ReturnType<typeof createApp> | null = null
let history: ReturnType<typeof createWebHistory> | null = null

const isQiankun = Reflect.get(qiankunWindow, '__POWERED_BY_QIANKUN__')

declare module 'vite-plugin-qiankun/dist/helper' {
  interface QiankunProps {
    routerBase: string
    emitter: Emitter<Record<string | symbol, unknown>>
    piniaPlugin: PiniaPlugin
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $emitter: QiankunProps['emitter']
  }
}


function render(props: QiankunProps) {
  const container = props?.container
    ? props.container.querySelector('#micro-app')
    : document.getElementById('micro-app')
  history = createWebHistory(
    `${isQiankun ? props.routerBase : import.meta.env.BASE_URL}`
  )

  router = createRouter({
    history,
    routes
  })

  instance = createApp(App)
  if (props?.emitter) {
    instance.config.globalProperties.$emitter = props.emitter
  } else {
    instance.config.globalProperties.$emitter = mitt()
  }
  const pinia = createPinia()
  if (props?.piniaPlugin) {
    pinia.use(props.piniaPlugin)
  }
  instance.use(pinia)
  instance.use(router)
  instance.mount(container!)
}

export async function bootstrap() {
  console.log('[vue3-vite] app bootstraped')
}

export async function mount(props: any) {
  render(props)
}

export async function unmount() {
  instance!.unmount()
  instance!._container!.innerHTML = ''
  instance = null
  router = null
  history!.destroy()
}

if (!isQiankun) {
  bootstrap().then(mount)
}

renderWithQiankun({
  bootstrap() {
    console.log('bootstrap')
  },
  mount(props) {
    console.log('viteapp mount', props)
    render(props as QiankunProps)
  },
  update(props) {
    console.log('update', props)
  },
  unmount(props) {
    console.log('vite被卸载了', props)
    unmount()
  }
})
