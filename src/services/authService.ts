
import axios from 'axios';
import config from '../config';
import User from '../models/user'
import { 
  register as registerApi,
  login as loginApi

} from "../api/myJobBoard/authentication/authenticationApi"
import Token from '../models/authentication/Token';

interface LoginData {
  mail: string;
  password: string;
}

interface RegisterData {
  mail: string;
  password: string;
  tel: string;
}

const login = async (data: LoginData): Promise<Token> => {
  try {
    const response = await loginApi(data.mail, data.password);

    return response;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  localStorage.removeItem('user'); 
};

const register = async (registerData: RegisterData): Promise<void> => {
    return await registerApi(registerData.mail, registerData.password);
}

export default {
  login,
  logout,
  register
};
