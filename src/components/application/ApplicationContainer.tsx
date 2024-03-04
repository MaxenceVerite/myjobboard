import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Application } from "../../models/opportunities/Opportunity";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  IconButton,
  Dialog,
  DialogTitle, 
  DialogContent
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface ApplicationContainerProps {
  application?: Application;
}

const ApplicationContainer = ({ application }: ApplicationContainerProps) => {
  const { t } = useTranslation();


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenApplicationModal = ()=>{
    setIsModalOpen(true);

  }

  return (
    <>
      <Paper elevation={3} sx={{ padding: "30px", minHeight: "120px" }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6">{t(`Ma candidature`)}</Typography>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={8} mb={3}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            {application ? (
              <>
                <Grid container spacing={2}></Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} mb={2}>
                  <Typography>
                    Aucune candidature n'a été associée à cette opportunitée
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleOpenApplicationModal} variant="contained">Ajouter une candidature</Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)}>
        <DialogTitle>Ajouter une candidature associée à l'opportunité</DialogTitle>
        <DialogContent>
          <div>Insérer un formulaire pour créer une candidature</div>
        </DialogContent>
      </Dialog>
      </Paper>
    </>
  );
};

export default ApplicationContainer;
