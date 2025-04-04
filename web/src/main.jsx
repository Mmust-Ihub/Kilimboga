import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Dashboard from './mainComponents/Dashboard.jsx'
import Products from './subComponents/Products.jsx'
import Orders from './subComponents/Orders.jsx'
import SignUp from './mainComponents/SignUp.jsx'
import Login from './mainComponents/Login.jsx'
import Admin from './mainComponents/Admin.jsx'
import Protected from './mainComponents/Protected.jsx'
import AdminProtected from './mainComponents/AdminProtected.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <Protected>
            <Dashboard />
          </Protected>
        }/>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={
          <Protected>
            <Products />
          </Protected>
        }/>
        <Route path="/orders" element={
          <Protected>
            <Orders />
          </Protected>
        } />
        <Route path="/admin" element={
          <Protected>
            {/* <AdminProtected> */}
              <Admin />
            {/* </AdminProtected> */}
          </Protected>
        } />
      </Routes>
    </BrowserRouter>
  // </StrictMode>
)
