import React, { useContext, useState } from 'react'
import assets from '../assets/logo.svg'
import star from '../assets/credit_star.svg'
import { Link, useNavigate } from 'react-router-dom'
import profile from '../assets/profile_icon.png'
import { AppContext } from '../context/AppContext'
const Navbar = () => {
  const {user,setShowLogin,credit,logout}=useContext(AppContext)
  const navigate=useNavigate();
  return (
    <div className='flex flex-row justify-between items-center mx-2 py-3 w-auto' >
        <Link to={'/'}>
          <img  onClick={()=> navigate('/')} src={assets} alt="logo" className='w-28 sm:w-32 lg:w-40'/>
        </Link>
        {
          user ?
          
          <div className='flex flex-row gap-5 items-center'>
            <div className='flex flex-row gap-4 rounded-full bg-blue-200 hover:scale-95 transition-all px-6 items-center py-3 cursor-pointer shadow-md'>
              <img src={star} alt='starImg' className='w-5 h-5'/>
              <p className='font-medium'>Credits: {credit || 0}</p>
            </div>
            <div className='flex flex-row gap-3 items-center relative group'>
              <div className='flex flex-col items-end'>
                <p className='text-lg font-semibold text-gray-800'>Hi, {user.name}</p>
                <p className='text-sm text-gray-500'>{user.email}</p>
              </div>
              <img className='w-12 h-12 rounded-full drop-shadow-lg border-2 border-white' src={profile} alt='profileImg'/>
              <div className='absolute hidden group-hover:block top-12 right-0 z-10 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[120px]'>
                <ul className='py-2'>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700' onClick={() => navigate('/buycredit')}>
                    Buy Credits
                  </li>
                  <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium' onClick={logout}>
                    Log out
                  </li>
                </ul>
              </div>
            </div>
          </div>:
          <div className='flex flex-row justify-between gap-6 items-center px-2'>
            <Link to="/buycredit" className='text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors'>Pricing</Link>
            <button onClick={()=>setShowLogin(true)} className='text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-2 text-center transition-colors shadow-md'>Login</button>
        </div>
        }
      
    </div>
  )
}

export default Navbar
