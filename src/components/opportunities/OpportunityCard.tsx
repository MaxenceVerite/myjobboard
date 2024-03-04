import React from "react";
import {
  Card,
  Typography,
  Box,
  Avatar,
  IconButton,
  Rating,
  Grid,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Opportunity from "../../models/opportunities/Opportunity";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Circle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOpportunity } from "../../store/slices/opportunitySlice";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const handleNavOpportunity = (id: string) => {
    navigate(opportunity.id!);
  };

  const handleRatingChange = (event, newValue) => {
    const safeOpportunity = {
      ...opportunity,
      userAppreciationLevel: newValue,
    };

    dispatch(updateOpportunity({ opportunity: safeOpportunity }));
  };
  const [opportunityCompany] = useSelector((state: RootState) =>
    state.companies.companies.filter((c) => c.id == opportunity.companyId)
  );

  const companyName = opportunityCompany?.name ?? "Enseigne";

  return (
    <Card
      sx={{
        height: "12vh",
        mb: 2,
        display: "flex",
        alignItems: "center",
        px: 5,
        py: 8,
      }}
      key={opportunity.id}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid onClick={() => handleNavOpportunity(opportunity.id!)} item xs={12} sm={6} display="flex" alignItems="center">
          <Avatar
            alt={companyName}
            src={opportunityCompany?.websiteUrl}
            sx={{ width: 66, height: 66, mr: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              noWrap
              fontWeight={500}
              variant="h6"
              color="secondary"
              sx={{
                maxWidth: "30vh",
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
              onClick={(e) => {
                e.stopPropagation;
                opportunity.companyId
                  ? navigate(`/sheets/companies/${opportunity.companyId}`)
                  : undefined;
              }}
            >
              {companyName}
            </Typography>
            <Circle color="primary" sx={{ mx: "12px", fontSize: "6px" }} />
            <Typography
              noWrap
              fontWeight={500}
              variant="h6"
              color="primary"
              sx={{ maxWidth: "30vh" }}
            >
              {opportunity.roleTitle}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Rating
            name="simple-controlled"
            precision={1}
            value={opportunity.userAppreciationLevel || 0}
            onChange={handleRatingChange}
          />
          <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
            Dernière modification: {opportunity.lastUpdateDate.toLocaleString()}
          </Typography>
          <IconButton
            color="secondary"
            onClick={() => handleNavOpportunity(opportunity.id!)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OpportunityCard;
