import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function LandingRoutes() {
    const auth = useAuth()
    return(
        auth.user ? <Navigate to={`/${auth.user.user_type}/home`}/> : <Outlet/>
    )
}