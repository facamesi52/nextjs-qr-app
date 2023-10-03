'use client'
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode";
import './dashboard.css'
import { UserButton, useUser } from "@clerk/nextjs";
import { createUserQr, getUserById } from '../../service/Qr.controller';

type Message = {
  messageText: string;
  emailMessage: string;
  updatedAt: string;
};

const DashboardPage = () => {
  const { user } = useUser();
  const id = user?.id;
  const userName = user?.username;
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Estado para almacenar los mensajes
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchUserDataAndMessages = async () => {
      // No es necesario verificar si el usuario existe o no, simplemente crea el usuario
      const userData = {
        id,
        email: userEmail,
        userName,
      };

      try {
        // Enviar la solicitud para crear el usuario (sin verificar si existe)
        const result = await createUserQr(userData);

        if (result.success) {
          console.log('Usuario creado con éxito:', result.data);
          // Aquí puedes realizar cualquier acción adicional, como mostrar un mensaje de éxito
        } else {
          console.error('Error al crear el usuario:', result.error_message);
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        // Manejar errores de red u otros errores inesperados
      }

      // Obtener los mensajes del usuario por su id
      const userMessages = await getUserById(id);

      // Asegurarse de que userMessages.data?.data?.messages sea un arreglo
      if (Array.isArray(userMessages.data?.data?.messages)) {
        // Aquí puedes guardar los mensajes en el estado
        setMessages(userMessages.data.data.messages);
      }
    };

    // Llamar a la función para obtener mensajes cuando se monte el componente
    fetchUserDataAndMessages();
  }, [id, userName, userEmail]);

  return (
    <div className="contenedorDash">
      <div className="encabezadoDash">
        <div><h3>{`Welcome ${userName}`}</h3></div>
        <UserButton />
      </div>
      <br />
      <h2>Emergency QR</h2>
      <QRCode
        value={`${process.env.NEXT_PUBLIC_BASE_URL}/contact/${id}`}
        size={400}
        scale={10}
      />
      <h4>You can print this QR so people can contact you. This QR is unique</h4>
      <br />
          {/* Aplica estilos específicos para la tabla */}
      <div className='boxMessages'>
          {messages.length > 0 ? (
            messages.map((message, index) => (
            <div key={index} className="boxMessagesContenedor">
        <div className='profile'>
          <div className='profileImg'>
            <img src="https://res.cloudinary.com/drnclewqh/image/upload/v1696200872/hotelImages/iu2rcmrfwmgjn2gag6vx.png" alt="userImg" />
          </div>
          <div className='profileInfo'>
            <div className='profileInfoName'><b>{message?.emailMessage}</b></div>
            <div className='profileInfoMensagge'>{message?.messageText}</div>
          </div>
        </div>
        <div className='dateAndHour'>
          <div className='date'>{message?.updatedAt.slice(0, 10)}</div>
          <div className='hour'>{message?.updatedAt.slice(11, 13) + ":" + message?.updatedAt.slice(14, 16)}</div>
        </div>
        </div>
        ))
      ) : ( <p> no hay mensajes </p>)}
      </div>
    </div>
  )
}

export default DashboardPage;