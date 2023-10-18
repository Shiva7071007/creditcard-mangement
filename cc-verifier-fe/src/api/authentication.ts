import axios from "axios"
import { urlEndpoint } from "./../config/config.json"
import { AuthResponse } from "../interfaces/auth.interface";


export const signup = async (email: string, password: string) => {
  const response = await axios.post(`${urlEndpoint}/signup`, {
    email,
    password,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data as AuthResponse
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${urlEndpoint}/login`, {
    "email": email,
    "password": password
  }, { withCredentials: true })
  return response.data as AuthResponse
}

export const logout = async () => {
  try {
    return await axios.post(`${urlEndpoint}/logout`, {}, { withCredentials: true })
  } catch (error) {
    console.log(error);
  }

}