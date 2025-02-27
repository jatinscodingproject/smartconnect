import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Section1 from '../components/Section1'
import Section2 from '../components/Section2'
import Section3 from '../components/Section3'
import Section4 from '../components/Section4'
import Section5 from '../components/Section5'
import Section6 from '../components/Section6'
import Testimonials from '../components/Testimonials'
import EnterpriseSection from '../components/newSection'
import FAQ from '../components/FAQ'
import { Toaster } from 'react-hot-toast'
import { clearCardItemsFromLocalStorage } from '../utils/clearCardItemsFromLocalStorage'

const questions = [
    {
        question: "What are the dimensions of the classic visit cards?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt earum quas odio iste sunt exercitationem quis ex culpa mollitia consequatur!",
    },
    {
        question: "What are the dimensions of the classic visit cards?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt earum quas odio iste sunt exercitationem quis ex culpa mollitia consequatur!",
    },
    {
        question: "What are the dimensions of the classic visit cards?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt earum quas odio iste sunt exercitationem quis ex culpa mollitia consequatur!",
    },
    {
        question: "What are the dimensions of the classic visit cards?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt earum quas odio iste sunt exercitationem quis ex culpa mollitia consequatur!",
    },
    {
        question: "What are the dimensions of the classic visit cards?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt earum quas odio iste sunt exercitationem quis ex culpa mollitia consequatur!",
    },
    {
        question: "What are the dimensions of the classic visit cards?",
        answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt earum quas odio iste sunt exercitationem quis ex culpa mollitia consequatur!",
    },
]

function Enterprises() {
    useEffect(() => {
        clearCardItemsFromLocalStorage();
      }, [])
    return (
        <>
            <div className='px-4 py-2 md:px-8 md:py-4 lg:px-14 lg:py-10 font-dmSans'>
                <EnterpriseSection />
                {/* <Hero /> */}
                <Section1 />
                <Section2 />
                <Section4 />
                <Section3 />
                <Testimonials />
                <Section6 />
                <FAQ data={questions}/>
                <Toaster />
            </div>
        </>
    )
}

export default Enterprises