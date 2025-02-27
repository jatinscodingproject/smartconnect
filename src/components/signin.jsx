import React from "react";
import { X } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGoogle } from "react-icons/fa";

const SignIn = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[500px] relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold text-center mb-5">Let's get you Signed in!</h2>

        {/* Input Fields */}
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />

        {/* Sign In Button */}
        <button className="w-full bg-blue-500 text-white p-3 rounded-md text-lg">Sign In</button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Media Login */}
        <div className="flex justify-center space-x-6 mb-4">
          <button className="flex items-center justify-center text-blue-600  p-3 rounded-md hover:bg-blue-100 w-12 h-12">
            <FaFacebook size={24} />
          </button>
          <button className="flex items-center justify-center text-blue-400 p-3 rounded-md hover:bg-gray-200 w-12 h-12">
            <FaTwitter size={24} />
          </button>
          <button className="flex items-center justify-center text-blue-700 p-3 rounded-md hover:bg-blue-100 w-12 h-12">
            <FaLinkedin size={24} />
          </button>
          <button className="flex items-center justify-center text-red-500 p-3 rounded-md hover:bg-red-100 w-12 h-12">
            <FaGoogle size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="text-center text-sm text-gray-600">
          <a href="#" className="text-blue-500">Forgot your password?</a>
          <p className="mt-3">
            First time? <a href="#" className="text-blue-500">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
