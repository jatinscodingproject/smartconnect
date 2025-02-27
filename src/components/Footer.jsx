import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo wt name 1.svg';

function Footer() {
  return (
    <div className='bg-black text-white font-dmSans'>
      <div className="px-4 md:px-20 py-6 flex flex-wrap gap-16 md:gap-40 flex-col md:flex-row">
        {/* Left Section - Logo & Contact */}
        <div>
          <img src={logo} alt="logo" className="w-20 h-20" />
          <p>Address line1</p>
          <p>Contact details</p>
        </div>

        {/* Policies Section */}
        <div className="flex flex-col gap-3 md:mt-8">
          <a href="" className="underline">Refund Policy</a>
          <a href="" className="underline">Privacy Policy</a>
          <a href="" className="underline">T&C</a>
          <a href="" className="underline">Shipping Policy</a>
          <a href="" className="underline">FAQs</a>
          <a href="" className="underline">Compatibility</a>
        </div>

        {/* Navigation Section */}
        <div className="flex flex-col gap-3 md:mt-8">
          <a href="" className="underline">Home</a>
          <a href="" className="underline">Enterprises & Team</a>
          <a href="" className="underline">Artist Work</a>
          <a href="" className="underline">Shop</a>
          <a href="" className="underline">About Us</a>
          <a href="" className="underline">Contact Us</a>
        </div>

        {/* Social Media Icons (Right Corner & Below) */}
        <div className="flex gap-4 ml-auto mt-6 self-end">
          <a href="#" className="text-white text-xl hover:text-gray-400"><FaFacebook /></a>
          <a href="#" className="text-white text-xl hover:text-gray-400"><FaTwitter /></a>
          <a href="#" className="text-white text-xl hover:text-gray-400"><FaInstagram /></a>
          <a href="#" className="text-white text-xl hover:text-gray-400"><FaLinkedin /></a>
        </div>
      </div>


      {/* Footer Bottom */}
      <div className="flex justify-between items-center px-4 md:px-20 py-4 border-t border-gray-600">
        {/* Social Media Icons (Left Corner) */}


        {/* Copyright Text (Center) */}
        <p className='text-center w-full md:w-auto'>All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
