import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Grid, Box, Typography, Card, CardContent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpportunityAdvicesList from "../../components/opportunities/opportunityAdvicesList";
import SearchBar from "../../components/common/SearchBar";
import React
 from "react";

const OpportunitiesListContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResolved, setShowResolved] = useState(false);
  const navigate = useNavigate();

  const handleCreateOpportunity = () => {
    // Logique pour créer une opportunité
  };

  const handleNavOpportunity = (opportunityId: string) => {
    navigate(opportunityId);
  };

  const handleSearch = (input: string) => {};

  // Mock data pour les opportunités
  const opportunities = [
    {
      id: "1",
      company: "CGI",
      role: "Analyste développeur",
      status: "Candidature envoyée",
      startDate: "22/09/2023",
      lastUpdatedDate: "22/10/2023",
      warning:
        "Cette opportunité n’a pas été mise à jour depuis plus de deux semaines.",
    },
    // ...autres opportunités
  ];

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
                    {opp.company} - {opp.role}
                  </Typography>
                  <Typography color="textSecondary">{opp.status}</Typography>
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
                      Démarré le {opp.startDate}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Dernière mise à jour le {opp.lastUpdatedDate}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleNavOpportunity(opp.id)}
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
            onClick={handleCreateOpportunity}
            sx={{ mt: 2 }}
          >
            Créer une opportunité
          </Button>
        </Grid>

        <Grid item xs={3}>
          <OpportunityAdvicesList />
        </Grid>
      </Grid>
    </>
  );
};

export default OpportunitiesListContent;
