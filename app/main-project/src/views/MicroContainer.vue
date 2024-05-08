<template>
  <input type="text" name="" id="" />
  <div ref="container" id="micro-container"></div>
</template>

<script lang="ts">
  import type { MicroApp } from "qiankun";
  export default {
    name: "MicroContainer",
    beforeRouteEnter() {
      const microApp: MicroApp | null = (this as unknown as { microApp: MicroApp })?.microApp
      microApp && microApp.update?.({ activated: true })

    },
    beforeRouteLeave() {
      const microApp: MicroApp | null = (this as unknown as { microApp: MicroApp })?.microApp
      microApp && microApp.update?.({ activated: false })
    }
  };
</script>

<script setup lang="ts">
import { loadMicroApp } from 'qiankun'
import { subscribePlugin } from 'com-stores'
import microApps from '../micro-app'
import { emitter as originEmitter } from '@/plugin/emitter'
import { getActivePinia } from 'pinia'
import { onMounted, onUnmounted, getCurrentInstance, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/css'
import { qiankunSandboxPatch } from '@/plugin/qiankunSandboxPatch'

const container = ref<HTMLElement | null>(null)

const { appContext } = getCurrentInstance()!

type EmitterParames = Parameters<(typeof originEmitter)['on']>
/** 记录监听的事件 */
const emitterEvents = new Map<EmitterParames[0], EmitterParames[1]>()
const emitter = {
  ...originEmitter,
  on: (...arg: EmitterParames) => {
    const [type, handler] = arg
    emitterEvents.set(type, handler)
    originEmitter.on(...arg)
  }
}

type Pinia = Parameters<typeof subscribePlugin>[1]
const pinia = getActivePinia()
const piniaPlugin = subscribePlugin(emitter, pinia as unknown as Pinia)

const route = useRoute()
const app = microApps.find((item) => item.activeRule === route.name)

const microApp = shallowRef<ReturnType<typeof loadMicroApp> | null>(null);

function loadMicro(appOption = {}) {
  if (!app) return

  if (microApp.value) {
    microApp.value.unmount();
    microApp.value = null;
  }

  const options = Object.assign(
    {
      ...app,
      props: {
        ...app.props,
        emitter,
        piniaPlugin
      }
    },
    appOption || {}
  )

  microApp.value = loadMicroApp(options, {
    // ...(import.meta.env.MODE === 'production' && { sandbox: { strictStyleIsolation: true } }),
    // sandbox: { strictStyleIsolation: true },
    // sandbox: { experimentalStyleIsolation: true },
    singular: false
  })

  /** 取消拦截原生 document.head.appendChild 方法 */
  const removeEffect = qiankunSandboxPatch.use((node: Element) => {
    if (node.tagName === 'LINK') {
      const href = node.getAttribute('href') || ''
      if (href.startsWith(`/${app.base}/`)) {
        const head = container.value!.querySelector('qiankun-head')
        return head!.appendChild(node)
      }
    }
  })

  const originUnmount = microApp.value!.unmount.bind(microApp.value)
  Reflect.set(microApp.value, 'unmount', function () {
    // 取消子应用事件监听， 防止内存泄露
    emitterEvents.forEach((handler, type) => {
      emitter.off(type, handler)
    })
    emitterEvents.clear()
    removeEffect()
    return originUnmount()
  })
}

onMounted(() => {
  if (app) {
    loadMicro()

    const timer = setTimeout(async () => {
      // 模拟子应版本更新，切换新版本的子应用
      await ElMessageBox.confirm('是否切换到最新版？', '检测子应版本更新', {}, appContext)
      loadMicro({
        name: 'vue-project-v1',
        entry: `${app.entry}?t=${Date.now()}`
      })
    }, 10000)

    onUnmounted(() => {
      clearTimeout(timer)
    })
  }
})

onUnmounted(() => {
  microApp.value && microApp.value.unmount()
})

defineExpose({ microApp })
</script>
