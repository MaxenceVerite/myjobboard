import React, { useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Card,
  Box,
  Tooltip,
  alpha,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactPageIcon from "@mui/icons-material/ContactPage"; // Pour les CV
import ContactMailIcon from "@mui/icons-material/ContactMail"; // Pour les lettres de motivation
import UploadFileIcon from "@mui/icons-material/UploadFile"; // Pour les autres documents

import { Document } from "../../models/document";
import { DocumentType } from "../../models/document"; // Assurez-vous d'avoir ce type défini
import { useDispatch } from "react-redux";
import { downloadDocument, deleteDocument } from "../../store/slices/documentSlice";
import { downloadDocumentOnUserPc } from "../../helpers/fileHelper";
import CVPicto from "../common/CVPicto";
import MotivationLetterPicto from "../common/MotivationLetterPicto";
import DocumentForm from "./forms/DocumentForm";
import { useModal } from "../../contexts/ModalContext";
import ConfirmForm from "../common/forms/ConfirmForm";

import { getIconSvg } from "../utils/AssetsUtils";

interface DocumentCardProps {
  doc: Document;
  showDownload?: boolean;
  showPreview?: boolean;
  showDelete?: boolean;
}


const DocumentCard: React.FC<DocumentCardProps> = ({
  doc,
  showDownload,
  showDelete,
}) => {
  const dispatch = useDispatch<any>();

  const {openModal, closeModal} = useModal();

  const handleDelete = async (doc: Document) => {
    openModal("Suppression d'un document", 
    <ConfirmForm text={`Le document ${doc.name} va être supprimé. Souhaitez-vous continuer?`} 
    onCancel={closeModal}
    onConfirm={() => {
      dispatch(deleteDocument(doc.id));
      closeModal();
    }}
    />
    
    )
   
  };

  const handlePreview = (doc: Document) => {
    dispatch(downloadDocument(doc.id)).then((action) => {
      if (downloadDocument.fulfilled.match(action)) {
        const blob = action.payload;
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    });
  };

  const handleDownload = async (doc: Document) => {
    dispatch(downloadDocument(doc.id)).then((action) => {
      if (downloadDocument.fulfilled.match(action)) {
        const blob = action.payload;
        downloadDocumentOnUserPc(doc.name, blob);
      }
    });
  };

 

  const openEditModal = (e) => {
    e.stopPropagation();
    openModal(
     "Modifier le document",
      <DocumentForm document={doc} onSubmit={closeModal}/>
    )
  }

  return (
    <Card
      sx={(theme) => ({
        height: 260,
        minWidth: 200,
        margin: 1,
        paddingTop: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "& .icon-svg": {
          color: theme.palette.secondary.main,
        },
        "&:hover": {
          borderColor: theme.palette.success.main,
          boxShadow: `5px 10px 15px ${alpha(theme.palette.success.main, 0.5)}`,
          "& .icon-svg": {
            color: theme.palette.success.main,
          },
          "& .text-primary": {
            color: theme.palette.success.main,
          },
          "& .text-secondary": {
            color: theme.palette.success.main,
          },
          "& .actions .MuiIconButton-root": {
            color: theme.palette.success.main,
          },
        },
        "&:hover .actions": {
          opacity: 1
        }
      })}

      onClick={openEditModal}
    >
      <CardMedia  sx={{ padding: "10px" }}>
        {getIconSvg(doc.type, "icon-svg")}
      </CardMedia>
      <CardContent
        sx={{
          maxWidth: "90%",
          padding: "10px",
        }}
      >
        <Tooltip title={doc.name} placement="top" arrow>
          <Typography
            noWrap
            fontWeight="500"
            color="primary"
            gutterBottom
            variant="h6"
            className="text-primary"
          >
            {doc.name}
          </Typography>
        </Tooltip>
        <Tooltip title={doc.name} placement="top" arrow>
          <Typography
            noWrap
            variant="body2"
            color="secondary"
            className="text-secondary"
            onClick={(e)=>{e.stopPropagation(); handlePreview(doc)}}
            sx={{
              "&:hover": {
                textDecoration:"underline",
                cursor: "pointer"
              }
            }}
          >
            {doc.name}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary">
          {new Date(doc.uploadedDate).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </Typography>
      </CardContent>
      <Box
        className="actions"
        sx={{
          position: "absolute",
          top: 0,
          opacity: 0,
          width: "100%",
          transition: "opacity 0.3s ease-in-out",
          "& .MuiIconButton-root": {
            m: 0.5,
          },
        }}
      >

        {showDownload && (
          <IconButton onClick={(e) => { e.stopPropagation(); handleDownload(doc)}}
          sx={{
            position: "absolute",
            top: 0,
            left: 5
          }}
          >
            <FileDownloadIcon />
          </IconButton>
        )}
        {showDelete && (
          <IconButton onClick={(e) =>{  e.stopPropagation(); handleDelete(doc)}}
          sx={{
            position: "absolute",
            top: 0,
            right: 5
          }}
          >
            
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
  
    </Card>
  );
};

export default DocumentCard;
