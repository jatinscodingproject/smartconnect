import React from 'react'
import avatar from '../assets/Shape.png'
import logo from '../assets/image 4.png'
function Section5() {
    return (
        <div className='mt-8 lg:mt-16 w-full'>
            <h2 className='text-2xl md:text-4xl font-bold text-center'>Hear from some of our clients</h2>
            <div className='pt-10 relative'>
                <img src={avatar} alt="avatar" className='hidden md:block custom-shadow rounded-[52px] w-[300px] h-[300px]' />
                <div className='md:absolute custom-shadow rounded-[52px] px-8 py-8 md:px-12 space-y-8 -bottom-32 left-52 bg-white'>
                    <img src={logo} alt="logo" className='h-6'/>
                    <p className='text-lg font-semibold'>I can get to share my information following the latest trends of NFC and stand out from the crowd at convenstions.</p>
                    <div className='flex gap-2 items-center'>
                        <img src={avatar} alt="avatar" className='custom-shadow rounded-full w-16 h-16 md:hidden' />
                        <p className='text-sm font-semibold text-zinc-500'>Amy Jian, Product Manager at Autodesk</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section5