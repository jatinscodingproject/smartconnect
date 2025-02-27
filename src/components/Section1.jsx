import React from 'react'
import ellipse from '../assets/Ellipse 1.png'
import creditCard from '../assets/Credit card_fill.svg'
import NFC from '../assets/NFC_fill.svg'
import cardImg1 from "../assets/Rectangle 53.png"
import cardImg2 from "../assets/Group 8649.png"
function Section1() {
  return (
    <div className='mt-6 lg:mt-10'>
      <h3 className='font-bold text-center text-2xl md:text-4xl mb-8'>Unique cards that give personal touch</h3>
      <div className='grid md:grid-cols-2 gap-8 lg:gap-10 lg:pt-10'>
        <div className=' w-full h-[34rem] md:h-[40rem] lg:h-[45rem] relative custom-shadow overflow-hidden rounded-[52px] md:rounded-l-[52px] md:rounded-r-none'>
          <img src={cardImg1} alt="card-img" className='absolute z-0 w-full lg:h-[45rem] -bottom-2 ' />
          <div className='relative z-10 m-8 lg:m-12 flex flex-col'>
            <div className='relative w-12 h-12 md:w-14 md:h-14 mb-5 '>
              <img src={ellipse} alt="ellipse" className='absolute w-12 h-12 md:w-14 md:h-14 z-0 ' />
              <img src={creditCard} alt="creditCard" className='relative w-8 h-8 md:w-10 md:h-10 z-10 top-2 left-2' />
            </div>
            <span className='font-semibold text-lg md:text-2xl'>Customize and Design your card.</span>
            <span className='font-semibold text-lg md:text-2xl'> Make it unique</span>
            <p className='mt-3 text-sm md:text-lg'>Create a custom card that matches your personality and
              unique style. Choose from a wide range of colors, designs,
              and patterns to customize the look and feel of your card!.</p>
          </div>
        </div>
        <div className=' w-full h-[34rem] md:h-[40rem] lg:h-[45rem] relative custom-shadow overflow-hidden rounded-[52px] md:rounded-r-[52px] md:rounded-l-none'>
          <img src={cardImg2} alt="card-img2" className='absolute z-0 w-full lg:h-[45rem] -bottom-2 ' />
          <div className='relative z-10 m-8 lg:m-12 flex flex-col'>
            <div className='relative w-12 h-12 md:w-14 md:h-14 mb-5 '>
              <img src={ellipse} alt="ellipse" className='absolute w-12 h-12 md:w-14 md:h-14 z-0 ' />
              <img src={NFC} alt="NFC" className='relative w-8 h-8 md:w-10 md:h-10 z-10 top-2 left-2' />
            </div>
            <span className='font-semibold text-lg md:text-2xl'>One of One Custom Cards</span>
            <p className='mt-3 text-sm md:text-lg'>Create a custom cards that are one of one and are only owned by you. crafted by the best artists in the world!.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section1