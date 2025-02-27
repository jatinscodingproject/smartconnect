import React from 'react';
import avatar from '../assets/Shape.png';

function Testimonials() {
  return (
    <div className="px-4 py-10 mt-10 md:px-16">
      <div className="bg-[#202020] w-full rounded-xl flex flex-col lg:flex-row items-center p-6 md:p-10 lg:py-14 lg:px-20 relative overflow-hidden gap-6 md:gap-8 lg:gap-12 font-poppins">

        {/* Background Decorative Circles */}
        <div className="rounded-full absolute h-16 w-16 md:h-20 md:w-20 bg-[#0050EBA8] bg-opacity-65 -left-6 md:-left-10"></div>
        <div className="rounded-full absolute h-16 w-16 md:h-20 md:w-20 bg-[#0050EBA8] bg-opacity-65 -bottom-6 md:-bottom-10 right-6 md:right-10"></div>

        {/* Left Section - Title */}
        <div className="flex items-center justify-center lg:justify-start text-center lg:text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Clients Testimonials
          </h1>
        </div>

        {/* Right Section - Testimonial Content */}
        <div className="text-white flex flex-col items-center lg:items-start gap-4 lg:w-[70%] relative z-10 text-center lg:text-left">
          <img
            src={avatar}
            alt="Testimonial"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-white"
          />

          <p className="text-sm md:text-base px-4 lg:px-0">
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero expedita natus veniam sed ullam, laborum consectetur veritatis nesciunt tempore earum."
          </p>

          {/* Star Ratings */}
          <div className="flex gap-1">
            {[...Array(4)].map((_, index) => (
              <svg key={index} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#f8a401" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#f8a401" stroke="none">
              <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
            </svg>
          </div>

          {/* Testimonial Name */}
          <h5 className="text-lg font-semibold">Savannah Nguyen</h5>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
