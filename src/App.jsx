import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Feedback from "./components/Feedback";


const App = () => {
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/wishlist" element={<Wishlist  />} />
        <Route path="/feedback" element={<Feedback />}></Route>

      </Routes>
    </div>
  );
};

export default App;
