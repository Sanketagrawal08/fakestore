import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  // State for managing cartttt
  const [cart, setCart] = useState(() => {
    
    const savedCart = localStorage.getItem("cart");
    if(savedCart){
      return JSON.parse(savedCart)
    }
     return  []
  });  
  
  const increaseQuantity = (item) =>{
        const updatedCart = cart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {...cartItem, quantity : cartItem.quantity + 1}
          }else{
            return cartItem
          }
        })
        setCart(updatedCart)
        localStorage.setItem("cart",JSON.stringify(updatedCart))
  }


  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCart(updatedCart); // Update state
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    }
  };


  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2); //  to 2 decimal places
  };

  const deleteHandler = (itemToDelete) => {
    const updatedCart = cart.filter((item) => item.id !== itemToDelete.id);
    setCart(updatedCart); // Update state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };


  const clearHandler = () => {
    setCart([]); // Clear cart state
    localStorage.removeItem("cart"); // Remove cart from localStorage
  };

  
  if (cart.length === 0) {
    return (
      <div className="w-full min-h-screen overflow-y-auto pt-36 bg-gray-100 p-5 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-5">Your Cart is Empty</h1>
        <Link
          to="/"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
        >
          Go Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">
      <div id="kuchtoh" className="flex items-center justify-evenly">
        <h1 id="kuchtoh2" className="text-2xl font-bold text-center mb-5">
          Your Cart 🛒
        </h1>
        <button
          onClick={clearHandler}
          className="bg-[crimson] text-white px-2 py-1 rounded-lg active:scale-105"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6 w-3/4 mx-auto">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-gray-200 shadow-md rounded-lg p-4"
          >
            <img
              className="w-24 h-24 object-contain rounded-lg mr-4"
              src={item.image}
              alt={item.title}
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                ${item.price} x {item.quantity}
              </p>
              <div className="flex items-center space-x-2">
                <div>
                  <i
                    onClick={() => increaseQuantity(item)}
                    className="ri-add-line bg-slate-300 p-1 hover:bg-slate-400 rounded-full"
                  ></i>
                </div>
                <div>
                  {" "}
                  <h1 className="font-bold">{item.quantity}</h1>{" "}
                </div>
                <div>
                  <i
                    onClick={() => decreaseQuantity(item)}
                    className="ri-subtract-line bg-slate-300 p-1 hover:bg-slate-400 rounded-full"
                  ></i>
                </div>
              </div>
              <button
                onClick={() => deleteHandler(item)}
                className="flex gap-1"
              >
                <i className="ri-delete-bin-fill text-red-600"></i> Remove
              </button>
            </div>
          </div>
        ))}

        <div className="text-right mt-4 fixed bottom-0 right-0 bg-gray-300 p-4">
          <h2 className="text-lg font-bold">
            {" "}
            💲 {calculateTotal()} <span className="text-[1vw] kuch3">only</span>
          </h2>
        </div>

        <a href="/" className="fixed bottom-0 left-0">
          <button className="bg-green-600 text-white p-4 font-bold hover:bg-green-800 transition mt-5">
            Continue Shopping
          </button>
        </a>
      </div>
    </div>
  );
};

export default Cart;
