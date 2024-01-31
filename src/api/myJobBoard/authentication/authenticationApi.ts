import Token from "../../../models/authentication/Token";
import myJobBoardClient from "../apiclient";

const register = async (mail: string, password: string): Promise<void> => {
  try {
    return await myJobBoardClient.post("/register", {
      email: mail,
      password: password,
    });
  } catch (error) {
    console.log("Erreur lors de la création de compte:", error);
  }
};

const login = async (mail: string, password: string): Promise<Token> => {
  try {
    const response = await myJobBoardClient.post("/login", {
      email: mail,
      password: password,
    });

    return response.data;
    
  } catch (error) {
    console.log("Erreur lors de la connexion:", error);
    throw error;
  }
};

export { register, login };
