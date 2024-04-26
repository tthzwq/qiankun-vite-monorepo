<template>
  <MicroApp v-bind="current"></MicroApp>
</template>

<script setup lang="ts">
import { MicroApp } from 'qiankun-monorepo/packages/ui-bindings/vue/dist/esm'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const microApps = [
  {
    name: 'vue-project',
    /** 主应用 触发加载子应用的路由 */
    activeRule: 'micro-vue',
    /** 子应用 dev url */
    entry: '//localhost:3000',
    /** 子应用 viteConfig.base */
    base: 'vue'
  },
  {
    name: 'react-project',
    entry: '//localhost:3001',
    activeRule: 'micro-react',
    base: 'react'
  }
]
if (import.meta.env.MODE === 'production') {
  microApps.forEach((item) => {
    // 部署时替换子应用入口
    item.entry = window.origin + import.meta.env.BASE_URL + item.base
  })
}

const current = computed(() => {
  const app = microApps.find(({ activeRule }) => route.path.includes(activeRule))
  if (app) {
    return {
      name: app.name,
      entry: app.entry,
      appProps: {
        routerBase: app.activeRule
      }
    }
  }
  return {
    name: '',
    entry: ''
  }
})
</script>
