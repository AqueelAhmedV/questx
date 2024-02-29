// @ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { BasicLayout } from './layouts/BasicLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ExpForm } from './pages/ExpForm';
import { AppProvider } from './contexts/AppContext';
import { UserLanding } from './pages/UserLanding';
import { QueryClient, QueryClientProvider } from 'react-query'
import { PrivateRoutes } from './routes/PrivateRoutes';
import { CmRoutes } from './routes/CmRoutes';
import { MemberRoutes } from './routes/MemberRoutes';
import { UnauthorizedPage } from './routes/Unauthorized';
import { LandingRoutes } from './routes/LandingRoutes';
import QuestForm from './pages/QuestForm';

const queryClient = new QueryClient()



ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <BasicLayout>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route path='/cm/*' element={<CmRoutes/>}/>
                <Route path='/member/*' element={<MemberRoutes/>}/>
              </Route>
              <Route path='/expForm' element={<ExpForm />}/>
              <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/login' element={<Login/>}/>
              <Route element={<LandingRoutes />}>
                <Route path='/' element={<App/>}/>
              </Route>
              
              
              {/* <Route path="cm/*" element = {<PrivateRoutes/>}>
                <Route path='create-quest' element={<QuestForm/>}/>
                <Route path='home' element={<>CM</>} />
            </Route> */}
              
            </Routes>
          </BrowserRouter>
          </BasicLayout>
        </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

