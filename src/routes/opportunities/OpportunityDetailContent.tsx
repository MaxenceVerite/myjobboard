import {
  Grid,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  TextareaAutosize,
  TextField,
  Container,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Article as ArticleIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  EmojiPeopleOutlined,
  Link,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Opportunity, {
  EOpportunityState,
} from "../../models/opportunities/Opportunity";
import { useDispatch } from "react-redux";
import {
  getOpportunity,
  updateOpportunity,
} from "../../store/slices/opportunitySlice";
import { useTranslation } from "react-i18next";
import ApplicationContainer from "../../components/application/ApplicationContainer";
import { fetchDocuments } from "../../store/slices/documentSlice";
import FilterableSection from "../../components/common/FilterableSection";
import ExpendableTextfield from "../../components/common/inputs/ExpendableTextfield";
import DocumentCardList from "../../components/documents/DocumentCardList";
import { useModal } from "../../contexts/ModalContext";
import DocumentPicker from "../../components/documents/forms/DocumentPicker";
import OpportunityInterviewCard from "../../components/opportunities/interviews/OpportunityInterviewCard";
import OpportunityInterviewCardList from "../../components/opportunities/interviews/OpportunityInterviewCardList";
import PhaseStepper from "../../components/common/inputs/PhaseStepper";

const OpportunityDetailContent = () => {
  const { id } = useParams();

  const dispatch = useDispatch<any>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (id) {
      dispatch(getOpportunity({ id }));
    }
  }, [id, dispatch]);

  const opportunity = useSelector(
    (state: RootState) => state.opportunities.currentOpportunity
  );

  useEffect(() => {
    if (opportunity?.associatedDocumentsId) {
      dispatch(fetchDocuments());
    }
  }, [opportunity, dispatch]);

  const opportunityDocuments = useSelector((state: RootState) =>
    state.documents.documents.filter(
      (doc) =>
        opportunity?.associatedDocumentsId &&
        opportunity.associatedDocumentsId.includes(doc.id)
    )
  );

  const activeStep = EOpportunityState.APPLIED;

  const phases: EOpportunityState[] = useSelector(
    (state: RootState) => state.opportunities.opportunityStates
  );
  const [opportunityCompany] = useSelector((state: RootState) =>
    state.companies.companies.filter((c) => c.id == opportunity!.companyId)
  );

  const companyName = opportunityCompany?.name ?? "Enseigne";

  const handleJoinedDocumentsChange = (selectedDocumentIds: string[]) => {
    const safeOpportunity = {
      ...opportunity!,
      associatedDocumentsId: selectedDocumentIds,
    };

    dispatch(updateOpportunity({ opportunity: safeOpportunity }));
    closeModal();
  };

  const handleJoinDocument = () => {
    openModal(
      "Selectionner un document",
      <DocumentPicker
        preselectedDocumentIds={opportunity?.associatedDocumentsId}
        multipleSelection
        notifyOnCommit
        onSelectionChange={handleJoinedDocumentsChange}
      />
    );
  };

  const saveOpportunityNotes = () => {
 
    if (opportunity?.freeNotes !== note) {
      dispatch(
        updateOpportunity({
          opportunity: { ...opportunity!, freeNotes: note },
        })
      );
    }
  };

  const [note, setNote] = useState(opportunity?.freeNotes || "");


  if (!opportunity || !id) {
    return null;
  }

 
  return (
    <Grid container xs={12}>
      <Grid container xs={12} mb={4}>
        <Grid item xs={6}>
          <Typography
            noWrap
            fontWeight={500}
            variant="h5"
            color="secondary"
            sx={{
              maxWidth: "30vh",
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
            onClick={(e) => {
              e.stopPropagation;
              opportunity.companyId
                ? navigate(`/sheets/companies/${opportunity.companyId}`)
                : undefined;
            }}
          >
            {companyName}
          </Typography>

          <Typography
            noWrap
            fontWeight={500}
            variant="h6"
            color="primary"
            sx={{ maxWidth: "30vh" }}
          >
            {opportunity.roleTitle}
          </Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={2}>
          <Button color="info" variant="text" startIcon={<ArticleIcon />}>
            Voir le résumé
          </Button>
        </Grid>
      </Grid>

      <Grid container xs={12} mb={4}>
        <Grid item xs={6}>
          <Button
            size="small"
            color="primary"
            variant="text"
            startIcon={<Link />}
          >
            Lien vers l'offre
          </Button>
        </Grid>
      </Grid>

      <Box width="100%" mb={5}>
      <PhaseStepper currentPhase={opportunity.state} />
      </Box>
      <FilterableSection sectionTitle="Notes" isExpanded>
        <TextareaAutosize
          minRows={6}
          style={{
            width: "100%",
            resize: "vertical",
            padding: 10,
            fontSize: "1rem",
            borderColor: "0",
            border: "0",
            boxShadow: "5px 10px 15px rgba(0,0,0,0.07)",
            outline: "none",
          }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={saveOpportunityNotes}
        />
      </FilterableSection>

      <DocumentCardList
        customAddDocument={handleJoinDocument}
        title="Documents envoyés"
        documents={opportunityDocuments}
        isExpanded
      />

      <OpportunityInterviewCardList
        opportunityId={opportunity.id!}
        interviews={opportunity.interviews}
        isExpanded
      />

      <FilterableSection sectionTitle="Offres" isExpanded>
        <TextareaAutosize
          minRows={6}
          style={{
            width: "100%",
            resize: "vertical",
            padding: 10,
            fontSize: "1rem",
            borderColor: "0",
            border: "0",
            boxShadow: "5px 10px 15px rgba(0,0,0,0.07)",
            outline: "none",
          }}
        />
      </FilterableSection>

      <Grid md={1}></Grid>
      <Grid xs={12} md={4} mb="3%"></Grid>
      <Grid xs={12}></Grid>
      <Grid xs={12}></Grid>
      <Grid xs={12}></Grid>
    </Grid>
  );
};

export default OpportunityDetailContent;
