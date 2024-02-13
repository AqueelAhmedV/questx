// @ts-nocheck
import React from 'react'
import './App.css'
import { BasicLayout } from './layouts/BasicLayout'
import NavbarDefault from './components/NavbarDefault'


function App() {

  const buttonList = [
    {
      text : "Log In",
      link : '/login'
    },
    {
      text : 'Sign Up',
      link : '/register'
    }
  ]

  return (
    <div className="App h-100vh">
        <NavbarDefault list = {[]} />
    </div>
  )
}

export default App
