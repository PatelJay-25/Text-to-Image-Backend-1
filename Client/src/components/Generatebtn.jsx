
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import star from '../assets/star_group.png'
const Generatebtn = () => {

    const{user,setShowLogin,credit}=useContext(AppContext)
    const neviagate=useNavigate()
    const clickHandler=()=>{
      if(user){
        if(credit <= 0){
          neviagate('/buycredit')
        } else {
          neviagate('/result')
        }
      }
      else{
        setShowLogin(true)
      }
    }
  return (
    <div className='flex flex-col items-center my-44 gap-8'>
      <h1 className='text-5xl font-semibold'>
        See the magic.Try Now
      </h1>
        <div>
            <button onClick={clickHandler} className='bg-slate-950 text-white items-center border rounded-full py-4 px-5 text-lg flex flex-row gap-2 my-2 hover:scale-90 translate-x-1 duration-300 transition-all'>
                {credit <= 0 ? 'Buy Credits' : 'Generate Images'}
                <img className='w-6' src={star} alt='startImg'></img>
            </button>
        </div>
    </div>
  )
}

export default Generatebtn
