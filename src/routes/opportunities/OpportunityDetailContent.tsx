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
import React, { useEffect } from "react";
import {
  Article as ArticleIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  EmojiPeopleOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Opportunity, { EOpportunityState } from "../../models/opportunities/Opportunity";
import OpportunityStageSteps from "./OpportunityStageSteps";
import { useDispatch } from "react-redux";
import { getOpportunity } from "../../store/slices/opportunitySlice";

const OpportunityDetailContent = () => {
  const { id } = useParams();
  const dispatch = useDispatch<any>();
  const opportunity: Opportunity | undefined = useSelector(
    (state: RootState) => {
      return state.opportunities.currentOpportunity
    }
  );

  useEffect(() => {
    dispatch(getOpportunity({id: id!}))
  }, [id])

  const activeStep = 1;

  const phases: EOpportunityState[] = useSelector((state: RootState) => state.opportunities.opportunityPhases)

  return (
    <React.Fragment>
      {opportunity && (
        <Paper elevation={1} sx={{ padding: "3%" }}>
          <Grid container xs={12}>
            <Grid item xs={4}>
              <Typography variant="h3">{opportunity.companyId}</Typography>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={2}>
              <Button variant="outlined" startIcon={<ArticleIcon />}>
                Voir le résumé
              </Button>
            </Grid>

            <Grid item xs={12} mb={3}>
              <Typography variant="h5">{opportunity.roleTitle}</Typography>
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
              <OpportunityStageSteps
                phase={EOpportunityState.Applied}
                phaseOpportunitySteps={opportunity.steps}
              />
            </Grid>
            <Grid xs={12}>
             
            </Grid>
          </Grid>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default OpportunityDetailContent;
