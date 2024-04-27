import type { PiniaPluginContext, PiniaPlugin, Pinia } from 'pinia'
import type { Emitter } from 'mitt'

export enum PiniaEventType {
  Subscribe = 'Subscribe',
  OnAction = 'OnAction'
}
export type PiniaEmitter = Emitter<Record<string | symbol, unknown>>

export interface PiniaPluginGenerate {
  (emitter: PiniaEmitter, pinia?: Pinia): PiniaPlugin
}

/**
 * 主应用 pinia 插件，负责 发布sotre更新
 */
export const publishPlugin: PiniaPluginGenerate = (emitter) => {
  return (context: PiniaPluginContext) => {
    const name = context.store.$id

    context.store.$subscribe((mutation, stateTree) => {
      emitter.emit(name + PiniaEventType.Subscribe, mutation)
    })

    // context.store.$onAction((action) => {
    //   emitter.emit(name + PiniaEventType.OnAction, action)
    // })
  }
}

/**
 * 子应用 pinia 插件，负责同步主应用sotre
 */
export const subscribePlugin: PiniaPluginGenerate = (emitter, parentPinia) => {
  return (context: PiniaPluginContext) => {
    const name = context.store.$id
    // 子应用独享的sotre
    if (!parentPinia || !parentPinia!.state.value[name]) return

    // 监听主应用 store 变化 并同步数据
    emitter.on(name + PiniaEventType.Subscribe, (mutation) => {
      const newState = parentPinia.state.value[name]
      context.store.$patch(newState)
    })

    const parentStore = Reflect.get(parentPinia, '_s').get(name)
    // 子应用调用 action 时 自动调用主应用的 action
    context.store.$onAction(({ name, args }) => parentStore[name](args))

    /**
     * "$forceUpdate" 同步 state 到主应用
     * 一般不需要调用
     * 只有不通过 action 直接修改 store 时才需要调用
     */
    Reflect.set(context.store, '$forceUpdate', () => {
      parentStore.$patch(context.store.$state)
    })

    // init state from 主应用
    return parentPinia.state.value[name]
  }
}
