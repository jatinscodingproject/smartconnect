import React from "react";
import frame from '../assets/Frame 2.png';

export default function EnterpriseSection() {
    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">
            
            {/* Grid Layout (Changes to Column Layout Below 780px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
                
                {/* Left - Customization Card (Moves Above Below 780px) */}
                <div
                    className="relative shadow-lg rounded-xl p-6 h-80 sm:h-96 w-full flex items-center justify-center"
                    style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "1rem",
                    }}
                >
                    {/* Enterprise Bulk Order Label */}
                    <p className="absolute top-4 left-4 text-black font-semibold text-sm sm:text-lg  px-3 py-1 ">
                        Enterprise bulk order
                    </p>

                    {/* Customize Button */}
                    <div className="absolute bottom-4 left-4">
                        <button className="text-sm sm:text-base md:text-lg text-white bg-gradient-to-r from-purple-500 to-indigo-600 w-28 sm:w-36 md:w-48 p-2 rounded-full shadow-lg">
                            Customize your own
                        </button>
                    </div>
                </div>

                {/* Right - Customization List (Moves Below Below 780px) */}
                <div className="flex flex-col gap-6 w-full">
                    <div className="bg-white shadow-md rounded-xl p-6 w-full">
                        <h3 className="text-lg sm:text-xl font-semibold mb-3">Get to customize:</h3>
                        <ul className="space-y-2 text-sm sm:text-base">
                            {["Name", "Design", "Color", "Pattern", "One of One"].map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="text-purple-600 text-lg">✔</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

           
        </div>
    );
}
