import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGoogle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const SignUp = ({ isOpen, onClose, onSignInClick }) => {
    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("https://your-api-url.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Account created successfully!");
                onClose();
            } else {
                setError(result.message || "Something went wrong!");
            }
        } catch (error) {
            setError("Failed to connect to the server.");
        }

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[500px] relative">
                <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>
                    <X size={24} />
                </button>

                <h2 className="text-xl font-semibold text-center mb-5">Let's get you Signed Up!</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="Enter your full name"
                        value={formData.fullName} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4" required />

                    <input type="email" name="email" placeholder="Enter email address"
                        value={formData.email} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4" required />

                    <input type="tel" name="phone" placeholder="Enter phone number"
                        value={formData.phone} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4" required />

                    <input type="password" name="password" placeholder="Enter Password"
                        value={formData.password} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4" required />

                    <input type="password" name="confirmPassword" placeholder="Confirm Password"
                        value={formData.confirmPassword} onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4" required />

                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md text-lg"
                        disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

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
                    <p className="mt-3">
                        Already have an account?{" "}
                        <button className="text-blue-500 underline" onClick={onSignInClick}>
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
