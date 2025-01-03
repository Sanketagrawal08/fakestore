import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the menu visibility on mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu=()=>{
    setMenuOpen(false)
  }

  return (
    <div className="nav flex justify-between items-center bg-[#333333] text-white p-6 shadow-lg">
      <div className="flex gap-24">
        <div>
          <h1 className="text-3xl font-bold text-[#FFBF00]">Cart-Zone</h1>
        </div>

        <div className="lg:hidden" onClick={toggleMenu}>
          <i className="ri-menu-line text-3xl cursor-pointer"></i>
        </div>
      </div>

      <div className="hidden lg:flex gap-10">
        <Link to="/" className="text-lg font-medium hover:text-[#FFBF00] transition-colors">All Products</Link>
        <Link to="/wishlist" className="text-lg font-medium hover:text-[#FFBF00] transition-colors cursor-pointer">
          <span><i className="ri-heart-line hover:text-red-500"></i></span> Wishlist
        </Link>
        <Link to="/cart" className="flex items-center gap-2 text-lg font-medium hover:text-[#FFBF00] transition-colors">
          🛒 Cart
        </Link>
        <Link to="/feedback" className="text-lg text-white bg-[#007BFF] px-2 rounded-lg">Submit Your Feedback</Link>
      </div>

      <div className={`${menuOpen ? 'flex' : 'hidden'} lg:hidden flex-col mt-4 items-start w-full p-4`}>
        
        <Link to="/" className="text-[5vw] font-medium hover:text-[#FFBF00] transition-colors p-2  py-4" onClick={closeMenu}>All Products</Link>
        <Link to="/wishlist" className="text-[5vw] font-medium hover:text-[#FFBF00] transition-colors p-2  py-4 cursor-pointer" onClick={closeMenu}>
          <span><i className="ri-heart-line hover:text-red-500"></i></span> Wishlist
        </Link>
        <Link to="/cart" className="flex items-center gap-2 text-[5vw] font-medium hover:text-[#FFBF00] p-2 py-4 transition-colors" onClick={closeMenu}>
          🛒 Cart
        </Link>
        <Link to="/feedback" className="text-lg bg-[#dee3e8] text-black px-6 py-2 rounded-lg mt-4" onClick={closeMenu}>Submit Your Feedback</Link>
      </div>
    </div>
  );
};

export default Navbar;
