import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'
import Wishlist from './Wishlist'

const Navbar = (cart) => {

  return (
    <div className="nav flex justify-between items-center bg-[#333333] text-white p-6 shadow-lg ">
      <h1 className="text-3xl font-bold text-[#FFBF00]"> <i className='ri-reactjs-fill text-blue-500'></i> Cart-Zone </h1> 
      <div className="flex gap-10">
        <Link to="/" className="text-lg font-medium hover:text-[#FFBF00] transition-colors">All Products</Link>
        <Link to="/wishlist" className="text-lg font-medium hover:text-[#FFBF00] transition-colors cursor-pointer"> <span><i className='ri-heart-line hover:text-red-500'></i></span> Wishlist</Link>
        <Link to="/cart" className="flex items-center gap-2 text-lg font-medium hover:text-[#FFBF00] transition-colors">
          🛒 Cart
        </Link>
      </div>
      
    </div>
    
  );

}

export default Navbar