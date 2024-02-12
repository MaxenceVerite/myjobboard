import React from "react";
import {
  Container,
  Typography,
  Box,
} from "@mui/material";

import {Outlet} from "react-router-dom";


const OpportunitiesPage = () => {


  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mes opportunités
        </Typography>
      </Box>
      <Outlet/>
    </Container>
  );
};

export default OpportunitiesPage;
