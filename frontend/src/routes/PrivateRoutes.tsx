import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoutes() {
    const auth = useAuth()
    return(
        auth.user ? <Outlet/> : <Navigate to="/login"/>
    )
}