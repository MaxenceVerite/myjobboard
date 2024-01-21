import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DocumentListItem from "../components/documents/DocumentListItem";

import { styled } from "@mui/material/styles";
import {
  fetchMotivationLetters,
  fetchCVs,
} from "../store/slices/documentSlice";
import { RootState, AppDispatch } from "../store/store";
import { Document } from "../models/document";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const LAST_DOCUMENT_DISPLAYED_ITEM_NUMBER = 3;

const DocumentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cvs = useSelector((state: RootState) => state.documents.cvs);
  const motivationLetters = useSelector(
    (state: RootState) => state.documents.motivationLetters
  );
  const isLoading = useSelector(
    (state: RootState) => state.documents.isLoading
  );
  const [lastDocuments, setLastDocuments] = useState<Document[]>([]);

  useEffect(() => {
    dispatch(fetchCVs());
    dispatch(fetchMotivationLetters());
  }, [dispatch]);

  useEffect(() => {
    // Combine and sort documents by creationDate
    const combinedDocuments = [...cvs, ...motivationLetters].sort((a, b) => {
      return (
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    });
    setLastDocuments(
      combinedDocuments.slice(0, LAST_DOCUMENT_DISPLAYED_ITEM_NUMBER)
    );
  }, [cvs, motivationLetters]);

  // Upload handler (to be implemented)
  const handleUpload = (event) => {
    // Logic for handling document upload
  };

  // Delete handler (to be implemented)
  const handleDelete = (docId) => {
    // Logic for handling document delete
  };

  // Gestionnaire pour afficher un document (pourrait ouvrir un modal ou une nouvelle fenêtre)
  const handleView = (doc: Document) => {
    // Logique pour afficher le document
  };

  // Gestionnaire pour télécharger un document
  const handleDownload = (doc: Document) => {
    // Logique pour télécharger le document
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mes documents
        </Typography>
        {/* Tabs or quick navigation could go here */}
      </Box>

      <Grid container spacing={3}>
        {/* Section for latest documents */}
        <Grid item xs={12}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Mes derniers documents
            </Typography>
            <List>
              {lastDocuments.map((doc) => (
                <DocumentListItem 
                key={doc.id} 
                doc={doc} 
                onDownload={handleDownload}
                onDelete={handleDelete}
                onView={handleView}
                />
              ))}
            </List>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Mes CV
            </Typography>
            <List>
              {cvs.map((doc) => (
                <DocumentListItem 
                key={doc.id} 
                doc={doc} 
                onDownload={handleDownload}
                onDelete={handleDelete}
                onView={handleView}
                />
              ))}
            </List>
            <Button startIcon={<CloudUploadIcon />} component="label">
              Ajouter un nouveau CV
              <input type="file" hidden onChange={handleUpload} />
            </Button>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Mes lettres de motivation
            </Typography>

            <List>
              {motivationLetters.map((doc) => (
                <DocumentListItem 
                key={doc.id} 
                doc={doc} 
                onDownload={handleDownload}
                onDelete={handleDelete}
                onView={handleView}
                />
              ))}
            </List>

            <Divider />
            <IconButton color="primary" aria-label="add document">
              <AddCircleOutlineIcon />
            </IconButton>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DocumentPage;
