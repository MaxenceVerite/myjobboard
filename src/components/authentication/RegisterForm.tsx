import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Container,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { enqueueNotification } from "../../store/slices/notificationSlice";
import { NotificationSeverity } from "../../ValueObjects/Notification";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register({ mail: email, password: password, tel: phone }))
      .then(unwrapResult)
      .then(() => {
        enqueueNotification({
          message: "Compte MyJobBoard crée avec succès",
          severity: NotificationSeverity.Success,
        });
        navigate("/login");
      });
  };

  return (
    <>
      <Grid container xs={5}>
        <Grid item xs={12}>
         
            <Container component="main" maxWidth="xs">
              <Typography component="h1" variant="h5" mb={3}>
                Créer un compte MyJobBoard
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <TextField
                       variant="standard"
                      required
                      fullWidth
                      id="email"
                      label="Adresse Email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        variant="standard"
                      fullWidth
                      id="phone"
                      label="Numéro de téléphone (SMS)"
                      name="phone"
                      autoComplete="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        variant="standard"
                      required
                      fullWidth
                      name="password"
                      label="Mot de passe"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        variant="standard"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirmez le mot de passe"
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="Je souhaite recevoir des promotions par e-mail."
                    />
                  </Grid>

                  <Grid item xs={10} >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ margin: "24px 0px 16px" }}
                    >
                      Créer un compte
                    </Button>
                    <Link
                      onClick={() => {
                        navigate("/login");
                      }}
                      variant="body2"
                    >
                      Déjà un compte? Se connecter
                    </Link>
                  </Grid>

  
                </Grid>
              </form>
            </Container>
        </Grid>
        <Grid item xs={12}>
      
            <Grid container justifyContent="center">
              <Grid item xs={10}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: 20 }}
                >
                  Inscription avec LinkedIn
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: 20 }}
                >
                  Inscription avec Google
                </Button>
              </Grid>
            </Grid>

        </Grid>
      </Grid>
    </>
  );
}
