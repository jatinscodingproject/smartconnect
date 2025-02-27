import React from "react";
import black from "../assets/blackc.png"

export default function BusinessCardSection() {
  return (
    <div className="max-w-full mx-auto p-6 mt-10">
      {/* Navigation Tabs */}
      <div className="flex border-b">
        {["Overview", "Options", "Specs & Templates", "FAQ"].map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-semibold ${
              index === 0 ? "border-b-2 border-blue" : "text-blue"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-start justify-between mt-6 mr-5">
        {/* Left Content */}
        <div className="md:w-full">
          <h2 className="text-xl font-semibold">Set yourself apart with Rounded Business Cards</h2>
          <p className="text-gray-700 mt-4">
            Looking to stand out as a professional? Get an edge with rounded corner business 
            cards! Make a great first impression by getting rounded corner visiting cards to 
            represent your brand. Rounded business card designs are memorable and help keep 
            your company name on top of clients’ minds. Not only do they give your card a fresh 
            and modern look, but they also make your visiting card easier to spot when grouped 
            into a stack with others.
          </p>
          <p className="text-gray-700 mt-4">
            At Smart Connections, you will find round business card printing convenient online 
            using our round visiting card maker. First, explore a wide range of fully customizable 
            professional round visiting card designs or use your complete design. Next, add your 
            details like business name, logo, website and more, and pick a paper stock that 
            complements your design and personality. Your round business visiting card will 
            arrive crisp and vibrant, a look you’ll love and feel proud to show off.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-6 md:mt-0 ml-5">
          <img
            src={black}
            alt="Business Card Box"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
    </div>
  );
}
