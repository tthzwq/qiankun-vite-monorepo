import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

import App from './App.vue'
import { routes } from './router'

let router = null
let instance: ReturnType<typeof createApp> | null = null
let history: ReturnType<typeof createWebHistory> | null = null

function render(props: any) {
  const container = props?.container
    ? props.container.querySelector('#micro-app')
    : document.getElementById('micro-app')
  history = createWebHistory(
    // @ts-ignore
    `${qiankunWindow.__POWERED_BY_QIANKUN__ ? props.routerBase : import.meta.env.BASE_URL}`
  )

  router = createRouter({
    history,
    routes
  })

  instance = createApp(App)
  instance.use(createPinia())
  instance.use(router)
  instance.mount(container)
}

export async function bootstrap() {
  console.log('[vue3-vite] app bootstraped')
}

function storeTest(props: any) {
  props?.onGlobalStateChange &&
    props.onGlobalStateChange(
      // @ts-ignore
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    )
  props?.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}

export async function mount(props: any) {
  storeTest(props)
  render(props)
  instance!.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
  instance!.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  instance!.unmount()
  instance!._container!.innerHTML = ''
  instance = null
  router = null
  history!.destroy()
}

// @ts-ignore
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount)
}

renderWithQiankun({
  bootstrap() {
    console.log('bootstrap')
  },
  mount(props) {
    console.log('viteapp mount', props)
    render(props)
  },
  update(props) {
    console.log('update', props)
  },
  unmount(props) {
    console.log('vite被卸载了', props)
    unmount()
  }
})
