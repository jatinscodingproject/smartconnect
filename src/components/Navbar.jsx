import React, { useState } from 'react';
import logo from '../assets/logo 1.svg';
import logoText from '../assets/Smart Connections.svg';
import { AlignJustify, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SignIn from './signin';
import SignUp from './signup';
import { getItem } from '../utils/getItem';

function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const openSignIn = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false); 
    setMenuOpen(false);
  };

  const openSignUp = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
    setMenuOpen(false);
  };

  const closeModals = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  };

  const handleAnchorClick = (e) => {
    const token = getItem('token');
    if (token) {
      e.preventDefault();
      openSignIn();
    } else {
      openSignIn();
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
        <AlignJustify className="lg:hidden cursor-pointer" size={24} color="#8441F1" onClick={toggleMenu} />
      </div>

      {/* Sliding Mobile Menu */}
      <div className={`fixed top-0 right-0 w-[75vw] h-full bg-white shadow-lg z-50 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <img src={logoText} alt="logo-text" />
          </div>
          <X className="cursor-pointer" size={24} color="#000" onClick={toggleMenu} />
        </div>
        <div className="flex flex-col items-start p-4 space-y-4 text-lg font-semibold">
          <Link to="/" className={pathname === '/' ? "text-blue-500" : ""} onClick={toggleMenu}>Home</Link>
          <Link to="/Enterprises" className={pathname === '/Enterprises' ? "text-blue-500" : ""} onClick={toggleMenu}>Enterprises & Team</Link>
          <Link to="/Artist" className={pathname === '/Artist' ? "text-blue-500" : ""} onClick={toggleMenu}>Artist Work</Link>
          <Link to="/shop" className={pathname === '/shop' ? "text-blue-500" : ""} onClick={toggleMenu}>Shop</Link>
          <Link to="/about" className={pathname === '/about' ? "text-blue-500" : ""} onClick={toggleMenu}>About Us</Link>
          <Link to="/contact" className={pathname === '/contact' ? "text-blue-500" : ""} onClick={toggleMenu}>Contact Us</Link>
          <a href="#" className="text-[#8441F1]" onClick={handleAnchorClick}>Sign In</a>
        </div>
      </div>

      {/* Background Overlay for Mobile Menu */}
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}

      {/* Sign In Modal */}
      {isSignInOpen && <SignIn isOpen={isSignInOpen} onClose={closeModals} onSignUpClick={openSignUp} />}

      {/* Sign Up Modal */}
      {isSignUpOpen && <SignUp isOpen={isSignUpOpen} onClose={closeModals} onSignInClick={openSignIn} />}
    </div>
  );
}

export default Navbar;
