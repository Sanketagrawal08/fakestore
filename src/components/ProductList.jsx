import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import Categories from "./Categories";
import SortDropdown from "./SortDropdown";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [addedMessage, setAddedMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const wishlistHandler=(item)=>{
    const itemtoSave = {
      id:item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    }
    
     const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

     const isAlreadyAdded = savedWishlist.some(wishItem => wishItem.id === item.id)
     
     if (isAlreadyAdded) {
      alert("Item Already Added")
     } else{
      const updatedWishlist = [...savedWishlist,itemtoSave]
      localStorage.setItem('wishlist',JSON.stringify(updatedWishlist));
      alert("Added To Wishlist");
     }

  }

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [];
  });

  useEffect(() => {
    const fetchProductsandCategories = async () => {
      const [response, categoriesResponse] = await Promise.all([
        axios.get("https://fakestoreapi.com/products"),
        axios.get("https://fakestoreapi.com/products/categories"),
      ]);

      setProducts(response.data);
      setCategories(categoriesResponse.data);
      setLoading(false);
    };
    fetchProductsandCategories();
  }, []);

  const clickCart = (itemAaya) => {
    const existingItem = cart.find((item) => item.id === itemAaya.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === itemAaya.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...itemAaya, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setAddedMessage("Added Successfully 😊");
    setTimeout(() => {
      setAddedMessage("");
    }, 500);
  };

  const filteredProducts = products.filter((product) => {
    let matchesCategory = true;
    if (selectedCategory) {
      matchesCategory = product.category === selectedCategory;
    }

    const matchesSearch = product.title
      .toLowerCase()
      .includes(inputValue.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "high-to-low") {
      return b.price - a.price;
    } else if (sortOption === "low-to-high") {
      return a.price - b.price; // Sort ascending
    } else if (sortOption === "popular") {
      return b.price - a.price;
    }
    return 0;
  });

  const [myStyle, setmyStyle] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      return {
        color: "white",
        backgroundColor: "black",
        border: "1px solid white",
      };
    }
    return {
      color: "black",
      backgroundColor: "white",
      border: "none",
    };
  });
  const [btnText, setbtnText] = useState(() => {
    return localStorage.getItem("theme") === "dark"
      ? "Enable Light Mode"
      : "Enable Dark Mode";
  });

  let toggleStyle = () => {
    if (myStyle.color === "white") {
      setmyStyle({
        color: "black",
        backgroundColor: "white",
        border: "none",
      });
      setbtnText("Enable Dark Mode");
      localStorage.setItem("theme", "light");
    } else {
      setmyStyle({
        color: "white",
        backgroundColor: "black",
        border: "1px solid white",
      });
      setbtnText("Enable Light Mode");
      localStorage.setItem("theme", "dark");
    }
  };

  if (loading) {
    return (
      <div className="spinner flex flex-col">
        <div className="loader"></div>
        <p style={{ marginTop: "10px", fontSize: "18px", color: "#333333" }}>
          Loading products...
        </p>
      </div>
    );
  } else {
    return (
      <div style={myStyle} className="w-full min-h-screen bg-gray-200 p-5">
        <div id="res" className="flex items-center justify-evenly p-2">
          <div className="flex items-center gap-2 p-2 px-3 rounded-lg text-amber-900 border-2 outline-none border-gray-400 focus-within:border-amber-600">
            <i className="ri-search-line text-gray-500 hover:text-amber-600 cursor-pointer"></i>
            <input
              id="searchInput"
              value={inputValue}
              onChange={handleInputChange}
              type="search"
              placeholder="Search by name"
              className="flex-1 bg-transparent outline-none"
              aria-label="Search for products by name"
            />
          </div>
          <button
            id="responsive3"
            className="px-3 p-2 rounded bg-green-600 hover:bg-green-700 text-white"
            onClick={toggleStyle}
          >
            {btnText}
          </button>
        </div>
        <div className="flex flex-col flex-wrap border-t-2 pt-10 border-amber-800 ">
          <div id="nice" className="flex justify-evenly items-center">
            <Categories
              myStyle={myStyle}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            <SortDropdown 
              myStyle={myStyle}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          </div>
          <div className="flex flex-wrap justify-evenly gap-y-16 pt-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={myStyle}
                className="card flex flex-col justify-center items-center bg-white shadow-md w-[30vw] h-[50vh] gap-4 rounded-lg p-4"
              >
                <div className="flex justify-between items-end  w-full px-2">
                  <div><i onClick={()=>{
                    wishlistHandler(product)
                  }} className="ri-heart-line cursor-pointer text-2xl text-red-600"></i></div>
                  <div><Link
                    to="/cart"
                    className=" rounded-full p-1 border-2 border-zinc-200"
                  >
                    🛒
                  </Link></div>
                </div>
                <img
                  className="w-36 h-36 object-contain rounded-lg"
                  src={product.image}
                  alt={product.title}
                />
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">${product.price}</p>
                  <div className="flex gap-2">
                    <Link to={`/product/${product.id}`}>
                      <button className="bg-amber-600 text-white py-1 px-3 rounded hover:bg-amber-700 transition active:scale-95">
                        View More
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        clickCart(product);
                      }}
                      className="bg-blue-600 text-white active:scale-95 py-1 px-3 rounded hover:bg-blue-800 transition"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {addedMessage ? (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded">
            {addedMessage}
          </div>
        ) : null}
      </div>
    );
  }
};

export default ProductList;
