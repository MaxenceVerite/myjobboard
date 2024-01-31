// src/components/AuthForm.tsx
import React, { useState, useEffect, FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser, AuthState } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthForm = () => {
  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
  });
  const dispatch = useDispatch<any>();
  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (!authState.isLoading && authState.token) navigate("/dashboard");
  }, [authState.token, authState.user]);

  useEffect(() => {
    if (authState.error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [authState.error]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <Typography variant="h5" component="h2">
        Connexion
      </Typography>
      <TextField
        label="Adresse e-mail"
        variant="outlined"
        value={credentials.mail}
        onChange={(e) =>
          setCredentials({ ...credentials, mail: e.target.value })
        }
      />
      <TextField
        label="Mot de passe"
        variant="outlined"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <Box display="flex" alignItems="center">
        <Button type="submit" variant="contained" sx={{ mt: 3, mr:2 }}>
          Se connecter
        </Button>
        
        <Button onClick={() => navigate("/register")} variant="outlined" sx={{ mt: 3 }}>
          Créer un compte
        </Button>
      </Box>

      {authState.isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {showAlert && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Alert severity="error">{authState.error}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default AuthForm;
