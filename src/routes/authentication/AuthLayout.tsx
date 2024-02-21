
import React from "react"
import { Grid, Paper, Box } from "@mui/material"
import { Outlet } from "react-router-dom"
const AuthLayout = () => {


    return(
    <Grid container>
        <Grid item xs={6} sx={{
        
        }}>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }} 
        
        justifyContent="center" alignItems="center" width="100%" height="100vh">
            <Outlet/>
        </Box>
        </Grid>
        <Grid
        item
        xs={6}
        sx={{
          backgroundImage: `url('/assets/login-background.png')`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
            
        </Grid>
    </Grid>);

}

export default AuthLayout;