



// Fonction pour obtenir le token depuis le localStorage
const  getAccessToken  = (): string|null => localStorage.getItem("myjobboard_accesstoken");

// Fonction pour définir le token dans le localStorage
const setAccessToken = (token) => localStorage.setItem("myjobboard_accesstoken", token);

// Fonction pour obtenir le refreshToken depuis le localStorage
const getRefreshToken = (): string|null => localStorage.getItem("myjobboard_refreshtoken");

// Fonction pour définir le refreshToken dans le localStorage
const setRefreshToken = (refreshToken) =>
  localStorage.setItem("myjobboard_refreshtoken", refreshToken);




export {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken
};