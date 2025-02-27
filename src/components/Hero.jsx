import React from 'react'
import heroImg from '../assets/Rectangle 2.png'
import heroCircle from '../assets/logo circle 1.png'
function Hero() {
  return (
    <div>
        <div className='h-[35vh] lg:h-[100vh] w-full relative'>
            <img src={heroImg} alt="heroImg" className='w-full h-[35vh] lg:h-full absolute z-0' />
            <div className='w-full h-full absolute z-10 flex justify-center pl-4 md:pl-8 lg:pl-10 flex-col gap-1 md:gap-3 lg:gap-4'>
                <div className='w-[50%] lg:w-[30%] flex flex-col'>
                    <span className='text-[1.5rem] md:text-[2.5rem] lg:text-[4rem] font-bold'>Tap Into </span>
                    <span className='text-[1.5rem] md:text-[2.5rem] lg:text-[4rem] font-bold'>Your Inner </span>
                    <span className='flex items-center gap-2 lg:gap-4 text-[1.5rem] md:text-[2.5rem] lg:text-[4rem] font-bold '><img src={heroCircle} alt="heroCircle" className='w-[1.5rem] h-[1.5rem] md:h-[2.5rem] md:w-[2.5rem] lg:w-[4rem] lg:h-[4rem]'/> Circle</span>
                </div>
                <p className='text-[.7rem] md:text-sm lg:text-lg w-[50%]'>Easing the burden of exchanging contact information.</p>
                <button className='mt-4 text-[.7rem] md:text-sm lg:text-lg text-white btn-grad w-32 md:w-44 lg:w-52 p-2 rounded-full'>Customize your own</button>
            </div>
        </div>
    </div>
  )
}

export default Hero