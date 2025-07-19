import React from 'react'
import assets from '../assets/logo.svg'
import img1 from '../assets/facebook_icon.svg'
import img2 from '../assets/instagram_icon.svg'
import img3 from '../assets/twitter_icon.svg'
const Footer = () => {
  return (
    <div className='flex flex-row justify-between mx-2 py-3 pr-7'>
      <div className='flex flex-row  items-center gap-8 pr-3'>
        <img  src={assets} alt="logo" className='w-28 sm:w-32 lg:w-40'/>
        <p className='text-lg border-l border-gray-400 pl-11'>
            All right reserved. Copyright @imagify
        </p>
      </div>
      <div className='flex flex-row gap-3'>
         <img src={img1} alt='facebook_icon'/>
         <img src={img2} alt='instagram_icon'/>
          <img src={img3} alt='twitter_icon'/>
      </div>
    </div>
  )
}

export default Footer
