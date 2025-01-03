import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Feedback = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });


  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
 
  const handleSubmit = (e) => {
    e.preventDefault();
   
    setStatus('Submitting...');

    
    emailjs.sendForm('service_j5rdm6p', 'template_idf6yl4', e.target, 'zBq95BH7z1_2CrgID')
      .then(
        (result) => {
          console.log(result.text);  
            setStatus('Feedback sent successfully!');
        },
        (error) => {
          console.log(error.text);  
          setStatus('Failed to send feedback. Please try again.');  
        }
      );
    
    setFormData({ name: '', email: '', message: '' });
    setInterval(() => {
        window.location.reload()
    }, 3000);
  };

  return (
    <div className='w-full h-[87vh] bg-gray-100 flex justify-center items-center font-mono '>
      <div className=' bg-white border-2 border-gray-500 p-8'>
      <h2 id='head' className='text-center font-mono text-[2vw] mb-4'>Feedback Form 📝</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder='Enter Your Name'
            value={formData.name}
            onChange={handleChange}
            required
            className='px-4 py-2 border-2 rounded-lg w-full mb-2'
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            className='px-4 py-2 border-2 w-full rounded-lg mb-2'
            placeholder='Enter Your E-mail'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          
          <textarea
            rows="7"
            name="message"
            placeholder='Enter Your Message'
            className='px-4 py-2 border-2 w-full rounded-lg mb-2'
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className='flex justify-center items-center'><button className='bg-amber-500 text-white px-12 py-2 rounded-lg' type="submit">Submit</button></div>
      </form>

     
     {status ? <h1 id='head2' className='mt-4 text-center text-green-600 text-[1.2vw]'>{status}✅ </h1>: null}
      </div>
    </div>
  );
};

export default Feedback;
