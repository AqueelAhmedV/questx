import { Outlet, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserLanding } from '../pages/UserLanding'
import QuestForm from '../pages/QuestForm'

export function MemberRoutes() {
    let auth = useAuth()
    if (auth.user?.user_type !== 'member') 
        return <Navigate to='/unauthorized'/>
    return(
        <Routes>
            <Route path='home' element={<UserLanding/>} />
            <Route path= 'createQuest' element={<QuestForm/>}/>
        </Routes>
    )
}