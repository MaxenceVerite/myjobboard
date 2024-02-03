import axios from 'axios';
import config from "../../config";

import { refreshAccessToken, logout } from '../../store/slices/authSlice';
import { store } from '../../store/store';


const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
     
      const originalRequest = error.config;
      
      // Vérifier si l'erreur est due à un token expiré
      if (error.response.status === 401) {
          const state = store.getState();
          const refreshTokenValue = state.auth.refreshToken; // Obtenez le refreshToken du state

          if (refreshTokenValue && !originalRequest.url.includes('/refresh')) {
              originalRequest._isRetry = true; // Marquez que nous avons déjà essayé de rafraîchir le token

              try {
                  // On essaye de rafraichir le token
                  const newAccessToken = await store.dispatch(refreshAccessToken(refreshTokenValue)).unwrap();
                  
                  // On met à jour les headers pour rejouer la requête avec le nouveau token
                  apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                  originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                  
                  // Renvoyez la requête originale avec le nouveau token
                  return apiClient(originalRequest);
              } catch (error) {
                  // Si le rafraîchissement échoue, déconnectez l'utilisateur
                  store.dispatch(logout());
                  return Promise.reject(error);
              }
          } else {
              // Si c'est une 401 d'une tentative de refresh OU qu'on a pas de refreshtoken (httpOnly cookies)
              store.dispatch(logout());
          }
      }

      return Promise.reject(error);
  }
);

export default apiClient;
