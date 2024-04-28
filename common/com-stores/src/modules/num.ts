
import { ref, computed } from 'vue'
import { defineStore, setActivePinia, type Pinia } from 'pinia'

export const useNumStoreGenerate = (pinia: Pinia) => {
  setActivePinia(pinia)

  return defineStore('num', () => {
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
}
