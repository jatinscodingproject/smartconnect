import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Section1 from '../components/Section1'
import Section2 from '../components/Section2'
import Section3 from '../components/Section3'
import Section4 from '../components/Section4'
import Section5 from '../components/Section5'
import Section6 from '../components/Section6'
import { Toaster } from 'react-hot-toast'
import ArtistFlair from '../components/Artist'
import { clearCardItemsFromLocalStorage } from '../utils/clearCardItemsFromLocalStorage'

function Artist() {
    useEffect(() => {
        clearCardItemsFromLocalStorage();
      }, [])
    return (
        <>
            <div className='px-4 py-2 md:px-8 md:py-4 lg:px-14 lg:py-10 font-dmSans'>
                <Section3 />
                <h2 className='text-center text-4xl mt-5 text-bold'>Artist Flair </h2>
                <ArtistFlair />
                <ArtistFlair />
                <ArtistFlair />
                <ArtistFlair />
                <Toaster />
            </div>
        </>
    )
}

export default Artist