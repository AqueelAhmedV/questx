import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { UnauthorizedPage } from "./Unauthorized"


export function CmRoutes() {
    const auth = useAuth()
    if (auth.user?.user_type !== 'cm')
        return <Navigate to='/unauthorized'/>
    return (
        <Routes>
            <Route path='home' element={<>CM</>} />
        </Routes>
    )
}