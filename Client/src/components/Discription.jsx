import React from 'react'
import Smaple_image from '../assets/sample_img_1.png'
const Discription = () => {
  return (
    <div className='flex flex-col items-center my-16'>
     
        <div className='my-20 items-center '>
             <h1 className=' text-5xl font-semibold'>Create AI Image</h1>
            <p className=' text-lg my-6 px-10'>Turn Your imagination into visuals</p>
        </div>
      <div className='flex flex-row items-center justify-center gap-8 '>
        <img   src={Smaple_image} alt='sample_img'  width={450}/>

        <div className='flex flex-col gap-5 w-2/4'>
            <h2 className='text-3xl font-medium mb-4'>
                Introducing the AI-Powered Text to Image Generator
            </h2>
            <p className=' text-gray-600 mb-4'>
                asily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
            <p className='text-gray-600 mb-4'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
            </p>
        </div>
        
      </div>
    </div>


  )
}

export default Discription
