import React, { useState } from 'react';
import logo from '../assets/logo 1.svg';
import logoText from '../assets/Smart Connections.svg';
import { AlignJustify } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SignIn from './signin';
import { getItem } from '../utils/getItem';

function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
    setMenuOpen(false);   // Close the menu if it's open
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleAnchorClick = (e) => {
    const token = getItem('token');
    if (token) {
      e.preventDefault();
      // window.open(`${import.meta.env.VITE_USER_DASHBOARD_REDIRECT_URL}?token=${token}`, '_blank');
      openModal();
    } else {
      openModal();
    }
  };

  return (
    <div>
      {/* Navbar (Visible on larger screens) */}
      <div className="shadow-lg px-4 lg:px-14 py-1 flex justify-between items-center font-dmSans">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <img src={logoText} alt="logo-text" />
        </div>

        {/* Full Menu (Hidden below 1024px) */}
        <div className="hidden lg:flex w-[60vw] justify-between items-center text-sm font-semibold">
          <div className="space-x-5">
            <Link to="/" className={pathname === '/' ? "text-blue-500" : ""}>Home</Link>
            <Link to="/Enterprises" className={pathname === '/Enterprises' ? "text-blue-500" : ""}>Enterprises & Team</Link>
            <Link to="/Artist" className={pathname === '/Artist' ? "text-blue-500" : ""}>Artist Work</Link>
            <Link to="/shop" className={pathname === '/shop' ? "text-blue-500" : ""}>Shop</Link>
            <Link to="/about" className={pathname === '/about' ? "text-blue-500" : ""}>About Us</Link>
            <Link to="/contact" className={pathname === '/contact' ? "text-blue-500" : ""}>Contact Us</Link>
          </div>
          <a href="#" className="text-[#8441F1]" onClick={handleAnchorClick}>Sign In</a>
        </div>

        {/* Hamburger Menu (Visible only below 1024px) */}
        <AlignJustify className="lg:hidden" size={18} color="#8441F1" onClick={toggleMenu} />
      </div>

      {/* Sliding Menu (Only for screens below 1024px) */}
      <div className={`fixed top-0 right-0 w-[75vw] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="p-4">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <img src={logoText} alt="logo-text" />
          </div>
        </div>
        <div className="flex flex-col items-start p-4 space-y-4 text-lg font-semibold">
          <Link to="/" className={pathname === '/' ? "text-blue-500" : ""} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/Enterprises" className={pathname === '/Enterprises' ? "text-blue-500" : ""} onClick={() => setMenuOpen(false)}>Enterprises & Team</Link>
          <Link to="/Artist" className={pathname === '/Artist' ? "text-blue-500" : ""} onClick={() => setMenuOpen(false)}>Artist Work</Link>
          <Link to="/shop" className={pathname === '/shop' ? "text-blue-500" : ""} onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" className={pathname === '/about' ? "text-blue-500" : ""} onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className={pathname === '/contact' ? "text-blue-500" : ""} onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <a href="#" className="text-[#8441F1]" onClick={handleAnchorClick}>Sign In</a>
        </div>
      </div>

      {/* Background Overlay (Closes menu when clicked) */}
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}

      {/* Sign In Modal */}
      <SignIn isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Navbar;
