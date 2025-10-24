// import { data } from "react-router-dom";
import type { RegisterITF, LoginITF } from "../types/LoginRegister";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function Register({ name, email, password }: RegisterITF) {
  try {
    const register = await axios.post(`${BASE_URL}/register`, {
      name,
      email,
      password,
    });

    const response = register.data;
    // console.log("this is response",response.data)

    return {
      message: response.message,
      data: response.data,
      status: 201,
    };
  } catch (err) {
    console.log(err)
    return {
      message: err.response.data.message,
      status: 409,
    };
  }
}

export async function Login({ email, password }: LoginITF) {
  try {
    const login = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    }, {
      withCredentials: true
    });

    const response = login.data;

    return {
      message: response.message,
      data: response.data,
      status: 200,
    };
  } catch (err) {
    console.error(err.response.data.message);
    return {
      data: null,
      message: err.response.data.message,
      status: 404,
    };
  }
}

export async function getUsers() {
  try {
    const users = await axios.get(`${BASE_URL}/users`, {
      withCredentials: true
    });

    const response = users.data;
    return {
      data: response.data,
      // message: 
      status: 200
    }
  } catch (err) {
    console.error(err.response.data.message);
    return {
      data: null,
      message: err.response.data.message,
      status: 403,
    };
  }
}
