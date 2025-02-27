import React from 'react'

function NewsLetter() {
    return (
        <div className='px-4 py-10 md:px-16 lg:py-20 lg:px-32 bg-[#4364EF] text-white grid lg:grid-cols-2 gap-8 md:gap-12 font-inter'>
            <div className='space-y-4'>
                <h1 className='text-2xl md:text-3xl font-bold'>Subcribe to our Newsletter</h1>
                <p className='text-xs md:text-sm'>Subscribe for Updates: Stay informed about the latest investor updates, financial results, and announcements by subscribing to our newsletter. </p>
            </div>
            <div className='flex items-center'>
                <div className='rounded-2xl overflow-hidden flex w-full md:w-[60%] lg:w-full'>
                    <input type="email" className='text-sm w-full text-white bg-white bg-opacity-10 outline-none placeholder-white p-5' placeholder='Enter your email' />
                    <button className='bg-white text-[#8441F1] text-sm font-semibold p-5'>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter