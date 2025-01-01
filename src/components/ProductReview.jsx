import React, { useState, useEffect } from 'react';

const ProductReviews = ({ productId }) => {

  const [reviews, setReviews] = useState([]); 
  const [newReview, setNewReview] = useState(''); 
  const [rating, setRating] = useState();
  const [username, setUsername] = useState('')

  
  useEffect(() => {
    // Simulate fetching reviews for the product
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
    setReviews(storedReviews);
  }, [productId]);

  // Handle submitting a new review
  const handleSubmitReview = () => {
    if (!newReview || !rating || !username) return alert('Please enter a review , rating and your name');

    const reviewDate = new Date();

    const dateString = reviewDate.toLocaleString('en-US',{weekday: 'long', year: 'numeric', month: 'long',day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'})
   

    const updatedReviews = [
      ...reviews,
      { text: newReview, rating ,username,date: dateString}
    ];

    setReviews(updatedReviews); // Update state
    setNewReview(''); // Reset input
    setRating(''); // Reset rating
    setUsername('')

    // Store reviews in local storage for persistence
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updatedReviews));
  };
  

  return (
  
    <div id='kuch4' className='w-[30vw]  bg-white border-2 border-gray-300 p-6 max-w-2xl gap-2 mx-auto shadow-lg'>
  <h3 className='text-center font-mono text-2xl text-gray-700 mb-4'>Reviews 📝</h3>

  <div className='border-t-2 border-b-2 border-gray-200 py-4'>
    <h4 className='text-center text-lg text-gray-800 font-semibold mb-4'>✏️ Add a Review</h4>

    {/* Username input */}
    <input 
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter your name"
      className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
    />

    {/* Review textarea */}
    <textarea
      placeholder="Write your review here"
      value={newReview}
      onChange={(e) => setNewReview(e.target.value)}
      rows="4"
      className="w-full p-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
    />

    
    <div className="mb-4">
      <label htmlFor="rating" className="block text-gray-600 mb-2">Rating:</label>
      <input
        id="rating"
        className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        type="number"
        placeholder="1-5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="5"
      />
    </div>

    <button
      className='w-full bg-amber-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-amber-500 transition-colors'
      onClick={handleSubmitReview}
    >
      Submit Review
    </button>
  </div>


  <div className='mt-8'>
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div key={review.id} className="border-b-2 bg-[#eeeeee] p-2 border-gray-200 py-4 shadow-lg">
          <h1 className="text-gray-800 font-bold"><span className='font-semibold text-gray-700'>Name:</span> {review.username}</h1>
          <p className="text-gray-700 mb-2">{review.text}</p>
          <span className="text-yellow-500">Rating: {review.rating} ⭐</span>
          <p className='text-sm text-black font-medium '><span className='font-normal text-gray-500'>Submitted on:</span> {review.date}</p>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600">No reviews yet. Be the first to leave one!</p>
    )}
  </div>
</div>

  
  );
};

export default ProductReviews;
