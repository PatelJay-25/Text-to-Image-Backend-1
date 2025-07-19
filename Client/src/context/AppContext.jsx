import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const[showLogin,setShowLogin]=useState(false)
  const  [token ,setToken]=useState(localStorage.getItem('token'))
  const [credit,setCredit]=useState(false)
  const navigate=useNavigate()

  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const loadCredit = async () =>{
  try {
      if (!token) return;
      
      const {data}=await axios.get(backendURL+'/api/v1/userCredits',{
          headers: { Authorization: `Bearer ${token}` } 
      })
      console.log('API RESPONSE:', data);
      if(data.success){
        setCredit(data.credits);
        setUser(data.user);
      }
  } catch (error) {
    console.log(error);
    if (error.response?.status === 401) {
      logout();
    } else {
      toast.error(error.message);
    }
  }
}

const generateImage = async (prompt) => {
  try {
    if (!token) {
      toast.error('Please login to generate images');
      return null;
    }

    // Double check credits from server before making request
    try {
      const creditResponse = await axios.get(backendURL+'/api/v1/userCredits',{
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (creditResponse.data.success && creditResponse.data.credits <= 0) {
        toast.error('No credits available. Please buy credits to generate images.');
        navigate('/buycredit');
        return null;
      }
    } catch (creditError) {
      console.error('Error checking credits:', creditError);
    }

    const { data } = await axios.post(
      backendURL + '/api/image/generateImage',
      { prompt },
      {headers: { Authorization: `Bearer ${token}`} }
    );

    if (data.success) {
      loadCredit();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadCredit();
      if (data.message === 'No credit balance') {
        navigate('/buycredit');
      }
    }
  } catch (error) {
    console.error(error);
    if (error.response?.status === 401) {
      toast.error('Please login again');
      logout();
    } else {
      toast.error('Something went wrong while generating the image.');
    }
  }
};

  const logout=()=>{
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  }
  useEffect(()=>{
    if(token){
      loadCredit();
    }
  },[token])


  const value = {
    user,
    setUser,
    showLogin,setShowLogin,backendURL,token ,setToken,credit,setCredit,loadCredit,logout,generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}; 