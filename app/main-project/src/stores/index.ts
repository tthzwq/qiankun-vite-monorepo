import useStoreGenerate from 'com-stores'

type UseSotre = ReturnType<typeof useStoreGenerate>

let useNumStore: UseSotre['useNumStore']
let useCounterStore: UseSotre['useCounterStore']

type Pinia = Parameters<typeof useStoreGenerate>[0]

function createStore(pinia: Pinia) {
  const useStore = useStoreGenerate(pinia as unknown as Pinia)
  useNumStore = useStore.useNumStore
  useCounterStore = useStore.useCounterStore
}

export {
  createStore,
  useNumStore,
  useCounterStore
}

export default function useStore() {
  return {
    numStore: useNumStore(),
    counterStore: useCounterStore()
  }
}
