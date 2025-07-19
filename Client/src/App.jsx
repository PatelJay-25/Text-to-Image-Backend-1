import React, { useContext, useState } from 'react'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import HomeContent from './pages/HomeContent' 
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from "./context/AppContext";


import { ToastContainer } from 'react-toastify';
const App = () => {
  
  const {showLogin}=useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min  bg-slate-100 py-3'>
    
     <ToastContainer position='bottom-right' /> 
    <Navbar/>
{ showLogin && 
<Login/>}
      <Routes>
        <Route path='/' element={<HomeContent/>}/>
        <Route path='/buycredit' element={<BuyCredit/>}/>
        <Route path='/result' element={<Result/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
