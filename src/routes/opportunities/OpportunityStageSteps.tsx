import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  Link,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { EOpportunityState, OpportunityStep } from "../../models/opportunities/Opportunity";

interface OpportunityStageStepsProps {

  phase: EOpportunityState,
  phaseOpportunitySteps: OpportunityStep[]
}

const OpportunityStageSteps = ({ phase, phaseOpportunitySteps } : OpportunityStageStepsProps) => {
  return (
    <Paper elevation={3} sx={{ padding: "3%" }}>
      <Grid item xs={4}>
        <Typography variant="h6">{phase}</Typography>
      </Grid>
      <Grid item xs={8} mb={3}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {phaseOpportunitySteps &&
            phaseOpportunitySteps.map((item:OpportunityStep) => (
              <Grid item xs={12} sm={6} md={2}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.id}</Typography>
                    <Typography variant="body2">{item.dueDate?.toLocaleString()}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Voir le detail</Button>
                  </CardActions>
                </Card>z
              </Grid>
            ))}

          <Grid item xs={12} sm={6} md={4}>
            <IconButton size="large">
              <AddCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};


export default OpportunityStageSteps;