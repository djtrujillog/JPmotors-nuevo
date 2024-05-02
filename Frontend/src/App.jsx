import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import { AuthProvider } from './context/AuthProvider'
import { DashboardProvider } from './context/DashboardProvider'
import LoginPage from './pages/LoginPage'
import DashboardPages from './pages/DashboardPages'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <BrowserRouter>
       <AuthProvider>
        <DashboardProvider>
          <Routes>
            <Route path='/' element={ <AuthLayout /> } >
              <Route path='login' element={ <LoginPage /> } />
              <Route path='register' element={ <RegisterPage /> } />
            </Route>

            <Route path='/dashboard' element={ <RutaProtegida /> } >
              <Route index element={ <DashboardPages /> } />
            </Route>
            
          </Routes>
        </DashboardProvider>
       </AuthProvider>
    </BrowserRouter>
  )
}

export default App
