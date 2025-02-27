import React from 'react'
import airbnb from '../assets/airbnb.png'
function Section6() {
  return (
    <div className='mt-4 md:mt-4 w-full flex flex-col items-center'>
            <h2 className='text-2xl md:text-4xl md:w-[80%] font-bold text-center leading-normal'>100+ Fastest growing company's use Smart Connections</h2>
            <div className='grid grid-cols-4 gap-2 md:gap-4 lg:gap-8 mt-8'>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
                <div className='md:rounded-[24px] rounded-md bg-[#D9D9D9] flex justify-center items-center'>
                    <img src={airbnb} alt="airbnd" />
                </div>
            </div>

    </div>
  )
}

export default Section6