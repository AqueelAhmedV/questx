//@ts-nocheck

import { Navigate, Route, Routes } from "react-router-dom"
import { CmLanding } from "../pages/CmLanding"
import QuestForm from "../pages/QuestForm"



export function CmRoutes() {
    // const auth = useAuth()
    let user= JSON.parse(localStorage.getItem("user"))
    if (user?.user_type !== 'cm')
        return <Navigate to='/unauthorized'/>
    
    return (
        <Routes>
            <Route path='home' element={<CmLanding/>} />
            
            <Route path='create-quest' element={<QuestForm/>}/>
        </Routes>
    )
}