import type { RegisterITF, LoginITF } from "../types/LoginRegister";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function Register({ username, email, password }: RegisterITF) {
  try {
    const register = await axios.post(`${BASE_URL}/register`, {
      name: username,
      email,
      password,
    });

    return {
      message: register.data.message,
      data: register.data.data,
    };
  } catch (err) {
    console.error(err);
  }
}

export async function Login({ email, password }: LoginITF) {
  try {
    const login = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    return {
      message: login.data.message,
      data: login.data.data,
    };
  } catch (err) {
    console.error(err);
  }
}
