import React, { useEffect, useRef, useState } from 'react'
import { clearCardItemsFromLocalStorage } from '../utils/clearCardItemsFromLocalStorage'
import cardImg from '../assets/Card text 2 blue 1.svg'
import upload from '../assets/upload.svg'
import lineout from '../assets/Line_out_white.svg'
import { Tab, Tabs } from '../components/Tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import FAQ from '../components/FAQ'
import Specs from '../components/Specs'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getCardByCardId } from '../services/Card.Services'
import { getItem } from '../utils/getItem'
import { getImage } from '../utils/getImage'
import Loader from '../components/Loader'

function CardDetails() {
    const scrollContainer = useRef(null);
    const { cardId } = useParams();
    const navigate = useNavigate()
    const [singleCardData, setSingleCardData] = useState({})

    async function getCardByCardIdData(cardId) {
        const response = await getCardByCardId(cardId)
        if (response) {
            setSingleCardData(response.data.card)
        }
    }

    useEffect(() => {
        clearCardItemsFromLocalStorage()
    }, [])

    useEffect(() => {
        if (!cardId) {
            toast.dismiss();
            toast.error("Invalid Card Clicked or Card Not Fount")
            navigate('/shop')
        }
        if (cardId) {
            getCardByCardIdData(cardId)
        }
    }, [cardId])

    const scrollLeft = () => {
        scrollContainer.current.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollContainer.current.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    };
    return (
        <>
            {singleCardData._id ? <div className='px-4 py-10 md:px-16 font-dmSans'>
                <div className='grid lg:grid-cols-2 gap-10 lg:gap-16 relative'>
                    <div className=''>
                        <div className='w-full'>
                            <img src={getImage(singleCardData.thumbnail)} alt="card-img" className='w-full' />
                        </div>
                        <div className='md:mt-10 flex justify-evenly gap-4'>
                            <Link to={`/edit-card/${cardId}`} className='mt-4 text-[.7rem] md:text-sm lg:text-lg text-white btn-grad w-full lg:w-60 p-4 rounded-full flex items-center gap-2 justify-center'>Continue Design <img src={lineout} alt="lineout" className='w-3 h-3 lg:w-4 lg:h-4' /></Link>
                            {/* <button className='mt-4 text-[.7rem] md:text-sm lg:text-lg text-white btn-grad w-full lg:w-60 p-4 rounded-full flex items-center gap-2 justify-center'>Upload Design <img src={upload} alt="upload" className='w-4 h-4 lg:w-5 lg:h-5' /></button> */}
                        </div>
                    </div>
                    <div>
                        <div>
                            <h6 className='text-xl font-bold'>{singleCardData.productTitle}</h6>
                            <div className='mt-5 ml-5' dangerouslySetInnerHTML={{ __html: singleCardData.features }}>
                                {/* <ul className='list-disc text-sm font-medium lg:w-[80%]' >
                                    <li>Dimension shown on the design page includes bleed area
                                        (safety area), the final card size will be 8.9 cm x 5.1 cm</li>
                                    <li>
                                        Stretch your design up to the Bleed area to avoid white
                                        borders appearing around your card. Keep all your
                                        information within the safety area.
                                    </li>
                                    <li>
                                        Choose bold fonts size 10 and above when using white text.
                                    </li>
                                    <li>
                                        Need help in designing? You can avail of our Design
                                        Services
                                    </li>
                                    <li>
                                        Note: Please do not print designs belonging to Government.
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                        {/* <div className='mt-10'>
                            <h6 className='text-xl font-bold'>Quantity</h6>
                            <div className='mt-5 flex flex-col gap-4'>
                                <Link to={'/edit-card'}>
                                    <div className='p-1 bg-gradient-to-r from-[#4364EF] to-[#8441F1] rounded-full'>
                                        <div className='flex justify-between items-center py-4 px-6 bg-white rounded-full'>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%]'>
                                                <p className='text-lg font-semibold'>100</p>
                                                <span className='text-white text-[.6rem] bg-[#4364EF] p-1 rounded-md hidden'>Recommended</span>
                                            </div>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%] '>
                                                <p className='text-lg font-semibold'>$20.00</p>
                                                <p className='text-xs text-zinc-500'>$0.20 per card</p>
                                            </div>
                                            <div className='w-[33%]'>
                                                <span className='text-sm md:text-lg text-[#35C03E] hidden'>0% Savings</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <Link to={'/edit-card'}>
                                    <div className='p-1 bg-gradient-to-r from-[#4364EF] to-[#8441F1] rounded-full'>
                                        <div className='flex justify-between items-center py-4 px-6 bg-white rounded-full'>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%]'>
                                                <p className='text-lg font-semibold'>200</p>
                                                <span className='text-white text-[.6rem] bg-[#4364EF] p-1 rounded-md'>Recommended</span>
                                            </div>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%]'>
                                                <p className='text-lg font-semibold'>$38.00</p>
                                                <p className='text-xs text-zinc-500'>$0.19 per card</p>
                                            </div>
                                            <div className='w-[33%] flex justify-end'>
                                                <span className='text-sm md:text-lg text-[#35C03E]'>10% Savings</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <Link to={'/edit-card'}>
                                    <div className='p-1 bg-gradient-to-r from-[#4364EF] to-[#8441F1] rounded-full'>
                                        <div className='flex justify-between items-center py-4 px-6 bg-white rounded-full'>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%]'>
                                                <p className='text-lg font-semibold'>300</p>
                                                <span className='text-white text-[.6rem] bg-[#4364EF] px-2 py-1 rounded-md hidden'>Recommended</span>
                                            </div>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%]'>
                                                <p className='text-lg font-semibold'>$38.00</p>
                                                <p className='text-xs text-zinc-500'>$0.19 per card</p>
                                            </div>
                                            <div className='w-[33%] flex justify-end'>
                                                <span className='text-sm md:text-lg text-[#35C03E]'>15% Savings</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <Link to={'/edit-card'}>
                                    <div className='p-1 bg-gradient-to-r from-[#4364EF] to-[#8441F1] rounded-full'>
                                        <div className='flex justify-between items-center py-4 px-6 bg-white rounded-full'>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%]'>
                                                <p className='text-lg font-semibold'>400</p>
                                                <span className='text-white text-[.6rem] bg-[#4364EF] p-1 rounded-md hidden'>Recommended</span>
                                            </div>
                                            <div className='flex flex-col md:flex-row items-center md:gap-4 w-[33%]'>
                                                <p className='text-lg font-semibold'>$38.00</p>
                                                <p className='text-xs text-zinc-500'>$0.19 per card</p>
                                            </div>
                                            <div className='w-[33%] flex justify-end'>
                                                <span className='text-sm md:text-lg text-[#35C03E]'>20% Savings</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div> */}
                    </div>
                </div>

                <div className='w-full mt-10 md:mt-10'>
                    <Tabs>
                        <Tab label="Overview">
                            <div className='grid lg:grid-cols-2 gap-4'>
                                <div className='space-y-4 text-base order-2 lg:order-1' dangerouslySetInnerHTML={{ __html: singleCardData.overview?.description }}>
                                    {/* <h6 className='text-lg font-semibold'>Set yourself apart with Rounded Business Cards</h6>
                                    <p>Looking to stand out as a professional? Get an edge with rounded corner business cards! Make a great first impression by getting rounded corner visiting cards to represent your brand. Rounded business card designs are memorable and help keep your company name on top of clients' minds. Not only do they give your card a fresh and modern look, but they also make your visiting card easier to spot when grouped into a stack with others.</p>
                                    <p> At Smart Connections, you will find round business card printing convenient online using our round visiting card maker. First, explore a wide range of fully customisable professional round visiting card designs or use your complete design. Next, add your details like business name, logo, website and more, and pick a paper stock that complements your design and personality. Your round business visiting card will arrive crisp and vibrant, a look you'll love and feel proud to show off.</p>
                                    <p>Creative ways to use your visiting cards.</p>
                                    <p> Are you looking for something specific? Check out these on-trend templates for visiting cards - Food Catering, Weight Loss Consultant, Patriotic & Military,  Mortgages & Loans Food & Ice Cream Trucks, Floral, Building Construction, Health & Social Services, Sports, Property & Estate Agents, Restaurants and more.</p>
                                    <p> For Bulk orders exceeding Rs. 20,000 in value, contact our Customer Care for any assistance.</p>
                                    <p> Smart Connections customizes all its products in facilities located within India. Some of our raw materials, intermediate components, and consumables used in the manufacturing of the final product could be from one or more countries. As we follow Global Sourcing, one product is likely to have a different country of origin depending on the batch sold.</p> */}
                                </div>
                                <div className='order-1 lg:order-2'>
                                    <div className='w-full'>
                                        <img src={getImage(singleCardData?.overview?.image)} alt="card-img" className='w-full' />
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Options">
                            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6'>
                                {singleCardData && singleCardData.options && singleCardData.options.map((item, index) => (

                                    <div>
                                        <div className='rounded-[28px] overflow-hidden'>
                                            <img
                                                src={getImage(item.image)}
                                                alt="img"
                                                className='relative'
                                            />
                                        </div>
                                        <div className='pt-4 text-base' dangerouslySetInnerHTML={{ __html: item.description }}>
                                            {/* <h5 className='font-semibold'>Standard Matte</h5>
                                            <p className='mt--1 mb-3'>
                                                Coated, smooth feel and easy readability. 350 gsm.
                                            </p>
                                            <ul className='list-disc ml-6'>
                                                <li><span className='font-semibold'>Best for:</span> Light-colored designs</li>
                                                <li><span className='font-semibold'>Not for:</span> Dark, vibrant colors</li>
                                                <li><span className='font-semibold'>Feels like: </span> Varnished front and back</li>
                                            </ul> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab>
                        {/* <Tab label="Specs & Templates">
                            <h3 className='font-semibold text-2xl my-10'>Specs & Templates Content</h3>
                            <Specs />
                        </Tab> */}
                        <Tab label="FAQ">
                            <h3 className='font-semibold text-2xl my-10'>Frequently Asked Questions</h3>
                            <div>
                                <FAQ data={singleCardData.productFaq} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                <div className='mt-10 md:mt-10 overflow-hidden relative'>
                    <h4 className='text-lg font-semibold '>Related Products</h4>

                    {/* Scroll Left Button */}

                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 btn-grad text-white p-2 rounded-full z-10 w-10 h-10 flex justify-center items-center"
                    >
                        <ChevronLeft />
                    </button>

                    {/* Scroll Right Button */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 btn-grad text-white p-2 rounded-full z-10 w-10 h-10 flex justify-center items-center"
                    >
                        <ChevronRight />
                    </button>

                    <div ref={scrollContainer} className='flex p-10 gap-4 overflow-x-auto'>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className='rounded-[28px] overflow-hidden relative min-w-44 minh-44 md:min-w-60 md:min-h-60'>
                                <img
                                    src="https://cms.cloudinary.vpsvc.com/image/upload/c_scale,dpr_auto,f_auto,q_70,w_auto:50:550/India%20LOB/Website%20Category%20Images/Visiting%20Cards/Classic-visiting-cards_Category-image_1x1"
                                    alt="img"
                                    className='relative'
                                />
                                <div className='absolute top-0 w-full h-full'>
                                    <div className='absolute bottom-4 left-4 text-white'>
                                        <h6 className='text-sm lg:text-lg font-semibold'>Rounded Edges</h6>
                                        <p className='text-xs lg:text-base'>Starting from - $10</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div> : <div className='w-full h-screen flex justify-center items-center'>
                <Loader />
            </div>}
        </>
    )
}

export default CardDetails