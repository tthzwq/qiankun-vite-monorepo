import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

let root: ReactDOM.Root | null = null

function render(props) {
  const container = props?.container
    ? props.container.querySelector('#micro-app')
    : document.getElementById('micro-app')

  root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

export async function bootstrap() {
  console.log('[react] app bootstraped')
}

export async function mount(props) {
  render(props)
}

export async function unmount() {
  root && root.unmount()
  root = null
}

if (!Reflect.get(window, '__POWERED_BY_QIANKUN__')) {
  bootstrap().then(mount)
}

Reflect.set(window, 'react-project', {
  bootstrap() {
    console.log('bootstrap')
  },
  mount(props) {
    console.log('viteapp mount', props)
    render(props)
  },
  update(props) {
    console.log('update', props)
  },
  unmount(props) {
    console.log('vite被卸载了', props)
    unmount()
  }
})
