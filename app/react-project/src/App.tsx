import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import img from "./assets/git_shortcut_keys.png"
import { sum } from 'com-utils'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const total = sum(count, count2)

  return (
    <>
      <div>
        <img src={img} />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={() => setCount2((count2) => count2 + 1)}>count2 is {count2}</button>
        <p>sum is {total}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
