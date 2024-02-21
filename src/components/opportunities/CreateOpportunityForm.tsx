import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import Opportunity, {
  EOpportunityState,
  RemoteCondition,
} from "../../models/opportunities/Opportunity";
import CompanyPicker from "../compagnies/CompagnyPicker";
import { useDispatch } from "react-redux";
import { createOpportunity } from "../../store/slices/opportunitySlice";

interface CreateOpportunityFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const CreateOpportunityForm = ({
  onClose,
  onSubmit
}: CreateOpportunityFormProps) => {
  const [opportunityData, setOpportunityData] = useState<Opportunity>({
    roleTitle: "",
    startDate: new Date(),
    lastUpdateDate: new Date(),
    state: EOpportunityState.Applied,
    remoteCondition: RemoteCondition.Office,
    steps: [],
  });

  const dispatch = useDispatch<any>();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOpportunityData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(opportunityData)
    dispatch(createOpportunity({opportunity: opportunityData}))
    onSubmit();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleCompanySelect = (companyId: string) => {
    setOpportunityData((prev) => ({ ...prev, companyId: companyId }));
  };
  

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl fullWidth margin="normal">
          <CompanyPicker onCompanySelect={handleCompanySelect}/>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Titre"
          name="roleTitle"
          value={opportunityData.roleTitle}
          onChange={handleInputChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="remote-conditions-label">Politique de TT</InputLabel>
          <Select
            labelId="remote-conditions-label"
            id="remoteCondition"
            name="remoteCondition"
            value={opportunityData.remoteCondition}
            label="Remote Condition"
            onChange={handleInputChange}
          >
            {Object.values(RemoteCondition).map((condition) => (
              <MenuItem key={condition} value={condition}>
                {condition}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="startDate"
          label="Date de début du process"
          type="date"
          name="startDate"
          value={opportunityData.startDate}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
        />

        <Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mb: "2%" }}>
            Créer
          </Button>
          <Button onClick={handleCancel} fullWidth variant="outlined">
            Annuler
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateOpportunityForm;
