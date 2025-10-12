import type { RegisterITF, LoginITF } from "../types/LoginRegister";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function Register({ name, email, password }: RegisterITF) {
  try {
    const register = await axios.post(`${BASE_URL}/api/register`, {
      name,
      email,
      password,
    });

    const response = register.data
    
    return {
      message: response.message,
      data: response.data,
    };
  } catch (err) {
    console.error(err);
  }
}

export async function Login({ email, password }: LoginITF) {
  try {
    const login = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    });

    const response = login.data
    
    return {
      message: response.message,
      data: response.data,
    };
  } catch (err) {
    console.error(err);
  }
}
