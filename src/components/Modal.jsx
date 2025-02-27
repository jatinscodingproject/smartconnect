import React from 'react';
import { useState, useEffect } from 'react';
// import { Minus, X } from 'lucide-react';
// import facebook from '../assets/facebook.png'
// import google from '../assets/google.png'
// import twitter from '../assets/twiiter.png'
// import linkedin from '../assets/linkedin.png'
import toast, { Toaster } from 'react-hot-toast';
import OtpVerification from './OtpVerification';
import { Button } from 'antd'
import verificationGIF from '../assets/verified.gif'
import { sendLoginOtpToEmail } from '../services/Authentication.Services';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpverified, setIsOtpverified] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: ""
  });

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (!inputValue.email) {
        toast.dismiss();
        toast.error("Email is required");
        return;
      }
      setLoading(true);
      const response = await sendLoginOtpToEmail(inputValue.email);
      console.log('✌️response --->', response);
      if (response.statusCode == 200 || response.statusCode == 201) {
        setIsOtpSent(true);
        setLoading(false);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error in handleSubmit for OTP Sending To User", error);
      setLoading(false);
    }

  }

  function handleInputValueChange(e) {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-roboto">
      <div style={{ padding: "40px" }} className="bg-white px-8 rounded-[26px] shadow-lg relative w-[90vw] lg:w-[50vw] flex justify-center">
        {/* Close Button */}
        {/* <X size={24} color="#000" onClick={onClose} className="absolute top-4 right-4 cursor-pointer" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" onClick={onClose} width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x absolute top-4 right-4 cursor-pointer"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>

        {/* Modal Content */}
        <div className=' md:w-[50%] flex flex-col gap-3'>
          <h6 className='text-lg font-semibold font-dmSans'>{isOtpSent ? null : "Let's get you Signed in!"}</h6>
          <div className='space-y-3'>
            {!isOtpSent ? <>
              <input type="email" name="email" value={inputValue.email} placeholder='Enter email Address' className='w-full px-4 py-2 border border-[#4364EF] rounded-md' onChange={handleInputValueChange} />
              <Button onClick={handleSubmit} loading={loading} className='w-full bg-[#4364EF] text-white px-4 py-2 tracking-wider rounded-md'>Sign In </Button>
            </> : isOtpverified ? <img src={verificationGIF} alt="verification Successfull" /> : <OtpVerification email={inputValue.email} isOtpverified={isOtpverified} setIsOtpverified={setIsOtpverified} />}

            {/* <input type="password" placeholder='Password' className='w-full px-4 py-2 border border-[#4364EF] rounded-md' /> */}
          </div>
          {/* 
          <div className='flex flex-col items-center gap-3'>

            <span className='text-zinc-400'>------------------- Or -----------------</span>
            <div className='w-[80%] flex justify-between'>
              <img src={facebook} alt="social-icon" className='h-6 w-6' />
              <img src={twitter} alt="social-icon" className='h-6 w-6' />
              <img src={linkedin} alt="social-icon" className='h-6 w-6' />
              <img src={google} alt="social-icon" className='h-6 w-6' />
            </div>
            
              <a href="" className='text-center text-sm font-semibold mt-5 text-[#4364EF]'>Fogot your Password?</a>
              <p className='text-center text-sm font-semibold text-zinc-400'>First time? <a href="" className='text-[#4364EF]'>Create an account</a></p>
            
          </div> */}
        </div>
        {/* <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="bg-[#8441F1] text-white py-2 px-4 rounded w-full">
            Sign In
          </button>
        </form> */}
      </div>
      <Toaster />
    </div>
  );
}

export default Modal;
