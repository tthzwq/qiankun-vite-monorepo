export { publishPlugin, subscribePlugin } from './src/plugin'
import { useCounterStore } from './src/modules/counter'
import { useNumStore } from './src/modules/num'

export default function useStore() {
  return {
    NumStore: useNumStore(),
    counterStore: useCounterStore()
  }
}

export { useNumStore, useCounterStore }
