// @ts-nocheck
import React from 'react'
import logo from './logo.svg'
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
        <NavbarDefault list = {[]} buttonList = {buttonList} />
    </div>
  )
}

export default App
