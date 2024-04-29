<template>
  <input type="text" name="" id="" />
  <div id="micro-container"></div>
</template>

<script setup lang="ts">
import { loadMicroApp, setDefaultMountApp } from 'qiankun'
import { subscribePlugin } from 'com-stores'
import microApps from '../micro-app'
import { emitter } from '@/plugin/emitter'
import { getActivePinia } from 'pinia'
import { onMounted } from 'vue'
type Pinia = Parameters<typeof subscribePlugin>[1]
const pinia = getActivePinia()
const piniaPlugin = subscribePlugin(emitter, pinia as unknown as Pinia)

const app = microApps[1]
onMounted(() => {
  loadMicroApp(
    {
      ...app,
      props: {
        ...app.props,
        emitter,
        piniaPlugin
      }
    },
    {
      ...(import.meta.env.MODE === 'production' && { sandbox: { strictStyleIsolation: true } }),
      singular: false
    }
  )
})
</script>
