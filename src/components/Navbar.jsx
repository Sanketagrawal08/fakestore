import React from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'
const Navbar = (cart) => {

  return (
    <div className="nav flex justify-between items-center bg-[#333333] text-white p-6 shadow-lg ">
      <h1 className="text-3xl font-bold text-[#FFBF00]"> <i className='ri-reactjs-fill text-white'></i> E-commerce</h1>  {/* Golden color for brand text */}
      <div className="flex gap-10">
        <Link to="/" className="text-lg font-medium hover:text-[#FFBF00] transition-colors">All Products</Link>
        <h4 className="text-lg font-medium hover:text-[#FFBF00] transition-colors cursor-pointer">About</h4>
        <Link to="/cart" className="flex items-center gap-2 text-lg font-medium hover:text-[#FFBF00] transition-colors">
          <i className="ri-shopping-cart-fill text-amber-500"></i> Cart
        </Link>
      </div>
    </div>
  );

}

export default Navbar