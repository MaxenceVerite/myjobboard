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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { enqueueNotification } from "../../store/slices/notificationSlice";


export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register({mail: email, password: password, tel: phone}))
    .then(unwrapResult) 
    .then(() => {
      enqueueNotification(
        {
          key: "REGISTER_SUCCESS",
          message: "Compte MyJobBoard crée avec succès",
          severity: "SUCCESS"
        }
      );
      navigate('/login'); 
    })
    
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Créer un compte MyJobBoard
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Je souhaite recevoir des promotions par e-mail."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: "24px 0px 16px" }}
        >
          Créer un compte
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
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
      <Grid container>

        <Grid item xs>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Inscription avec LinkedIn
          </Button>
        </Grid>
        <Grid item xs>
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
    </Container>
  );
}
