import React, { useState } from "react";
import { X } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGoogle } from "react-icons/fa";

const SignIn = ({ isOpen, onClose, onSignUpClick }) => {
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openForgotPassword = () => {
    setForgotPasswordOpen(true);
  };

  const closeForgotPassword = () => {
    setForgotPasswordOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] relative">
        <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-5">Welcome Back!</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />

        <button className="w-full bg-blue-500 text-white p-3 rounded-md text-lg">
          Sign In
        </button>

        <div className="text-right text-sm text-gray-600 mt-2">
          <button onClick={openForgotPassword} className="text-blue-500">
            Forgot Password?
          </button>
        </div>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-6 mb-4">
          <button className="flex items-center justify-center text-blue-600 p-3 rounded-md hover:bg-blue-100 w-12 h-12">
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

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account? {" "}
            <button className="text-blue-500 underline" onClick={onSignUpClick}>
              Sign Up
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] relative">
            <button className="absolute top-3 right-3 text-gray-600" onClick={closeForgotPassword}>
              <X size={24} />
            </button>
            <h2 className="text-lg font-semibold text-center mb-4">Reset Password</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Enter your email to receive password reset instructions.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <button className="w-full bg-blue-500 text-white p-3 rounded-md text-lg">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
