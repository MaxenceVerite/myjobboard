import { STATUS_CODES } from "http";
import Token from "../../../models/authentication/Token";
import myJobBoardClient from "../apiclient";
import { setAccessToken, setRefreshToken } from "../tokenManager";

const register = async (mail: string, password: string): Promise<void> => {
  try {
    const response = await myJobBoardClient.post("/register", {
      email: mail,
      password: password,
    });

    return response.data
  } catch (error) {
    console.log("Erreur lors de la création de compte:", error);
  }
};

const login = async (mail: string, password: string): Promise<void> => {
  try {
    const response = await myJobBoardClient.post("/login", {
      email: mail,
      password: password,
    },
    {
      params: {
        'useCookies': true,
        'useSessionCookies': true
      }
    }
    );

    if(response.data){
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    }

    return response.data;
    
  } catch (error) {
    console.log("Erreur lors de la connexion:", error);
    throw error;
  }
};


const refresh = async (refreshToken: string): Promise<Token> => {
  try {
    const response = await myJobBoardClient.post<Token>("/refresh", {
      refreshToken: refreshToken
    }
    );

    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken)

    return response.data;
    
  } catch (error) {
    console.log("Erreur lors du rafraichissement de la session:", error);
    throw error;
  }
}

const checkSession = async (): Promise<void> => {
  try {
    const response = await myJobBoardClient.get("/checkSession");
  } catch (error) {
    console.log("Erreur lors de la récupération de la session courante", error);
    throw error;
  }
}

export { register, login,refresh, checkSession };
