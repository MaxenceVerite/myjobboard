import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";

import {Outlet} from "react-router-dom";


const OpportunitiesPage = () => {


  return (
    <Grid container xs={12} spacing="2">
      <Outlet/>
    </Grid>
  );
};

export default OpportunitiesPage;
