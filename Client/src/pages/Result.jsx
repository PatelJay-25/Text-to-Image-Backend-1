import React, { useState } from 'react'
import sample_1 from '../assets/sample_img_1.png'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image,setImage]=useState(sample_1)
  const [isImageLoad,setisImageLoad]=useState(false)
  const [loading,setLoading]=useState(false)
  const [input,setInput]=useState('')
  const {generateImage, user, setShowLogin, credit, navigate}=useContext(AppContext)

  const OnsubmiteHandler= async (e)=>{
    e.preventDefault();
    
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (credit <= 0) {
      navigate('/buycredit');
      return;
    }
    
    setLoading(true);

    if (input) {
      const image = await generateImage(input);
      if (image) {
        setisImageLoad(false);
        setImage(image);
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={OnsubmiteHandler}>
    <div className='flex flex-col items-center my-24'>
      <div >
        <img src={image} alt='sample_img' width={350}/>
        {loading &&
          <p className='text-gray-600 text-lg'>Loading...</p>
        }
      </div>

      {!isImageLoad &&
        <div className=' flex flex-row items-center gap-5 rounded-lg border bg-slate-500 px-5 py-2 my-7'>

          {/* this for ,when we are taking input for store the data */}
          <input onChange={e=>setInput(e.target.value)} value={input}
           className=' bg-transparent outline-none' type='text' placeholder='Describe what do you want '/>
          <button 
            className={`border rounded-full px-3 py-1 ${credit <= 0 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-black text-white'}`}
            disabled={credit <= 0}
          >
            {credit <= 0 ? 'No Credits' : 'Generate'}
          </button>
        </div>
      }
      
      {isImageLoad &&
      <div className='flex flex-row items-center gap-3 my-4'>
        <p type='submit' onClick={()=>setisImageLoad(false)} 
        className='border rounded-full border-zinc-500 px-3 py-2 cursor-pointer '>
          Generate Another
        </p>
        <a href={image} download  className=' bg-black text-white border rounded-full px-5 py-2 items-center hover:scale-90 transition-all duration-100'>Download</a>
      </div>
      }
    </div>

    </form>
  )
}

export default Result
