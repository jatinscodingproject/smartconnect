import { ArrowRight } from 'lucide-react'
import React from 'react'
import NewsLetter from '../components/NewsLetter'
import fb from "../assets/fb.svg"
import insta from "../assets/insta.svg"
import twitter from "../assets/twitter.svg"
function Contact() {
    return (
        <>
            <div className='p-4 md:py-10 md:px-16 lg:py-20 lg:px-32 font-dmSans'>
                <div className='md:flex justify-between'>
                    <div className='mb-4 md:mb-0'>
                        <h1 className='text-3xl md:text-5xl font-bold md:leading-normal'>Get in touch with us.</h1>
                        <h1 className='text-3xl md:text-5xl font-bold md:leading-normal'>We're here to assist you.</h1>
                    </div>
                    <div className='flex gap-4 md:flex-col'>
                        <div className='w-8 h-8 rounded-full border border-zinc-300 flex justify-center items-center'><img src={fb} alt="social-icons"/></div>
                        <div className='w-8 h-8 rounded-full border border-zinc-300 flex justify-center items-center'><img src={insta} alt="social-icons"/></div>
                        <div className='w-8 h-8 rounded-full border border-zinc-300 flex justify-center items-center'><img src={twitter} alt="social-icons"/></div>
                    </div>
                </div>
                <div className='grid md:grid-cols-3 gap-5 mt-10'>
                    <input type="text" className='border-b border-zinc-300 p-1 text-sm placeholder-zinc-600' placeholder='Your Name' />
                    <input type="text" className='border-b border-zinc-300 p-1 text-sm placeholder-zinc-600' placeholder='Email Address' />
                    <input type="text" className='border-b border-zinc-300 p-1 text-sm placeholder-zinc-600' placeholder='Phone Number (optional)' />

                </div>
                <div className='mt-10 flex flex-col'>
                    <span className='text-lg mb-2 font-semibold text-zinc-800'>Message</span>
                    <textarea name="" id="" rows="4" className='border-b border-zinc-300 '></textarea>
                </div>
                <button className='mt-10 flex items-center gap-1 bg-[#4364EF] text-sm text-white font-semibold rounded-2xl p-3'>Leave us a Message <ArrowRight size={16} /></button>
                <div className='mt-10'>
                    <div className='lg:flex justify-between space-y-10'>
                        <div className='lg:w-[50%] space-y-4'>
                            <span className='text-lg  font-semibold'>Contact Info</span>
                            <h1 className='text-3xl md:text-4xl font-bold lg:w-[60%]'>We are always happy to assist you</h1>
                        </div>
                        <div className='grid grid-cols-2 gap-5 md:gap-20 lg:gap-32'>
                            <div className=''>
                                <h6 className='text-lg font-semibold'>Email Address</h6>
                                <hr className='my-4 border-t-2 border-black w-6' />
                                <span className='text-lg font-semibold'>help@info.com</span>
                                <div className='mt-4 font-medium'>
                                    <p>Assistance hours:</p>
                                    <p>Monday - Friday</p>
                                    <p>6:00 AM - 8:00 PM EST</p>
                                </div>
                            </div>
                            <div className=''>
                                <h6 className='text-lg font-semibold'>Number</h6>
                                <hr className='my-4 border-t-2 border-black w-6' />
                                <span className='text-lg font-semibold'>(808) 998-34256</span>
                                <div className='mt-4 font-medium'>
                                    <p>Assistance hours:</p>
                                    <p>Monday - Friday</p>
                                    <p>6:00 AM - 8:00 PM EST</p>
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <div className='mb-4 font-medium'>
                                <p className='text-lg font-semibold'>Assistance hours:</p>
                                <p>Monday - Friday &nbsp; | &nbsp; 6:00 AM - 8:00 PM EST</p>
                            </div>
                            <div className='grid grid-cols-2 gap-5 md:gap-20 lg:gap-32'>
                                <div className=''>
                                    <h6 className='text-lg font-semibold'>Email Address</h6>
                                    <hr className='my-2 md:my-4 border-t-2 border-black w-6' />
                                    <span className='text-lg font-semibold'>help@info.com</span>
                                </div>
                                <div className=''>
                                    <h6 className='text-lg font-semibold'>Number</h6>
                                    <hr className='my-2 md:my-4 border-t-2 border-black w-6' />
                                    <span className='text-lg font-semibold'>(808) 998-34256</span>
                                </div>
                            </div>

                        </div> */}
                    </div>
                </div>
            </div>
            <NewsLetter />
        </>

    )
}

export default Contact