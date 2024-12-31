import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-screen overflow-y-auto pt-36 bg-gray-100 p-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-5">Your Cart is Empty</h1>
        <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition">
          Go Back to Products
        </Link>
      </div>
    );
  }

  const calculateTotal = () =>{
    let total = 0;
    cart.forEach(item => {
      total = total + item.price
    });
    return total.toFixed(2);
  }

  const deleteHandler =(itemaayafordelete) =>{
    const updatedCart = cart.filter((item) => item.id != itemaayafordelete.id)
    localStorage.setItem('cart',JSON.stringify(updatedCart))
    window.location.reload();
  }
  const clearHandler = () =>{
    localStorage.removeItem('cart')
    window.location.reload()
  } 
 
  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">
      <div className='flex items-center justify-evenly'>
      <h1 className="text-2xl font-bold text-center mb-5">Your Cart</h1>
      <button onClick={clearHandler} className='bg-[crimson] text-white px-2 py-1 rounded-lg active:scale-105'>Clear All</button>
      </div>
      <div className="space-y-6 w-3/4 mx-auto">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center bg-gray-200 shadow-md rounded-lg p-4">
            <img
              className="w-24 h-24 object-contain rounded-lg mr-4"
              src={item.image}
              alt={item.title}
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-2">${item.price}</p>
              <button onClick={()=>{
                deleteHandler(item);
              }} className='flex gap-1'><i className='ri-delete-bin-fill  text-red-600'></i> Remove</button>
            </div>
          </div>
        ))}
        <div className="text-right mt-4 fixed bottom-0 right-0 bg-gray-300 p-4">
          <h2 className="text-lg font-bold">Total: ${calculateTotal()}</h2>
        </div>
        <a href="/" className='fixed bottom-0 left-0'>
          <button className="bg-green-600 text-white p-4 font-bold hover:bg-green-800 transition mt-5">
            Continue Shopping
          </button>
        </a>
      </div>
    </div>
  );
};

export default Cart;