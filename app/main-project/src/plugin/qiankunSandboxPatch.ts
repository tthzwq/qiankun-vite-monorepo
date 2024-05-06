export type OriginAppendChild<T extends Element> = (node: T) => T
export type PatchPlugin<T extends Element> = (node: T) => T | void

class QiankunSandboxPatch {
  originHeadAppendChild: OriginAppendChild<Element>
  plugins: Set<PatchPlugin<Element>> = new Set()
  constructor() {

    this.originHeadAppendChild = document.head.appendChild.bind(document.head)
    Reflect.set(document.head, 'appendChild', this.appendChild.bind(this))
  }
  use(fn: PatchPlugin<Element>) {
    this.plugins.add(fn)
    return this.remove.bind(this, fn)
  }
  remove(fn: PatchPlugin<Element>) {
    this.plugins.delete(fn)
  }
  appendChild(node: Element): Element {
    for (const plugin of this.plugins) {
      try {
        const res = plugin(node)
        if (res) return res
      } catch (error) {
        //
      }
    }
    return this.originHeadAppendChild(node)
  }
}

/**
 * 重写原生 document.head.appendChild 方法
 * qiankun vite 子应用样式 插入到了 document.head 污染了主应用样式，改为插入子应用的 ShadowDOM
 */
export const qiankunSandboxPatch = new QiankunSandboxPatch()
