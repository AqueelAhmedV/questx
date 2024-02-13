// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BasicLayout } from './layouts/BasicLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ExpForm } from './pages/ExpForm';
import { AppProvider } from './contexts/AppContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/expForm",
    element: <ExpForm/>
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
        <BasicLayout>
          <RouterProvider router={router}/>
        </BasicLayout>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
