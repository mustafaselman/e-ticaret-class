import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Header,Footer} from "./components"
import {Admin, Contact,Home, Login, Register, Reset} from "./pages"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reset" element={<Reset/>}/>
        <Route path="/admin/*" element={<AdminOnlyRoute><Admin/></AdminOnlyRoute>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App