//@ts-nocheck

import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoutes() {
    // const auth = useAuth()
    // console.log(auth.user, "here");
    let user= JSON.parse(localStorage.getItem("user"))
    return(
        user ? <Outlet /> : <Navigate to="/login"/>
    )
}