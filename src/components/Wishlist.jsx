import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Wishlist = () => {
  
  
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
  
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved);

  }, []);

  const removeHandler = (itemID)=>{
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updated = saved.filter(item => item.id !== itemID)
    localStorage.setItem('wishlist',JSON.stringify(updated))
    setWishlist(updated)
    alert("item removed")
  }

  
  return (
    <div className='flex flex-col px-4'>
     <div id='for' className='flex items-center justify-between border-b-2 border-gray-500 py-4'> 
      <h1 id='ehading' className='px-8 mt-4 text-[1.8vw]  font-mono'>Your Wishlist ❤️</h1>
      <Link to="/">  <i className='cut ri-close-line text-[2.4vw] p-2 cursor-pointer'></i> </Link>
       </div> 
      <div className=''>
      {wishlist.length > 0 ? (
        wishlist.map((item, i) => (
          <div key={i} className=''>
           <div className='gap-4 px-12 py-6 flex items-center'>
           <div>
            <img src={item.image} alt={item.title} style={{ width: "100px" }} />
            </div>
            <div className=''>
            <p className='pt-2 pb-1'><strong>{item.title}</strong></p>
            <p>Price: ${item.price}</p>
            <button onClick={()=>{
              removeHandler(item.id)
            }} className='bg-red-500 text-white px-2 rounded-full mt-3'>Remove</button>
            </div>
           </div>
          </div>
        ))
      ) : (
        <div className='flex flex-col justify-center items-center gap-4'>
          <p className='text-center mt-[15%] bg-white'>No items in your wishlist</p>
        <Link to="/" className='bg-amber-600 text-white px-2 py-1 rounded-lg' >Go back to Products</Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default Wishlist;
