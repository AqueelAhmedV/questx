// @ts-nocheck
import React from 'react'
import './App.css'
import { BasicLayout } from './layouts/BasicLayout'
import NavbarDefault from './components/NavbarDefault'
import LoginSideBar from './components/LoginSideBar'
import Main from './components/Main'
import { Drawer } from '@material-tailwind/react'


function App() {

  

  const [openSide, setOpenSide] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  }
  const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <div className="h-[100vh] bg-[url('/../public/landing-bg.jpg')] bg-cover bg-right App">
        <NavbarDefault list = {[]} openDrawer= {openDrawer} isLoggedIn= {false} />
        <Drawer open={isDrawerOpen}  placement="right" onClose={closeDrawer}>
          <LoginSideBar/>
        </Drawer>
        <Main />
    </div>
  )
}

export default App
