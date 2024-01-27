import axios from 'axios';
import config from "../../config";

const apiClient = axios.create({
  baseURL: config.apiUrl
});

export default apiClient;
