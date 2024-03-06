// PhaseStepperItem.js
import React from 'react';
import { Paper, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cancel } from '@mui/icons-material';


interface PhaseStepperItemProps{
    isValidated:boolean,
    isCurrentPhase: boolean,
    itemName: string,
    isFailed: boolean

}
const PhaseStepperItem = ({
    isValidated,
    isCurrentPhase,
    itemName,
    isFailed
  }: PhaseStepperItemProps) => {
    return (
      <Paper
        elevation={isValidated || isCurrentPhase ? 4 : 1}
        sx={{
          padding: '6px 12px',
          display: 'flex',
          flexDirection: 'row', // Align items in a row
          justifyContent: 'center', // Center items horizontally
          alignItems: 'center', // Center items vertically
          flex: 1, // Make items flexible and equally spaced
          backgroundColor: isCurrentPhase ? 'primary.main' : 'background.paper',
          color: isCurrentPhase ? 'common.white' : 'text.primary',
          '&:hover': {
            backgroundColor: isCurrentPhase ? 'primary.dark' : undefined,
          },
        }}
      >
        <Typography variant="subtitle1" sx={{ marginRight: isValidated || isFailed ? 1 : 0 }}>
          {itemName}
        </Typography>
        {isValidated && !isFailed && <CheckIcon color="success" />}
        {isFailed && <Cancel color="error" />}
      </Paper>
    );
  };
  
  export default PhaseStepperItem;
  
