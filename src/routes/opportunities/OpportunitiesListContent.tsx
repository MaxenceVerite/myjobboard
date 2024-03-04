import { useEffect, useMemo } from "react";
import { Grid } from "@mui/material";

import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getOpportunities } from "../../store/slices/opportunitySlice";
import { RootState } from "../../store/store";

import OpportunityCardList from "../../components/opportunities/OpportunityCardList";
import { EOpportunityState } from "../../models/opportunities/Opportunity";

const OpportunitiesListContent = () => {
  const dispatch = useDispatch<any>();

  const opportunities = useSelector(
    (state: RootState) => state.opportunities.opportunities
  );
  const opportunitiesInProgress = useMemo(() => {
    return opportunities.filter(
      (opp) =>
        opp.state === EOpportunityState.APPLIED ||
        opp.state === EOpportunityState.INTERVIEWING ||
        opp.state === EOpportunityState.NEGOCIATION_ON_OFFERS
    );
  }, [opportunities]);

  const archivedOpportunities = useMemo(() => {
    return opportunities.filter(
      (opp) =>
        opp.state === EOpportunityState.REFUSED ||
        opp.state === EOpportunityState.ABORTED ||
        opp.state === EOpportunityState.VALIDATED
    );
  }, [opportunities]);

  useEffect(() => {
    dispatch(getOpportunities());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={2}>
        <OpportunityCardList
          title="En cours"
          opportunities={opportunitiesInProgress}
          canAddOpportunity
          isExpanded
        />
        <OpportunityCardList
          title="Archivés"
          opportunities={archivedOpportunities}
          canAddOpportunity={false}
          isExpanded={false}
        />
      </Grid>
    </>
  );
};

export default OpportunitiesListContent;
