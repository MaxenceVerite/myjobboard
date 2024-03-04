import React, { useState } from "react";
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
import { Interview, InterviewType } from "../../../models/opportunities/Opportunity";
import { useNavigate } from "react-router-dom";


interface OpportunityInterviewCardProps {
  interview: Interview;
}


const OpportunityInterviewCard: React.FC<OpportunityInterviewCardProps> = ({
    interview,

}) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const {openModal, closeModal} = useModal();

  const handleDelete = async (interview: Interview) => {
    openModal("Suppression d'un entretien", 
    <ConfirmForm text={`L'entretien' ${interview.type} du ${interview.dueDate} va être supprimé. Souhaitez-vous continuer?`} 
    onCancel={closeModal}
    onConfirm={() => {

      closeModal();
    }}
    />
    
    )
   
  };

  const handleInterviewNavigation = ()=> {
    navigate(`/interviews/${interview.id}`)
  }

  const computeInterviewTypeTitle = () => {
    if(interview.type != InterviewType.Other) return interview.type;

    if(interview.customType) return interview.customType;

    return InterviewType.Other;

  }

  const interviewTypeTitle = computeInterviewTypeTitle();

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

      onClick={handleInterviewNavigation}
    >
      <CardContent
        sx={{
          maxWidth: "90%",
          padding: "10px",
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

        <Typography variant="body2" color="text.secondary">
          {new Date(interview.dueDate).toLocaleString("fr-FR", {
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

      </Box>
  
    </Card>
  );
};

export default OpportunityInterviewCard;
