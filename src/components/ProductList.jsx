import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cart from './Cart';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
const [addedMessage, setAddedMessage] = useState(''); 
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  
  };
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setLoading(false);
    };
    fetchProducts();
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
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {

      const updatedCart = [...cart, { ...itemAaya, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    setAddedMessage('Added Successfully 😊');
    setTimeout(() => {
      setAddedMessage('');
    },500);
    
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const [myStyle,setmyStyle] = useState(()=>{
    const savedTheme = localStorage.getItem('theme')
    if(savedTheme === 'dark'){
      return {
        color: 'white',
        backgroundColor: 'black',
        border: '1px solid white',
      };
    } return {
      color: 'black',
      backgroundColor: 'white',
      border: 'none',
    };
  })
  const [btnText, setbtnText] = useState(()=>{
  return localStorage.getItem('theme')==='dark' ? 'Enable Light Mode' : 'Enable Dark Mode'
  })

  let toggleStyle =()=>{
    if(myStyle.color === 'white'){
      setmyStyle({
        color:'black',
        backgroundColor:'white',
        border: 'none'
      })
      setbtnText('Enable Dark Mode');
      localStorage.setItem('theme','light')
    } else{
        setmyStyle({
          color:'white',
          backgroundColor:'black',
          border: '1px solid white'
        })
        setbtnText('Enable Light Mode');
        localStorage.setItem('theme','dark')
    }
  }

  if (loading) {
    return (
      <div className="spinner flex flex-col">
        <div className="loader"></div>
        <p style={{ marginTop: '10px', fontSize: '18px', color: '#333333' }}>
          Loading products...
        </p>
      </div>
    );
  } else {
    return (
      <div style={myStyle} className="w-full min-h-screen bg-gray-200 p-5">
        <div id='res' className='flex items-center justify-between p-2'>
          <h1 id='responsive1' className="text-2xl font-bold text-center mb-5">Product List <i className='ri-arrow-right-line'></i></h1>
          <input id='responsive2' 
            value={inputValue} 
            onChange={handleInputChange} 
            type='search' 
            className='p-2 rounded-lg text-amber-900 border-2 outline-none border-amber-200 focus:border-amber-600' 
            placeholder='Search by name'
          />
          <button id='responsive3' className='px-2 py-1 rounded-md bg-green-800 text-white' onClick={toggleStyle}>{btnText}</button>
        </div>
        <div className="flex flex-wrap justify-evenly pt-8 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} style={myStyle} className="card flex flex-col justify-center items-center bg-white shadow-md w-[30vw] h-[50vh] gap-4 rounded-lg p-4">
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
                      View Details
                    </button>
                  </Link>
                  <button
                  
                    onClick={() => {
                      clickCart(product); 
                    }}
                    className="bg-blue-600 text-white active:scale-95 py-1 px-3 rounded hover:bg-blue-800 transition" >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default ProductList
