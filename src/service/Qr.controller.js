import axios from 'axios';


const url = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: url,
});

export const createUserQr = async (userData) => {
    try {
      const response = await axiosInstance.post(
        '/api/user',
        userData,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const getUserById = async (Id) => {
    try {
      const response = await axiosInstance.get(`/api/user/${Id}`);
      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error_message: 'Error al obtener información del usuario.' };
      }
    } catch (error) {
      console.error('Error al obtener información del usuario:', error);
      return { success: false, error_message: 'Error de red o servidor.' };
    }
  };

  export const createMessage = async (userId, messageData) => {
    try {
      const response = await axiosInstance.post(`/api/message/:userId=${userId}`, messageData);
      return response.data;
    } catch (error) {
      return error;
    }
  };