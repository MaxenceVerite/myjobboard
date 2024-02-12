import {
  Grid,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Link,
} from "@mui/material";
import React from "react";
import {
  Article as ArticleIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";

const OpportunityDetailContent = () => {
  const { id } = useParams();

  const activeStep = 1;

  const mockedOpportunity = {
    id: id,
    compagnyName: "CGI",
    role: "Analyste développeur",
  };

  const phases = [
    "Prise de contact",
    "Entretiens",
    "Propositions",
    "Fin du process",
  ];


  return (
    <React.Fragment>
      <Paper elevation={1} sx={{ padding: "3%" }}>
        <Grid container xs={12}>
          <Grid item xs={4}>
            <Typography variant="h3">
              {mockedOpportunity.compagnyName}
            </Typography>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={2}>
            <Button variant="outlined" startIcon={<ArticleIcon />}>
              Voir le résumé
            </Button>
          </Grid>

          <Grid item xs={12} mb={3}>
            <Typography variant="h5">{mockedOpportunity.role}</Typography>
          </Grid>

          <Grid item xs={12} mb={5}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={6}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {phases.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid xs={12}>
          <Paper elevation={3} sx={{ padding: "3%", mb:"3%", backgroundColor:"lightgrey" }} >
            <Grid item xs={4}>
              <Typography variant="h6">{phases[0]}</Typography>
            </Grid>
            <Grid item xs={8} mb={3}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <Card sx={{backgroundColor:"lavender"}}>
                    <CardContent>
                      <Typography variant="h6">Candidature</Typography>
                      <Typography variant="body2">19/02/2024</Typography>
                      <Link href="https://indeed.fr">Lien de l'offre</Link>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Voir le detail</Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <IconButton size="large">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          </Grid>
          <Grid xs={12}>
          <Paper elevation={3} sx={{ padding: "3%" }}>
            <Grid item xs={4}>
              <Typography variant="h6">{phases[1]}</Typography>
            </Grid>
            <Grid item xs={8} mb={3}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={2}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Entretien RH</Typography>
                      <Typography variant="body2">19/02/2023</Typography>
                      <Link href="https://indeed.fr">Brigitte Macron</Link>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Voir le detail</Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <IconButton size="large">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default OpportunityDetailContent;
