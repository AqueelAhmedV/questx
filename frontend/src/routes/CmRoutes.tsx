//@ts-nocheck

import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { UnauthorizedPage } from "./Unauthorized"
import QuestForm from "../pages/QuestForm"
import { PrivateRoutes } from "./PrivateRoutes"


export function CmRoutes() {
    // const auth = useAuth()
    let user= JSON.parse(localStorage.getItem("user"))
    if (user?.user_type !== 'cm')
        return <Navigate to='/unauthorized'/>
    
    return (
        <Routes>
            <Route path='home' element={<>CM</>} />
            <Route path='create-quest' element={<QuestForm/>}/>
        </Routes>
    )
}