import React, { useEffect } from 'react'
import NewsLetter from '../components/NewsLetter'
import Testimonials from '../components/Testimonials'
import map from '../assets/map.png'
import img from '../assets/about_img.png'
import { clearCardItemsFromLocalStorage } from '../utils/clearCardItemsFromLocalStorage'
function About() {

  useEffect(() => {
    clearCardItemsFromLocalStorage();
  }, [])
  return (
    <>
      <div className=''>
        <div className='px-4 py-10 md:px-16 font-dmSans'>
          <div className='bg-[#733735] text-white w-full rounded-xl p-10 lg:p-20 gap-8 flex flex-col items-center bg-img'>
            <div className='w-full h-full bg-white'></div>
            <h1 className='text-3xl lg:text-5xl font-semibold'>About Us</h1>
            <h3 className='text-center text-xl lg:text-3xl font-semibold md:w-[80%]'>Empowering Smarter Connections – Redefining Networking with NFC Business Cards</h3>
            <p className='text-sm text-center text-[#C4C4C4]'>At Smart Connection, we believe that networking should be effortless, eco-friendly, and impactful. Our NFC business cards are designed to replace the clutter of traditional cards with a seamless, digital experience. With just a tap, you can share your contact details, social profiles, and more—anytime, anywhere. Whether you're a professional, entrepreneur, or creative, our mission is to help you forge meaningful connections in a smarter, modern way. Join us in embracing the future of networking!</p>
            <div className='hidden md:flex '>
              <div className='flex items-center gap-3 md:border-r-2 px-8'>
                <span className='text-3xl lg:text-5xl font-semibold'>1+</span>
                <p className='text-xs lg:text-sm w-1/2 text-[#C4C4C4]'>Years Of Experience</p>
              </div>
              <div className='flex items-center gap-3 md:border-r-2 px-8'>
                <span className='text-3xl lg:text-5xl font-semibold'>100+</span>
                <p className='text-xs lg:text-sm w-1/2 text-[#C4C4C4]'>Designs</p>
              </div>
              <div className='flex items-center gap-3 px-8'>
                <span className='text-3xl lg:text-5xl font-semibold'>4K+</span>
                <p className='text-xs lg:text-sm w-1/2 text-[#C4C4C4]'>Happy Customers</p>
              </div>
            </div>
          </div>
          <div className='md:hidden flex gap-4 justify-center bg-[#733735] text-white py-4 rounded-lg mt-4'>
            <div className='flex flex-col justify-center border-r px-4'>
              <span className='text-xl lg:text-5xl font-semibold'>1+</span>
              <p className='text-[.6rem] lg:text-sm  text-[#C4C4C4] leading-3'>Years Of Experience</p>
            </div>
            <div className='flex flex-col justify-center border-r px-4'>
              <span className='text-xl lg:text-5xl font-semibold'>100+</span>
              <p className='text-xs lg:text-sm text-[#C4C4C4]'>Designs</p>
            </div>
            <div className='flex flex-col justify-center px-4'>
              <span className='text-xl lg:text-5xl font-semibold'>4K+</span>
              <p className='text-xs lg:text-sm text-[#C4C4C4]'>Happy Customers</p>
            </div>
          </div>
        </div>
        <div className='px-4 py-10 md:px-16 lg:py-20 lg:px-32 bg-[#4364EF] flex justify-between lg:flex-row flex-col text-white gap-10'>
          <div className='lg:w-[40%] flex flex-col justify-center gap-4'>
            <h2 className='text-5xl font-semibold'>Our Vision</h2>
            <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, non cum cumque inventore qui doloribus sunt laborum! Dolorum nemo corporis ex sit voluptatibus commodi, aspernatur a eaque eveniet ipsum fuga harum aliquid natus, pariatur, nihil voluptatum molestias earum aut eius! Similique iste, magni eius doloremque eos amet vel sapiente repudiandae ipsum deserunt quas eum dolore alias libero doloribus earum? Exercitationem.</p>
          </div>
          <div className='lg:w-[50%]'>
            <img src={map} alt="map" />
          </div>
        </div>

      </div>
      <Testimonials />
      <NewsLetter />
    </>
  )
}

export default About