import React from "react";
import black from "../assets/blackc.png"
import { useNavigate } from "react-router-dom";

export default function DesignSection() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-3xl overflow-hidden p-6 max-w-full mx-auto">
            {/* Left Section (Image) */}
            <div className="w-full md:w-full relative">
                <img
                    src={black}
                    alt="Classic black card"
                    className="w-3/4 md:w-full mx-auto rounded-lg"
                />
                <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    ▶
                </button>

                {/* Continue Design Button Below Image */}
                <button
                    onClick={() => navigate("/all-cards")}  // Navigate on click
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md flex items-center gap-2 w-3/4 md:w-full mx-auto justify-center"
                >
                    Continue Design ⟶
                </button>
            </div>

            {/* Right Section (Content) */}
            <div className="w-full md:w-full p-6 m-0">
                <h2 className="text-xl font-semibold">Classic Black Card</h2>
                <ul className="text-gray-600 text-sm mt-3 space-y-2">
                    <li>• Dimension shown includes bleed area (safety area).</li>
                    <li>• Final card size will be 8.9 cm x 5.1 cm.</li>
                    <li>• Stretch your design up to the Bleed area.</li>
                    <li>• Choose bold fonts size 10 and above when using white text.</li>
                    <li>• Need help in designing? You can avail of our Design Services.</li>
                    <li>• Note: Do not print designs belonging to the Government.</li>
                </ul>
            </div>
        </div>
    );
}
