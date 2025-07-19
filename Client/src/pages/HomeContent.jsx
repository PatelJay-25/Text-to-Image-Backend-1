import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Discription from '../components/Discription'
import Testimonial from '../components/Testimonial'
import Generatebtn from '../components/Generatebtn'

const HomeContent = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <Discription/>
      <Testimonial/>
      <Generatebtn/>
    </div>
  )
}

export default HomeContent
