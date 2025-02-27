import React, { useEffect } from 'react'
import BusinessCardSection from '../components/shoptext'
import DesignSection from '../components/Designsec'
import RelatedProducts from '../components/product'
import { Toaster } from 'react-hot-toast'
import { clearCardItemsFromLocalStorage } from '../utils/clearCardItemsFromLocalStorage'

function Shop2() {
    useEffect(() => {
        clearCardItemsFromLocalStorage();
      }, [])
    return (
        <>
            <div className='px-4 py-2 md:px-8 md:py-4 lg:px-14 lg:py-10 font-dmSans'>
                <DesignSection />
                <BusinessCardSection />
                <RelatedProducts />
                <Toaster />
            </div>
        </>
    )
}

export default Shop2