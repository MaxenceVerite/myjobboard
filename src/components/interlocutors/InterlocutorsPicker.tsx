import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getInterlocutors,
  createInterlocutor,
} from "../../store/slices/interlocutorSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Interlocutor from "../../models/opportunities/Interlocutor";
import { RootState } from "../../store/store";
import { Grid, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import CompanyPicker from "../compagnies/CompagnyPicker";

interface InterlocutorsPickerProps {
  companyId?: string;
  canCreate?: boolean;
  preselectedInterlocutors?: string[];
  onInterlocutorsSelectionChange: (interlocutorIds: string[]) => void;
}

const InterlocutorsPicker = ({
  companyId,
  canCreate,
  preselectedInterlocutors,
  onInterlocutorsSelectionChange,
}: InterlocutorsPickerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedInterlocutors, setSelectedInterlocutors] = useState<
    Interlocutor[]
  >([]);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    role: "",
    companyId,
  });

  const interlocutors = useSelector(
    (state: RootState) => state.interlocutors.interlocutors
  );
  const dispatch = useDispatch<any>();
  const canShowCreateForm = canCreate ?? false;

  useEffect(() => {
    dispatch(getInterlocutors());

    const preselected = interlocutors.filter((interlocutor) =>
      preselectedInterlocutors?.includes(interlocutor.id!)
    );
    setSelectedInterlocutors(preselected);
  }, [dispatch]);

  const handleFormSubmit = async () => {
    if (formValues.firstName && formValues.lastName) {
      const newInterlocutor: Interlocutor = {
        companyId: companyId,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        role: formValues.role,
      };

      const resultAction = await dispatch(
        createInterlocutor({ interlocutor: newInterlocutor })
      );

      if (createInterlocutor.fulfilled.match(resultAction)) {
        const createdInterlocutor = resultAction.payload;
        const updatedSelected = [...selectedInterlocutors, createdInterlocutor];
        setSelectedInterlocutors(updatedSelected);
        setInputValue("");
        setFormValues({
          firstName: "",
          lastName: "",
          role: "",
          companyId: "",
        });
        setShowForm(false);
        onInterlocutorsSelectionChange(
          updatedSelected.map((interlocutor) => interlocutor.id!)
        );
      }
    }
  };

  return (
    
    <Paper
      elevation={0}
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.light,
        marginY: 3,
        padding: 1,
      })}
    >
      <Autocomplete
        multiple
        value={selectedInterlocutors}
        onChange={(event, newValue) => {
          setSelectedInterlocutors(newValue);
          onInterlocutorsSelectionChange(
            newValue.map((interlocutor) => interlocutor.id!)
          );
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={interlocutors}
        getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
        renderInput={(params) => (
          <TextField
            margin="dense"
            {...params}
            placeholder="Interlocuteurs"
            variant="standard"
          />
        )}
        renderOption={(props, option) => (
          <li
            key={option.id}
            {...props}
          >{`${option.lastName}, ${option.firstName}`}</li>
        )}
      />
      {canShowCreateForm && (
        <Button
          sx={{ fontSize: "17px", color: "white" }}
          fullWidth
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Fermer" : "+"}
        </Button>
      )}
      {canShowCreateForm && showForm && (
        <Grid container padding={2} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="standard"
              margin="normal"
              placeholder="Prénom"
              value={formValues.firstName}
              onChange={(e) =>
                setFormValues({ ...formValues, firstName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="standard"
              margin="normal"
              placeholder="Nom"
              value={formValues.lastName}
              onChange={(e) =>
                setFormValues({ ...formValues, lastName: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              variant="standard"
              placeholder="Rôle"
              value={formValues.role}
              onChange={(e) =>
                setFormValues({ ...formValues, role: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CompanyPicker
              onCompanySelect={(companyId) =>
                setFormValues({ ...formValues, companyId: companyId })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={(theme) => ({
                backgroundColor: theme.palette.secondary.dark,
              })}
              onClick={handleFormSubmit}
            >
              Confirmer
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default InterlocutorsPicker;
