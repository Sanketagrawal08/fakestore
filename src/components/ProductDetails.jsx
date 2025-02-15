import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductReviews from "./ProductReview";
import Wishlist from "./Wishlist";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner flex flex-col">
        <div className="loader"></div>
        <p style={{ marginTop: "10px", fontSize: "18px", color: "#555" }}>
          Loading Details
        </p>
      </div>
    );
  } else {
    return (
      <div id="col" className="flex gap-4 justify-center p-4">
        <div id="krke" className="flex justify-evenly w-[50vw]">
          <div className="carddetails flex flex-col p-2 border-2 border-yellow-950">
            <div className="flex justify-start items-start">
              <Link to="/">
                <i className="cuticon ri-close-line text-black text-[2vw] active:scale-90 hover:text-gray-500"></i>
              </Link>
            </div>
            <div
              id="gap"
              className="flex flex-col items-center justify-center gap-3"
            >
              <img
                className="w-[17vw]"
                src={product.image}
                alt={product.title}
              />
              <h1 id="title" className="text-2xl">
                {product.title}
              </h1>
              <p id="des" className="text-[1vw] text-center text-gray-600">
                {product.description}
              </p>
              <p className="font-semibold">
                <span className="text-gray-800">Price:</span> ${product.price}
              </p>
              <p>Category: {product.category}</p>
            </div>
          </div>
        </div>
        <div>
          <ProductReviews productId={product.id} />
          
        </div>
      </div>
    );
  }
};

export default ProductDetails;
