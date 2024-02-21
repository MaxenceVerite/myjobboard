import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpportunityAdvicesList from "../../components/opportunities/opportunityAdvicesList";
import SearchBar from "../../components/common/SearchBar";
import React from "react";
import CreateOpportunityForm from "../../components/opportunities/CreateOpportunityForm";
import Opportunity from "../../models/opportunities/Opportunity";
import { useDispatch, useSelector } from "react-redux";
import { createOpportunity, getOpportunities } from "../../store/slices/opportunitySlice";
import { RootState } from "../../store/store";

const OpportunitiesListContent = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();


  const opportunities = useSelector((state: RootState) => state.opportunities.opportunities)

  const handleCreateOpportunity = () => {
    handleCloseModal();
  };

  const handleNavOpportunity = (opportunityId: string) => {
    navigate(opportunityId);
  };

  const handleSearch = (input: string) => {


  };


  useEffect(() => {
    dispatch(getOpportunities());


  })

  const handleCloseModal = ()=> {
    setIsCreationModalOpen(false);
  }


  return (
    <>
      <Box mb={2}>
        <SearchBar
          placeholder={"Rechercher une opportunité ..."}
          onSearch={(input) => handleSearch(input)}
        ></SearchBar>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          {opportunities.map((opp) => (
            <Card elevation={1} sx={{ mb: 2 }} key={opp.id}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">
                    {opp.companyId} - {opp.roleTitle}
                  </Typography>
                  <Typography color="textSecondary">{opp.state}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Démarré le {opp.startDate.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Dernière mise à jour le {opp.lastUpdateDate.toLocaleString()}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleNavOpportunity(opp.id!)}
                  >
                    Voir
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsCreationModalOpen(true)}
            sx={{ mt: 2 }}
          >
            Créer une opportunité
          </Button>
        </Grid>

        <Grid item xs={3}>
          <OpportunityAdvicesList />
        </Grid>
      </Grid>

      <Dialog open={isCreationModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Créer une nouvelle opportunité</DialogTitle>
        <DialogContent>
          <CreateOpportunityForm onSubmit={handleCreateOpportunity} onClose={handleCloseModal}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OpportunitiesListContent;
