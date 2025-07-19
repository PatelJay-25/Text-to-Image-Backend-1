import React, { useContext, useEffect } from 'react'
import user_icon from '../assets/profile_icon.png'
import email_icon from '../assets/email_icon.svg'
import Lock_icon from '../assets/lock_icon.svg'
import cross from '../assets/cross_icon.svg'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
    const [state,setState]=useState('login')
    const {setShowLogin,backendURL,setToken,setUser,loadCredit,setCredit}=useContext(AppContext)

    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")


    const onsubmitHandler = async (e) =>{
        e.preventDefault();
        try {
            if(state=='login'){
                const {data}=await axios.post(backendURL + '/api/v1/login',{email,password})

                if(data.success){
                    setToken(data.token);
                    setUser(data.user); // Set user data immediately
                    localStorage.setItem('token',data.token)
                    if (data.user && typeof data.user.creditBalance === 'number') {
                        setCredit(data.user.creditBalance); // Set credits from response
                    } else {
                        await loadCredit(); // fallback
                    }
                    setShowLogin(false)
                    toast.success('Logged-In Successfully')
                }
                else{
                    toast.error(data.message)
                }
            }
            else{
                // they are Sign-up hear
                const {data}=await axios.post(backendURL + '/api/v1/register',{name,email,password})

                if(data.success){
                    setToken(data.token);
                    setUser(data.user); // Set user data immediately
                    localStorage.setItem('token',data.token)
                    if (data.user && typeof data.user.creditBalance === 'number') {
                        setCredit(data.user.creditBalance); // Set credits from response
                    } else {
                        await loadCredit(); // fallback
                    }
                    setShowLogin(false)
                    toast.success('Account Created Successfully')
                }
                else{
                    toast.error(data.message)
                }
            }



        } catch (error) {
            toast.error(error.message)
        }
    }

    // this for the dont scrool it and when give 
    useEffect(()=>{
        document.body.style.overflow='hidden'

        return ()=>{
            document.body.style.overflow='unset'
        }
    },[])

  return (
    <div className=' fixed flex items-center justify-center  backdrop-blur-sm bg-black/30 top-0 right-0 left-0 bottom-0 z-10  '>
      <form onSubmit={onsubmitHandler} className=' relative rounded-xl border bg-white px-9 py-7'>
        <h1 className=' items-center text-lg text-center my-2'>{state}</h1>
        <p className='items-center text-sm text-gray-500 text-center my-2'>Welcome Back! Please Sign in to continue</p>

       { state==='Sign Up' &&  <div className='flex flex-row items-center border rounded-xl gap-2 my-4 px-2'>
            <img src={user_icon} alt='user_icon' width={34}/>
            <input type='text' placeholder='Full Name' className=' outline-none' required onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>}

        <div className='flex flex-row items-center border rounded-xl gap-2 my-4 px-3 py-1'>
            <img src={email_icon} alt='email_icon' width={23}/>
            <input type='email' placeholder='Enter Email' className=' outline-none' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>

        <div className='flex flex-row items-center border rounded-xl gap-2 my-4 px-3 py-1'>
            <img src={Lock_icon} alt='Lock_icon' width={20}/>
            <input type='password' placeholder='Enter Password' className=' outline-none' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </div>

        <div className=' flex flex-col items-center my-4 gap-3'>
            <p className='text-sm cursor-pointer text-blue-600'>Forgot Password?</p>
            <button className='bg-blue-600 text-white items-center border rounded-full py-2 px-16 text-lg my-2 '>{state==='Sign Up' ? 'Create Account' : 'login'}</button>
        </div>
        
        { state!=='Sign Up' ? <p onClick={()=>setState('Sign Up')}  className='text-center  mt-4'>
            Don't have an Account?<span className=' cursor-pointer text-blue-600 '>
                Sign up
            </span>
        </p>
            :
        <p onClick={()=>setState('login')}  className=' text-center mt-4'>
            AlReady have an Account?<span className=' cursor-pointer text-blue-600 '>
                login
            </span>
        </p>}
        
        <img onClick={()=>setShowLogin(false)}    className=' absolute top-0 right-0 my-4 mx-4 cursor-pointer' src={cross} alt='Cross_icon'/>

      </form>
    </div>
  )
}

export default Login
