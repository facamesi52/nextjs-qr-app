"use client"
import React from 'react'
import { useState } from 'react'
import { createMessage } from '../../service/Qr.controller'
import './contact.css'
type FormData = {
  nameMessage: string;
  message: string;
}
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nameMessage: '',
    message:'',
  })
  const { nameMessage, message } = formData;
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('userId');
  console.log('este es el id que encuentro en la url', id)
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };
  const handleSubmit = async (event:React.FormEvent) =>{
    event.preventDefault();
    const newMessage = {
      ...formData,
    }
    try {
      if (id) {
        // Pasa el userId a la función createMessage
        let response = await createMessage(id, newMessage);
        setFormData({
          nameMessage: '',
          message: '',
        });
        console.log('Mensaje creado con éxito:', response);
      } else {
        console.error('No se encontró userId en la consulta.');
      }
    } catch (error) {
      console.error('Error al crear el mensaje:', error);
    }
  };
  return (
    <div>
      <div className='imageIconContact'>
      <img className='iconoImage'src="https://res.cloudinary.com/drnclewqh/image/upload/v1695414968/hotelImages/uaomixpdynmpysmjvnqf.png" alt="icono"/>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Provide Your Information</h2>
      <div className="mb-4">
        <br />
        <label htmlFor="nameMessage" className="block text-sm font-medium text-gray-800">
          Contact <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="nameMessage"
          name="nameMessage"
          value={nameMessage}
          onChange={handleInputChange}
          placeholder="Write a way for me to contact you"
          className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <br />
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-800">
        Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleInputChange}
          rows={4}
          placeholder="Write a message describing the situation please"
          className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <br />
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