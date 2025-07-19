import React, { useContext } from 'react'
import { plans } from '../assets/assets'
import assets from '../assets/favicon.svg'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const BuyCredit = () => {
  const { user, backendURL, token, loadCredit, setShowLogin } = useContext(AppContext)

  const handleBuyCredits = async (amount, credits) => {
    if (!user) {
      toast.error('Please login to purchase credits.')
      setShowLogin(true) // Open login popup if not logged in
      return
    }

    try {
      // 1. Create Razorpay order on the backend
      const { data: orderData } = await axios.post(
        `${backendURL}/api/payment/razorpay-order`, // Correct URL
        { amount: amount * 100 }, // Razorpay expects amount in paise
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // 2. Open Razorpay checkout window
      const options = {
        key: 'rzp_test_jIKqm1ysgxZrOC', // Using the same key as backend
        amount: orderData.amount,
        currency: 'INR',
        name: 'Imagify Credits',
        description: `Buy ${credits} credits`,
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify the payment on the backend
          try {
            await axios.post(
              `${backendURL}/api/payment/verify`, // Correct URL for verification
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                credits,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            loadCredit() // Reload credits on the frontend
            toast.success('Payment successful! Credits added.')
          } catch (err) {
            toast.error('Payment verification failed.')
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: '#3399cc' },
      }
      
      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (err) {
      toast.error('Payment failed. Please try again.')
    }
  }

  return (
    <div className='flex flex-col items-center py-24'>
      <div className='flex flex-col gap-9 items-center'>
        <p className='border rounded-full border-zinc-500 px-6 py-1 bg-white items-center'>
          OUR PLANS
        </p>
        <h1 className='text-3xl font-semibold'>Choose the plan</h1>
      </div>
      <div className='flex flex-row gap-4 my-9 '>
        {
          plans.map((item, index) => (
            <div className='flex flex-col hover:scale-90 transition-all duration-700 items-start border rounded-md bg-white px-8 py-12 gap-2'
              key={index}>
              <img src={assets} alt='logo' width={23} />
              <p className='text-lg'>{item.id}</p>
              <p>{item.desc}</p>
              <div className='flex flex-row items-center gap-2'>
                <p className='text-3xl font-semibold'>₹{item.price}</p>
                <p className=''>/{item.credits} Credits</p>
              </div>
              <button
                className='bg-black text-white border rounded-md px-6 py-2 items-center my-3'
                onClick={() => handleBuyCredits(item.price, item.credits)}
              >
                {user ? 'Purchase' : 'Get started'}
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BuyCredit