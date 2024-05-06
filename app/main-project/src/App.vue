<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useNumStore, useCounterStore } from '@/stores'
const numStore = useNumStore()
const counterStore = useCounterStore()

function handleClick() {
  counterStore.count++
}
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/micro-vue">Micro-vue</RouterLink>
    <RouterLink to="/micro-react">Micro-react</RouterLink>

  </nav>

  <p>count: {{ counterStore.count }}</p>
  <p>doubleCount: {{ counterStore.doubleCount }}</p>
  <el-button @click="counterStore.decrement">decrement</el-button>
  <el-button @click="counterStore.increment">increment</el-button>
  <el-button @click="handleClick">set sotre</el-button>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
