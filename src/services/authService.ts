
import axios from 'axios';
import config from '../config';
import User from '../models/user'

interface LoginData {
  username: string;
  password: string;
}

const login = async (data: LoginData): Promise<{user:User; token: string}> => {
  try {
    /*
    const response = await axios.post(`${config.apiUrl}/login`, data);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data)); 
    }
   
    return response.data;
     */
    const mockedUser: User = {id: "1", name: "toto"};
    if(data.username !== "test"  || data.password != "test" ) throw new Error("Invalid credentials");
        localStorage.setItem('currentUser', JSON.stringify(mockedUser))
    return {user:mockedUser, token: "abcd" };
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user'); 
};

export default {
  login,
  logout,
};
