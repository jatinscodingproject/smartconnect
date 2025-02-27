import React from 'react'
import img from '../assets/Frame 11935.png'
import img2 from '../assets/image 5.svg'
import img3 from '../assets/image 6.svg'
import img4 from '../assets/image 7.svg'
import frame from '../assets/Frame 2.png'
import lineout from '../assets/Line_out.svg'
import frame2 from '../assets/Frame 6.svg'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getCategory } from '../services/Category.Services'
import { useState } from 'react'
import { getImage } from '../utils/getImage'
import { clearCardItemsFromLocalStorage } from '../utils/clearCardItemsFromLocalStorage'

function Shop() {
  const [cardCategoriesFromApi, setCardCategoriesFromApi] = useState([]);

  async function getCategoryData() {
    try {
      const response = await getCategory()
      setCardCategoriesFromApi(response.data.category);
    } catch (error) {
      console.log("Error in getCategoryData", error);
    }
  }

  useEffect(() => {
    clearCardItemsFromLocalStorage();
  }, [])

  useEffect(() => {
    getCategoryData()
  }, [])

  return (
    <>
      <div className='px-4 py-10 md:px-16 font-dmSans'>
        <img src={img} alt="img" className='w-full' />
        <div className='md:mt-10 lg:mt-10'>
          <h3 className='mb-6 text-2xl lg:text-4xl font-semibold text-[#2744C8]'>Most Popular</h3>
          <div className='w-full grid md:grid-cols-3 gap-2 lg:gap-4 xl:gap-6 custom-gap'>
            <div className='rounded-l-[52px] overflow-hidden relative'>
              <img src={img2} alt="img" className='relative z-0 w-full' />
              <div className='w-full h-full absolute top-0 px-8 py-6'>
                <h5 className='text-3xl md:text-xl lg:text-3xl font-semibold'>PVC Card</h5>
                <Link to={'/shops'} className='absolute bottom-8 bg-white text-zinc-700 flex text-xl md:text-sm lg:text-xl items-center gap-2 px-4 py-2 rounded-full font-semibold'>
                  Customize <img className='h-5 w-5 md:h-3 md:w-3 lg:h-5 lg:w-5' src={lineout} alt="lineout" />
                </Link>
              </div>
            </div>
            <div className='relative overflow-hidden'>
              <img src={img3} alt="img" className='relative w-full' />
              <div className='w-full h-full absolute top-0 px-8 py-6'>
                <h5 className='text-3xl md:text-xl lg:text-3xl font-semibold'>Custom</h5>
                <Link to={'/shops'} className='absolute bottom-8 bg-white text-zinc-700 flex text-xl md:text-sm lg:text-xl items-center gap-2 px-4 py-2 rounded-full font-semibold'>
                  Customize <img className='h-5 w-5 md:h-3 md:w-3 lg:h-5 lg:w-5' src={lineout} alt="lineout" />
                </Link>
              </div>
            </div>
            <div className='rounded-r-[52px] overflow-hidden relative last-card'>
              <img src={img4} alt="img" className='relative w-full' />
              <div className='w-full h-full absolute top-0 px-8 py-6'>
                <h5 className='text-3xl md:text-xl lg:text-3xl font-semibold'>Metal Cards</h5>
                <Link to={'/shops'} className='absolute bottom-8 bg-white text-zinc-700 flex text-xl md:text-sm lg:text-xl items-center gap-2 px-4 py-2 rounded-full font-semibold'>
                  Customize <img className='h-5 w-5 md:h-3 md:w-3 lg:h-5 lg:w-5' src={lineout} alt="lineout" />
                </Link>
              </div>
            </div>
          </div>


        </div>

        {cardCategoriesFromApi && cardCategoriesFromApi.length > 0 && (
          <div className='mt-10 lg:mt-10'>
            <h3 className='mb-6 text-2xl lg:text-4xl font-semibold text-[#2744C8]'>Premium Business Cards</h3>
            <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-3'>
              {cardCategoriesFromApi.map((item, index) => (
                <Link to={"/all-cards/" + item?._id} key={index}>
                  <div className={`overflow-hidden relative ${index === 0 ? 'rounded-l-[28px]' : index === cardCategoriesFromApi.length - 1 ? 'rounded-r-[28px]' : 'rounded-[28px]'}`}>
                    <img src={getImage(item?.thumbnail)} alt="img" className='relative' />
                    <div className='absolute top-0 w-full h-full'>
                      <div className='absolute bottom-4 left-4 text-white'>
                        <h6 className='text-sm lg:text-lg font-semibold'>{item.name}</h6>
                        <p className='text-xs lg:text-base'>Starting from - $10</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className='mt-8 lg:mt-10 w-full'>
          <img src={frame} alt="frame" className='w-full' />
        </div>
      </div>

    </>
  )
}

export default Shop