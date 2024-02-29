import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { UnauthorizedPage } from "./Unauthorized"
import { CmLanding } from "../pages/CmLanding"


export function CmRoutes() {
    const auth = useAuth()
    if (auth.user?.user_type !== 'cm')
        return <Navigate to='/unauthorized'/>
    return (
        <Routes>
            <Route path='home' element={<CmLanding/>} />
            {/* <Route path='quest-form' element={<>QUEST FORM</>} /> */}
        </Routes>
    )
}