import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Paper } from "@mui/material";
import { useMemo } from "react";

import { styled } from "@mui/material/styles";
import { fetchDocuments } from "../../store/slices/documentSlice";

import { RootState, AppDispatch } from "../../store/store";
import { Document, DocumentType } from "../../models/document";

import DocumentCardList from "../../components/documents/DocumentCardList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const LAST_DOCUMENT_DISPLAYED_ITEM_NUMBER = 3;

const DocumentPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const documents = useSelector(
    (state: RootState) => state.documents.documents
  );

  const cvs = useMemo(
    () => documents.filter((doc) => doc.type === DocumentType.CV),
    [documents]
  );
  const motivationLetters = useMemo(
    () =>
      documents.filter((doc) => doc.type === DocumentType.MOTIVATION_LETTER),
    [documents]
  );
  const [lastDocuments, setLastDocuments] = useState<Document[]>([]);

  useEffect(() => {
    dispatch(fetchDocuments());
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
  }, [document]);

  return (
    <Grid container xs={12} spacing="2">
      <DocumentCardList
        title="Mes derniers documents"
        documents={lastDocuments}
        isExpanded={false}
      />
      <DocumentCardList
        title="Mes CV"
        documentType={DocumentType.CV}
        documents={cvs}
        isExpanded
      />
      <DocumentCardList
        title="Mes lettres de motivations"
        documentType={DocumentType.MOTIVATION_LETTER}
        documents={motivationLetters}
        isExpanded
      />
    </Grid>
  );
};

export default DocumentPage;
