import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Header,Footer} from "./components"
import {Contact,Home} from "./pages"

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App