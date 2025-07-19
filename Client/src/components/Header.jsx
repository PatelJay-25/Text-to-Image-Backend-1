import React, { useContext } from 'react'
import assets from '../assets/star_icon.svg'
import star from '../assets/star_group.png'
import sample_1 from '../assets/sample_img_1.png'
import sample_2 from '../assets/sample_img_2.png'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
const Header = () => {

    const{user,setShowLogin}=useContext(AppContext)
    const neviagate=useNavigate()
    const clickHandler=()=>{
        if(user){
            neviagate('/result')
        }
        else{
            setShowLogin(true)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center my-20'>
        <div className='flex flex-row items-center gap-2 rounded-full bg-white border border-neutral-500 py-1 px-6 text-lg text-center'>
            <p>Best time to Image genertor</p>
            <img  src={assets} />
        </div>

        <div className=' my-20'>
            <p className=' text-8xl items-center'>
                Turn text to <span className=' text-blue-500'>
                    image
                </span>,in second
            </p>
        </div>

        <div>
            <button onClick={clickHandler} className='bg-slate-950 text-white items-center border rounded-full py-4 px-5 text-lg flex flex-row gap-2 my-2 hover:scale-90 translate-x-1 duration-300 transition-all'>
                Generate Images
                <img className='w-6' src={star} alt='startImg'></img>
            </button>
        </div>

        <div className='flex flex-row gap-3 my-20'>
            {
                Array(6).fill('').map((item,index)=>( 
                    <img  className=' border rounded-sm cursor-pointer hover:scale-110 transition-all  duration-300' src={index%2===0 ? sample_1 : sample_2 } key={index} width={75}/>
                ))
            }
        </div>
        
        


    </div>
  )
}

export default Header
