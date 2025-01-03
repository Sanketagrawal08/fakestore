import React, { useEffect, useState } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
  
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved);
  }, []);

  return (
    <div className='flex flex-col'>
     <div className='bg-gray-100'> <h1 className='px-8 mt-4 text-[2vw]'>Your Wishlist ❤️</h1> </div> 
      <div className='bg-gray-50 '>
      {wishlist.length > 0 ? (
        wishlist.map((item, i) => (
          <div key={i} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
            <p><strong>{item.title}</strong></p>
            <p>Price: ${item.price}</p>
            <img src={item.image} alt={item.title} style={{ width: "100px" }} />
          </div>
        ))
      ) : (
        <p>No items in your wishlist</p>
      )}
      </div>
    </div>
  );
};

export default Wishlist;
