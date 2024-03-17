import {
  Box,
  Button,
  Card,
  Collapse,
  Grid,
  IconButton,
  Typography,
  alpha,
} from "@mui/material";
import React, { useRef, useState } from "react";
import DocumentCard from "./DocumentCard";
import { Document, DocumentType } from "../../models/document";
import {
  ExpandLess,
  ExpandMore,
  NoteAdd,
  Search,
  Tune,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { uploadDocument } from "../../store/slices/documentSlice";
import ActionableSection from "../common/ActionableSection";

interface DocumentCardListProps {
  title: string;
  documentType?: DocumentType;
  documents?: Document[];
  isExpanded?: boolean;
  customAddDocument?: () => void;
}
const DocumentCardList = ({
  title,
  documentType,
  documents,
  isExpanded,
  customAddDocument,
}: DocumentCardListProps) => {
  const fileInputRef = useRef<any>(null);
  const dispatch = useDispatch<any>();

  const handleAdd = () => {
    if (customAddDocument) {
      customAddDocument();
      return;
    }

    fileInputRef.current.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) return;

    const file = event.target.files[0];
    if (!file || !documentType) return;

    dispatch(uploadDocument({ file: file, type: documentType }));
  };

  const handleFilter = ()=>{

  }

  const handleSearch = ()=>{

  }

  return (
    <ActionableSection
      sectionTitle={title}
      isExpanded={isExpanded}
      onAddElement={handleAdd}
      onFilter={handleFilter}
      onSearch={handleSearch}
    >
      <Grid container xs={12}>
        {documents && documents.map((doc, index) => (
          <Grid key={index} item xs={6} md={2} marginY={4}>
            <DocumentCard doc={doc} showDelete showDownload />
          </Grid>
        ))}
        {(documentType || customAddDocument) && (
          <Grid item xs={6} md={2} marginY={4}>
            <Card
              sx={(theme) => ({
                height: 260,
                minWidth: 80,
                margin: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "5px 10px 15px rgba(0,0,0,0.07)",
                "&:hover": {
                  boxShadow: `5px 10px 15px ${alpha(
                    theme.palette.success.main,
                    0.5
                  )}`,
                },
              })}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                style={{ display: "none" }}
              />
              <Button
                variant="contained"
                sx={{
                  fontWeight: "400",
                  fontSize: "48px",
                  color: "common.white",
                  backgroundColor: "secondary.main",
                  width: "100%",
                  height: "100%",
                }}
                onClick={handleAdd}
              >
                +
              </Button>
            </Card>
          </Grid>
        )}
      </Grid>
    </ActionableSection>
  );
};

export default DocumentCardList;
