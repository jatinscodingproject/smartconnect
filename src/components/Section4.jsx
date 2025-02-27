import React from 'react'
import img2 from '../assets/image 5.svg'
import img3 from '../assets/image 6.svg'
import img4 from '../assets/image 7.svg'
import lineout from '../assets/Line_out.svg'
import { Link } from 'react-router-dom'

function Section4() {
  const data = [
    {
      title: 'Corporate',
      img: img2
    },
    {
      title: 'Executive',
      img: img3
    },
    {
      title: 'Customize',
      img: img4
    }
  ]

  return (
    <div className='md:mt-10 lg:mt-10'>
      <div className='w-full grid md:grid-cols-3 gap-3 md:gap-4 lg:gap-5'>
        {data.map((item, index) => (
          <div 
            key={index} 
            className={`overflow-hidden relative 
              ${index === 0 ? 'rounded-l-[52px]' : ''} 
              ${index === 2 ? 'rounded-r-[52px]' : ''}`}
          >
            <img src={item.img} alt="img" className='relative z-0 w-full' />
            <div className='w-full h-full absolute top-0 px-6 py-4 md:px-8 md:py-6'>
              <h5 className='text-2xl md:text-xl lg:text-3xl font-semibold'>{item.title}</h5>
              <Link to={'/all-cards'} className='absolute bottom-6 md:bottom-8 bg-white text-zinc-700 flex text-lg md:text-sm lg:text-xl items-center gap-2 px-4 py-2 rounded-full font-semibold'>
                Customize <img className='h-4 w-4 md:h-3 md:w-3 lg:h-5 lg:w-5' src={lineout} alt="lineout" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Section4
