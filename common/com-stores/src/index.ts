export { publishPlugin, subscribePlugin } from './plugin'
import { useCounterStoreGenerate } from './modules/counter'
import { useNumStoreGenerate } from './modules/num'
import type { Pinia } from 'pinia'

export default function useStoreGenerate(pinia: Pinia) {
  return {
    useNumStore: useNumStoreGenerate(pinia),
    useCounterStore: useCounterStoreGenerate(pinia)
  }
}

export { useNumStoreGenerate, useCounterStoreGenerate }
