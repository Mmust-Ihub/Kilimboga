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

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
