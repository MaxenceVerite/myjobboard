import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Input,
  FormLabel,
} from "@mui/material";
import { Document, DocumentType } from "../../../models/document"; // Assurez-vous que le chemin d'importation est correct
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateDocument } from "../../../store/slices/documentSlice";

interface DocumentFormProps {
  document: Document;
  onSubmit: () => void;
}

const DocumentForm = ({ document, onSubmit }: DocumentFormProps) => {
  const [name, setName] = useState(document.name);
  const [type, setType] = useState<DocumentType>(document.type);
  const dispatch = useDispatch<any>();
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value as DocumentType);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   
    dispatch(updateDocument({...document, name: name, type: type}))
    onSubmit();
  };

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        placeholder="Name"
        variant="standard"
        fullWidth
        margin="normal"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        select
        label={t("Type")} 
        fullWidth
        margin="normal"
        value={type}
        onChange={handleTypeChange}
        variant="standard"
      >
        {Object.values(DocumentType).map((type) => (
          <MenuItem key={type} value={type}>
            {t(`documentType.${type}`)}
          </MenuItem>
        ))}
      </TextField>

      <Button
        sx={{ marginTop: 3, color: "white" }}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
      >
        Enregistrer
      </Button>
    </form>
  );
};

export default DocumentForm;
