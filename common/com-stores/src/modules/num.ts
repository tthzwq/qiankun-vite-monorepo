
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNumStore = defineStore('num', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return { count, doubleCount, increment, decrement }
})
