import React from 'react'
import { Box } from '@mui/material';
import RegisterForm from '../../components/authentication/RegisterForm';

const RegisterPage = ({}) => {

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
            <RegisterForm/>
        </Box>
      );
}


export default RegisterPage;