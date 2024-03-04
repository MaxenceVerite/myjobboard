import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Container,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import {
  Interview,
  InterviewType,
  MeetingConditions,
} from "../../../models/opportunities/Opportunity";
import InterlocutorsPicker from "../../interlocutors/InterlocutorsPicker";
import { useDispatch } from "react-redux";
import Interlocutor from "../../../models/opportunities/Interlocutor";

interface CreateOrEditInterviewFormProps {
  interview?: Interview;
  onSubmit: () => void;
}

const CreateOrEditInterviewForm = ({
  interview,
  onSubmit,
}: CreateOrEditInterviewFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const [showCustomType, setShowCustomType] = useState(
    interview && interview.type === interview?.type
  );

  const [_interview, setInterview] = useState<Interview>(
    interview
      ? { ...interview }
      : {
          dueDate: new Date(),
          interlocutorsId: [],
          type: InterviewType.HR,
          meetingConditions: MeetingConditions.Physical,
        }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInterview((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterlocutorSelectionChange = (interlocutors: Interlocutor[]) => {
    const ids = interlocutors.map((c) => c.id!);
    setInterview((prev) => ({ ...prev, interlocutorsId: ids }));
  };

  return (
    <Container maxWidth="sm">
      <Box
        padding="3%"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          select
          margin="normal"
          id="type"
          name="type"
          value={_interview.type}
          label="Type d'entretien"
          variant="standard"
          fullWidth
          onChange={(e) => {
            handleInputChange(e);
            setShowCustomType(e.target.value === InterviewType.Other);
          }}
        >
          {Object.values(InterviewType).map((type) => (
            <MenuItem key={type} value={type}>
              {t(`interviewType.${type}`)}
            </MenuItem>
          ))}
        </TextField>
        {showCustomType && (
          <TextField
            margin="normal"
            id="customType"
            name="customType"
            value={_interview.customType}
            label="Type d'entretien personnalisé"
            variant="standard"
            fullWidth
            onChange={handleInputChange}
          />
        )}
        <TextField
          variant="standard"
          margin="normal"
          fullWidth
          select
          id="meetingConditions"
          name="meetingConditions"
          value={_interview.meetingConditions}
          label="Methode d'entretien"
          onChange={handleInputChange}
        >
          {Object.values(MeetingConditions).map((condition) => (
            <MenuItem key={condition} value={condition}>
              {t(`meetingConditions.${condition}`)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
        variant="standard"
          id="dueDate"
          label="Date de l'entretien"
          type="date"
          name="dueDate"
          margin="normal"
          value={_interview.dueDate}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />

        <InterlocutorsPicker
          preselectedInterlocutors={_interview.interlocutorsId}
          onInterlocutorsSelectionChange={handleInterlocutorSelectionChange}
        />

        <Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mb: "2%" }}>
            Créer
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateOrEditInterviewForm;
