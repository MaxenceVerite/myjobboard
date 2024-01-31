import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPageIcon from '@mui/icons-material/ContactPage'; // Pour les CV
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Pour les lettres de motivation
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Pour les autres documents

import { Document } from "../../models/document";
import { DocumentType } from '../../models/document'; // Assurez-vous d'avoir ce type défini

interface DocumentListItemProps {
  doc: Document;
  onDownload: (doc: Document) => void;
  onView: (doc: Document) => void;
  onDelete: (doc: Document) => void;
}

const DocumentListItem: React.FC<DocumentListItemProps> = ({
  doc,
  onDownload,
  onView,
  onDelete,
}) => {
  const getIcon = (type: DocumentType) => {
    switch(type) {
      case DocumentType.CV:
        return <ContactPageIcon />;
      case DocumentType.MOTIVATION_LETTER:
        return <ContactMailIcon />;
      default:
        return <UploadFileIcon />;
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        {getIcon(doc.type)}
      </ListItemIcon>
      <ListItemText
        primary={doc.name}
        secondary={`Téléchargé le : ${doc.uploadedDate}`}
      />
      <IconButton
        edge="end"
        aria-label="view"
        onClick={() => onView(doc)}
      >
        <VisibilityIcon />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="download"
        onClick={() => onDownload(doc)}
      >
        <FileDownloadIcon />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => onDelete(doc)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default DocumentListItem;
