// src/config.ts
interface Config {
    apiUrl: string;
  }
  
  const developmentConfig: Config = {
    apiUrl: 'http://localhost:5000', // URL pour l'environnement de développement
  };
  
  const productionConfig: Config = {
    apiUrl: 'https://your-production-api.com', // URL pour l'environnement de production
  };
  
  const config: Config = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
  
  export default config;
  