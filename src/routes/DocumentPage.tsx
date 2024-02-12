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
  Collapse,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import DocumentListItem from "../components/documents/DocumentListItem";

import { styled } from "@mui/material/styles";
import {
  fetchMotivationLetters,
  fetchCVs,
  uploadDocument,
  downloadDocument,
} from "../store/slices/documentSlice";
import { RootState, AppDispatch } from "../store/store";
import { Document, DocumentType } from "../models/document";
import { downloadDocumentOnUserPc } from "../helpers/fileHelper";
import { deleteDocument } from "../services/documentService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const LAST_DOCUMENT_DISPLAYED_ITEM_NUMBER = 3;

const DocumentPage = () => {
  const [lastDocumentsOpen, setLastDocumentsOpen] = useState(false);

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
    const combinedDocuments = [...cvs, ...motivationLetters].sort((a, b) => {
      return (
        new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime()
      );
    });
    setLastDocuments(
      combinedDocuments.slice(0, LAST_DOCUMENT_DISPLAYED_ITEM_NUMBER)
    );
  }, [cvs, motivationLetters]);

  const getFileDataFromUploadEvent = (event) => {
    return event.target.files[0];
  };

  const handleUploadCV = (event) => {
    var file = getFileDataFromUploadEvent(event);
    dispatch(uploadDocument({ file: file, type: DocumentType.CV })).then(() => {
      dispatch(fetchCVs());
    });
  };

  const handleUploadMotivationLetter = (event) => {
    var file = getFileDataFromUploadEvent(event);
    dispatch(
      uploadDocument({ file: file, type: DocumentType.MOTIVATION_LETTER })
    ).then(() => {
      dispatch(fetchMotivationLetters());
    });
  };

  const handleDelete = async (doc: Document) => {
    await deleteDocument(doc.id).then(() => {
      console.log("coucougnette");
      console.log(doc.type);
      if (doc.type === DocumentType.CV) {
        dispatch(fetchCVs());
      }
      if (doc.type === DocumentType.MOTIVATION_LETTER) {
        dispatch(fetchMotivationLetters());
      }
    });
  };

  const handlePreview = (doc: Document) => {
    dispatch(downloadDocument({ documentId: doc.id })).then((action) => {
      if (downloadDocument.fulfilled.match(action)) {
        const blob = action.payload;
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    });
  };

  const handleDownload = async (doc: Document) => {
    dispatch(downloadDocument({ documentId: doc.id })).then((action) => {
      if (downloadDocument.fulfilled.match(action)) {
        const blob = action.payload;
        downloadDocumentOnUserPc(doc.name, blob);
      }
    });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mes documents
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {lastDocuments.length > 0 && (
          <Grid item xs={12}>
            <Item>
              <Box
                display="flex"
                alignItems="center"
                onClick={() => setLastDocumentsOpen(!lastDocumentsOpen)} // Toggle collapse
              >
                <Typography variant="h6" gutterBottom>
                  Mes derniers documents
                </Typography>

                <IconButton
                
                  edge="end"
                  aria-label="collapse"
                >
                  {lastDocumentsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={lastDocumentsOpen}>
                <List>
                  {lastDocuments.map((doc) => (
                    <DocumentListItem
                      key={doc.id}
                      doc={doc}
                      onDownload={handleDownload}
                      onDelete={handleDelete}
                      onView={handlePreview}
                    />
                  ))}
                </List>
              </Collapse>
            </Item>
          </Grid>
        )}
        <Grid item xs={12}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Mes CV
            </Typography>
            {cvs && cvs.length > 0 ? (
              <List>
                {cvs.map((doc) => (
                  <DocumentListItem
                    key={doc.id}
                    doc={doc}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    onView={handlePreview}
                  />
                ))}
              </List>
            ) : (
              <Item elevation={0}>
                <Typography gutterBottom>
                  Aucun CV téléversé(s) pour le moment ...
                </Typography>
              </Item>
            )}
            <Divider></Divider>
            <Button startIcon={<CloudUploadIcon />} component="label">
              Ajouter un nouveau CV
              <input type="file" hidden onChange={handleUploadCV} />
            </Button>
          </Item>
        </Grid>

        <Grid item xs={12}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Mes lettres de motivation
            </Typography>
            {motivationLetters && motivationLetters.length > 0 ? (
              <List>
                {motivationLetters.map((doc) => (
                  <DocumentListItem
                    key={doc.id}
                    doc={doc}
                    onDownload={handleDownload}
                    onDelete={handleDelete}
                    onView={handlePreview}
                  />
                ))}
              </List>
            ) : (
              <Item elevation={0}>
                <Typography gutterBottom>
                  Aucune lettre(s) de motivation téléversée(s) pour le moment
                  ...
                </Typography>
              </Item>
            )}
            <Divider></Divider>
            <Button startIcon={<CloudUploadIcon />} component="label">
              Ajouter une lettre de motivation
              <input
                type="file"
                hidden
                onChange={handleUploadMotivationLetter}
              />
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DocumentPage;
