import React, { useEffect, useState } from "react";
import {
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Card,
  Box,
  Tooltip,
  alpha,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";

import { useModal } from "../../../contexts/ModalContext";
import ConfirmForm from "../../common/forms/ConfirmForm";
import {
  Interview,
  InterviewType,
} from "../../../models/opportunities/Opportunity";
import { useNavigate } from "react-router-dom";
import CreateOrEditInterviewForm from "./CreateOrEditInterviewForm";
import { useTranslation } from "react-i18next";
import { deleteInterview } from "../../../store/slices/opportunitySlice";
import { getInterlocutors } from "../../../store/slices/interlocutorSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { EventNote } from "@mui/icons-material";

interface OpportunityInterviewCardProps {
  opportunityId: string;
  interview: Interview;
}

const OpportunityInterviewCard: React.FC<OpportunityInterviewCardProps> = ({
  opportunityId,
  interview,
}) => {
  const dispatch = useDispatch<any>();

  const { t } = useTranslation();
  const { openModal, closeModal } = useModal();

  const interlocutors = useSelector(
    (state: RootState) => state.interlocutors.interlocutors
  );

  useEffect(() => {
    if (!interview?.interlocutorsId) return;

    if (interview.interlocutorsId.length === 0) {
      dispatch(getInterlocutors());
    }
  }, [dispatch, interview.interlocutorsId?.length]);

  const handleDelete = async () => {
    openModal(
      "Suppression d'un entretien",
      <ConfirmForm
        text={`L'entretien "${t(`interviewType.${interview.type}`)}" du ${
          interview.dueDate
        } va être supprimé. Souhaitez-vous continuer?`}
        onConfirm={() => {
          dispatch(
            deleteInterview({
              interviewId: interview.id!,
              opportunityId: opportunityId,
            })
          );
          closeModal();
        }}
      />
    );
  };

  const handleOpenEditInterviewModal = () => {
    openModal(
      "Modifier un entretien",
      <CreateOrEditInterviewForm
        opportunityId={opportunityId}
        interview={interview}
        onSubmit={closeModal}
      />
    );
  };

  const computeInterviewTypeTitle = () => {
    if (interview.type != InterviewType.Other)
      return t(`interviewType.${interview.type}`);

    if (interview.customType) return interview.customType;

    return t(`interviewType.${InterviewType.Other}`);
  };

  const interviewTypeTitle = computeInterviewTypeTitle();

  const interlocutorNames: string = interview.interlocutorsId
    ? interlocutors
        .filter((interlocutor) =>
          interview.interlocutorsId.includes(interlocutor.id!)
        )
        .map(
          (interlocutor) => `${interlocutor.firstName} ${interlocutor.lastName}`
        )
        .join(", ")
    : "";

  const multipleInterlocutors = interlocutorNames.split(", ").length > 1;

  return (
    <Card
      sx={(theme) => ({
        height: 260,
        minWidth: 200,
        margin: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        paddingTop: 1,
        alignItems: "left",
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
          opacity: 1,
        },
      })}
      onClick={handleOpenEditInterviewModal}
    >
      <CardContent
        sx={{
          padding: "10px",
          paddingBottom: 0,
          maxWidth: "90%",
        }}
      >
        <Tooltip title={interviewTypeTitle} placement="top" arrow>
          <Typography
            noWrap
            fontWeight="500"
            color="primary"
            gutterBottom
            variant="h6"
            className="text-primary"
          >
            {interviewTypeTitle}
          </Typography>
        </Tooltip>

        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
          {t(`meetingConditions.${interview.meetingCondition}`)}
        </Typography>

        {interview?.interlocutorsId && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {multipleInterlocutors ? (
              <Tooltip title={interlocutorNames}>
                <Typography variant="body2">{`${
                  interlocutorNames.split(", ")[0]
                }, ...`}</Typography>
              </Tooltip>
            ) : (
              <Typography variant="body2">{interlocutorNames}</Typography>
            )}
          </Box>
        )}
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          paddingTop: 0,
        }}
      >
        <EventNote color="action" />
        <Typography variant="body2" sx={{ marginLeft: "10px" }}>
          {new Date(interview.dueDate).toLocaleDateString(t("locale"), {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
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
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          sx={{
            position: "absolute",
            top: 0,
            right: 5,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default OpportunityInterviewCard;
