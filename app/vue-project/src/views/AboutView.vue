<template>
  <div class="about">
    <ComButton />
    <ComInput />
    <h1>这是子应用 About 页面</h1>

<p>count: {{ counterStore.count }}</p>
<p>doubleCount: {{ counterStore.doubleCount }}</p>
<button @click="counterStore.decrement">decrement</button>
<button @click="counterStore.increment">increment</button>
<button @click="handleClick">$forceUpdate</button>

<input type="text" v-model="value">
  </div>
</template>

<script setup lang="ts">
const value = ref("1")


import { useCounterStore } from '@/stores'
import { ref } from 'vue';
const counterStore = useCounterStore()


function handleClick() {
  // 不通过action 直接修改store 需要调用 $forceUpdate 方法更新主应用 state
  counterStore.count++
  // @ts-ignore
  counterStore.$forceUpdate()
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
