import React from "react";
import frame from '../assets/Frame 2.png';
import heroImg from '../assets/Rectangle 2.png';

export default function EnterpriseSection() {
    return (
        <div className="w-full mx-auto p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
                {/* Left - Customization Card */}
                <div
                    className="relative shadow-lg rounded-xl p-6 md:col-span-6 flex items-start justify-center h-96 w-full overflow-hidden"
                    style={{
                        backgroundImage: ``,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "1rem", // Rounded corners
                    }}
                >
                    {/* Enterprise Bulk Order - Positioned at top-left */}
                    <p className="absolute top-6 left-6 text-black font-semibold text-lg  px-2 py-1 rounded">
                        Enterprise bulk order
                    </p>

                    {/* Gradient Background Button */}
                    <div className="absolute bottom-6 left-6 bg-gradient-to-r px-5 py-2 rounded-lg text-sm font-medium">
                        <button className='mt-4 text-[.7rem] md:text-sm lg:text-lg text-white btn-grad w-32 md:w-44 lg:w-52 p-2 rounded-full'>Customize your own</button>
                    </div>
                </div>



                {/* Right - Customization List & Phone */}
                <div className="flex flex-col gap-6 md:col-span-6 items-start w-full">
                    {/* Customization List */}
                    <div className="bg-white shadow-md rounded-lg p-4 w-full  rounded-xl">
                        <h3 className="text-lg font-semibold mb-2">Get to customize:</h3>
                        <ul className="space-y-2">
                            {["Name", "Design", "Color", "Pattern", "One of One"].map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <span className="text-purple-600">✔</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tap to Share Section */}
                <div className="col-span-12 flex justify-center items-start text-center w-full">
                    <img
                        src={frame} // Replace with actual phone image URL
                        alt="Phone NFC"
                        className="w-full md:w-full mt-4 h-auto object-cover  rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
}
