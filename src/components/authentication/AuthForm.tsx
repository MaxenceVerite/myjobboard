// src/components/AuthForm.tsx
import React, { useState, useEffect, FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Link,
  Grid,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { login, AuthState } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { enqueueNotification } from "../../store/slices/notificationSlice";
import { NotificationSeverity } from "../../ValueObjects/Notification";
const AuthForm = () => {
  const [credentials, setCredentials] = useState({
    mail: "",
    password: "",
  });
  const dispatch = useDispatch<any>();
  const authState = useSelector((state: { auth: AuthState }) => state.auth);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login(credentials));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };
  useEffect(() => {
    if (!authState.isLoading && authState.isConnected) {
      dispatch(
        enqueueNotification({
          message: "Connexion réussie",
          severity: NotificationSeverity.Success,
          duration: 2000,
        })
      );
      navigate("/dashboard");
    }
  }, [authState.isLoading, authState.isConnected]);

  useEffect(() => {
    if (authState.error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [authState.error]);



  return (
    <Box sx={{ p: 4, maxWidth: 400, m: 'auto', borderRadius: 2 }}>
      <Typography variant="h4" mb={2} textAlign="center">
        LOGO
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="mail"
          autoComplete="email"
          variant="standard" 
          autoFocus
          onChange={handleInputChange}
          value={credentials.mail}
          InputProps={
            { endAdornment: (
              <InputAdornment position="end">
                <PersonIcon />
              </InputAdornment>
            ),
            }
          }
          sx={{mb:"3%"}}
        />
        <TextField
          onChange={handleInputChange}
          margin="normal"
          required
          fullWidth
          name="password"
          value={credentials.password}
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          id="password"
          variant="standard" 
          autoComplete="current-password"
          InputProps={
            { endAdornment: (
              <InputAdornment position="end">
                     <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            }
          }
          sx={{mb:"3%"}}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Rester connecté"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Se connecter
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Mot de passe oublié?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={() => navigate('/register')}>
              {"Pas encore de compte? Créer en un"}
            </Link>
          </Grid>
        </Grid>
        {authState.isLoading && (
          <CircularProgress size={24} sx={{ mt: 3 }} />
        )}
        {showAlert && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {authState.error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default AuthForm;
