//@ts-nocheck
import { Outlet, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserLanding } from '../pages/UserLanding'
import QuestForm from '../pages/QuestForm'

export function MemberRoutes() {
    // let auth = useAuth()
    let user= JSON.parse(localStorage.getItem("user"))
    if (user?.user_type !== 'member')
        return <Navigate to='/unauthorized'/>
    if (user?.user_type !== 'member') 
        return <Navigate to='/unauthorized'/>
    return(
        <Routes>
            <Route path='/home' element={<UserLanding/>} />
        </Routes>
    )
}