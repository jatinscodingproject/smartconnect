import React from 'react'

function Specs() {
    return (
        <div className='flex flex-col lg:flex-row gap-5'>
            <div className='pt-5 pb-10 lg:w-[65%] bg-zinc-100 md:h-96 rounded-[28px] flex flex-col md:flex-row'>
                <div className='p-6 py-10 lg:p-10 w-full md:w-[60%] flex items-center'>
                    <div className='w-full bg-white h-48 md:h-[80%] border border-red-500 p-1'>
                        <div className='h-full w-full border border-blue-500 p-1'>
                            <div className='h-full w-full border-2 border-dashed flex justify-center items-center'>
                                <p className='text-4xl font-semibold text-zinc-300'>Safe Area</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-full md:w-[40%] flex flex-col justify-center px-6 lg:px-10 gap-4'>
                    <div className='grid grid-cols-2 text-base gap-2'>
                        <div>
                            <p className='font-semibold'>Full Bleed Size</p>
                        </div>
                        <div>
                            <p>2.28" x 3.7"</p>
                            <p>58 x 94 mm</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 text-base gap-2'>
                        <div>
                            <p className='font-semibold'>Document Trim Size</p>
                        </div>
                        <div>
                            <p>2.17" x 3.58"</p>
                            <p>55 x 91 mm</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 text-base gap-2'>
                        <div>
                            <p className='font-semibold'>Safety Area</p>
                        </div>
                        <div>
                            <p>2.05" x 3.46"</p>
                            <p>52 x 88 mm</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:w-[30%] py-10 text-sm text-zinc-800 space-y-4'>
                <p>To avoid white edges, extend your design to the full bleed size - but keep text and images within the safety area.</p>
                <p>Create your print-ready file.
                    Download the template.</p>
                <div className='pt-5 space-x-2 space-y-3'>
                    <button className='px-4 py-2 rounded-lg border border-zinc-300 text-lg font-semibold'>PDF</button>
                    <button className='px-4 py-2 rounded-lg border border-zinc-300 text-lg font-semibold'>SVG</button>
                    <button className='px-4 py-2 rounded-lg border border-zinc-300 text-lg font-semibold'>{"Adobe Illustrator (.ai)"}</button>
                </div>

            </div>
        </div>
    )
}

export default Specs