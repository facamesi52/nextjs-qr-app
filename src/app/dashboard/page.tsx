'use client'
import { useEffect, useState } from "react";
import { QRCode } from "react-qrcode";
import './dashboard.css'
import { UserButton, useUser } from "@clerk/nextjs";
import { createUserQr, getUserById } from '../../service/Qr.controller';

type Message = {
  messageText: string;
  emailMessage: string;
};

const DashboardPage = () => {
  const { user } = useUser();
  const id = user?.id;
  const userName = user?.username;
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Estado para almacenar los mensajes
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const checkAndCreateUser = async () => {
      // Verificar si el usuario ya existe
      const existingUser = await getUserById(id);

      if (!existingUser) {
        // Si el usuario no existe, crearlo
        const userData = {
          id,
          email: userEmail,
          userName,
        };

        try {
          // Enviar la solicitud para crear el usuario
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
      } else {
        console.log('El usuario ya existe:', existingUser.data?.data?.messages);

        // Asegurarse de que existingUser.data?.data?.messages sea un arreglo
        if (Array.isArray(existingUser.data?.data?.messages)) {
          // Aquí puedes guardar los mensajes en el estado
          setMessages(existingUser.data.data.messages);
        }
        // Aquí puedes realizar cualquier acción adicional si el usuario ya existe
      }
    };

    // Llamar a la función de verificación y creación de usuario cuando se monte el componente
    checkAndCreateUser();
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
        value={`/contact/${id}`}
        size={400}
        scale={10}
      />
      <h4>You can print this QR so people can contact you. This QR is unique</h4>
      <br />
  
      {/* Aplica estilos específicos para la tabla */}
      <div className="messages">
        {messages.length > 0 ? (
          <table className="tabla-mensajes">
            <thead>
              <tr>
                <th>Message</th>
                <th>Sent by</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index}>
                  <td>{message.messageText}</td>
                  <td>{message.emailMessage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay mensajes.</p>
        )}
      </div>
    </div>
  )
}

export default DashboardPage;