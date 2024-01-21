// src/routes/LoginPage.tsx
import React from 'react';
import AuthForm from '../components/authentication/AuthForm';
import { Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backdropFilter: 'blur(10px)',
      }}
    >
      <AuthForm />
    </Box>
  );
};

export default LoginPage;
