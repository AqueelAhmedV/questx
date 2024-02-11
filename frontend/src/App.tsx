// @ts-nocheck
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BasicLayout } from './layouts/BasicLayout'


function App() {
  const [count, setCount] = useState(0)
  const [str, setStr] = useState('')

  return (
    <div className="App">
        <h2>Landing</h2>
    </div>
  )
}

export default App
