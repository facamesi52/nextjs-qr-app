"use client"
import React from 'react'
import { useState } from 'react'
import './contact.css'
const Contact = () => {
  const [formData, setFormData] = useState({
    nameMessage: 'anonymous',
    message:'',
  })
  const { nameMessage, message } = formData;
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };
  const handleSubmit = (event:any) =>{
    event.preventDefault();
  }
  return (
    <div>
      <div className='imageIconContact'>
      <img className='iconoImage'src="https://res.cloudinary.com/drnclewqh/image/upload/v1695414968/hotelImages/uaomixpdynmpysmjvnqf.png" alt="icono"/>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Provide Your Information</h2>
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-800">
          Name <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nameMessage}
          onChange={handleInputChange}
          placeholder="Write your name"
          className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-800">
        Message
        </label>
        <textarea
          id="bio"
          name="bio"
          value={message}
          onChange={handleInputChange}
          rows={4}
          placeholder="Write a message describing the situation please"
          className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </div>
    </div>
      </form>
    </div>
  )
}

export default Contact