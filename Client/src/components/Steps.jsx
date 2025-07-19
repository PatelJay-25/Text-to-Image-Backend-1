import React from 'react'
import {stepsData} from '../assets/assets'


const Steps = () => {
  return (
    <div className=' flex flex-col items-center'>

        <div className=' text-black text-4xl font-semibold'> 
            How it's Works
        </div>
        <p className=' my-3 text-2xl'>
            Transform Words Into Stunning Images
        </p>
        <div>
            {
                stepsData.map((item,index)=>(

                    <div key={index} className=' flex flex-row items-center gap-4  rounded-sm border shadow-xl my-6 px-4 py-4 hover:scale-105 transition-all duration-700 cursor-pointer'>
                        <img src={item.icon}/>
                        <div>
                            <h2 className='text-xl font-semibold'>{item.title}</h2>
                        <p className=' text-lg'>

                            {item.description}
                        </p>
                        </div>

                    </div>

                )) 
            }
        </div>
    </div>
  )
}

export default Steps
