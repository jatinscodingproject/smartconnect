import React, { useState } from 'react';
import { X } from 'lucide-react';

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }
    setError('');
    console.log('Password reset link sent to:', email);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <X className="absolute top-2 right-2 cursor-pointer" size={24} onClick={onClose} />
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
