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
import { createStore } from './stores'

let router = null
let instance: ReturnType<typeof createApp> | null = null
let history: ReturnType<typeof createWebHistory> | null = null
type QiankunEmitter = Emitter<Record<string | symbol, unknown>>
type EmitterParames = Parameters<QiankunEmitter['on']>
/** 记录监听的事件 */
const emitterEvents = new Map<EmitterParames[0], EmitterParames[1]>()

const isQiankun = Reflect.get(qiankunWindow, '__POWERED_BY_QIANKUN__')

declare module 'vite-plugin-qiankun/dist/helper' {
  interface QiankunProps {
    routerBase: string
    emitter: QiankunEmitter
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
  history = createWebHistory(`${isQiankun ? props.routerBase : import.meta.env.BASE_URL}`)

  router = createRouter({
    history,
    routes
  })

  instance = createApp(App)
  if (props?.emitter) {
    const emitterOn = props.emitter.on
    Reflect.set(props.emitter, 'on', (...arg: EmitterParames) => {
      const [type, handler] = arg
      emitterEvents.set(type, handler)
      emitterOn.apply(props.emitter, arg)
    })
    instance.config.globalProperties.$emitter = props.emitter
  } else {
    instance.config.globalProperties.$emitter = mitt()
  }
  const pinia = createPinia()
  if (props?.piniaPlugin) {
    pinia.use(props.piniaPlugin)
  }
  type Pinia = Parameters<typeof createStore>[0]
  createStore(pinia as unknown as Pinia)
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

export async function unmount(props: QiankunProps) {
  instance!.unmount()
  instance!._container!.innerHTML = ''
  instance = null
  router = null
  history!.destroy()
  // 取消事件监听， 防止内存泄露
  emitterEvents.forEach((handler, type) => {
    props.emitter.off(type, handler)
  })
  emitterEvents.clear()
}

if (!isQiankun) {
  bootstrap().then(mount)
}

renderWithQiankun({
  bootstrap() {
    console.log('bootstrap')
  },
  mount(props: QiankunProps) {
    console.log('viteapp mount', props)
    render(props)
  },
  update(props: QiankunProps) {
    console.log('update', props)
  },
  unmount(props: QiankunProps) {
    console.log('vite被卸载了', props)
    unmount(props)
  }
})
