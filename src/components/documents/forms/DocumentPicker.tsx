import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocuments } from "../../../store/slices/documentSlice";
import { RootState } from "../../../store/store";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import { Document, DocumentType } from "../../../models/document";
import { getIconSvg } from "../../utils/AssetsUtils";
import { useTranslation } from "react-i18next";

interface DocumentPickerProps {
  preselectedDocumentIds?: string[];
  multipleSelection: boolean;
  notifyOnCommit: boolean;
  onSelectionChange: (selectedIds: string[]) => void;
}

const DocumentPicker = ({
  preselectedDocumentIds,
  multipleSelection,
  notifyOnCommit,
  onSelectionChange,
}: DocumentPickerProps) => {
  const dispatch = useDispatch<any>();
  const documents = useSelector(
    (state: RootState) => state.documents.documents
  );
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>(
    preselectedDocumentIds ?? []
  );
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleToggleCheckbox = (docId: string) => {
    const newSelectedDocumentIds = !multipleSelection
      ? [docId]
      : selectedDocumentIds.includes(docId)
      ? selectedDocumentIds.filter((id) => id !== docId)
      : [...selectedDocumentIds, docId];

    setSelectedDocumentIds(newSelectedDocumentIds);
    if (!notifyOnCommit) onSelectionChange(newSelectedDocumentIds);
  };

  const getDocumentTypeIcon = (type: DocumentType): React.ReactNode => {
    return getIconSvg(type, undefined, "30px");
  };



  return (
    <>
      <List sx={{ width: "100%" }}>
        {documents.map((doc) => (
          <ListItem
            key={doc.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={() => handleToggleCheckbox(doc.id)}
                checked={selectedDocumentIds.includes(doc.id)}
                color="success"
              />
            }
            disablePadding
            onClick={(e) => {
              e.stopPropagation();
              handleToggleCheckbox(doc.id);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{getDocumentTypeIcon(doc.type)}</ListItemIcon>
              <ListItemText
                primary={doc.name}
                secondary={`${t(
                  `documentType.${doc.type.toString()}`
                )}${" - "}${new Date(doc.uploadedDate).toLocaleDateString()}`}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <Button
            variant="contained"
            color="info"
            fullWidth
            sx={{
              width: "100%",
            }}
            onClick={() => {}}
          >
            +
          </Button>
        </ListItem>
      </List>
      {notifyOnCommit && (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
            variant="contained"
            onClick={() => onSelectionChange(selectedDocumentIds)}
            color="secondary"
            fullWidth
          >
            Valider la sélection
          </Button>
        </Box>
      )}
    </>
  );
};

export default DocumentPicker;
