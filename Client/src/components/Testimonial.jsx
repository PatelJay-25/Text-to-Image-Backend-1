import React from 'react'
import { testimonialsData } from '../assets/assets'
import star from '../assets/star_icon.svg'

const Testimonial = () => {
  return (
    <div className='my-14'>
      <div className='flex flex-col items-center'>
        <h1 className=' text-5xl font-semibold'>
            Customer Testimonials
        </h1>
        <p className='text-xl my-7 text-gray-600'>
            What our user are saying
        </p>
      </div>

      <div >
        <div className='flex flex-row gap-6 my-7 px-5 '>
            {
                testimonialsData.map((item,index)=>(
                    <div className='flex flex-col border rounded-xl px-4 py-4 items-center gap-1 shadow-lg  hover:scale-75 transition-all duration-300 cursor-pointer'>
                        <img src={item.image}/>
                        <h2>{item.name}</h2>
                        <p>{item.role}</p>
                        <div className='flex flex-row '>
                            {
                                Array(item.stars).fill().map((val,index)=>(
                                    <img src={star}/>
                                ))
                            }
                        </div>
                        <p>
                            {item.text}
                        </p>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default Testimonial
