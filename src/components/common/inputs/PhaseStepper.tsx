// PhaseStepper.js
import React from 'react';
import { Box } from '@mui/material';
import PhaseStepperItem from './PhaseStepperItem';
import { EOpportunityState } from '../../../models/opportunities/Opportunity';


const stepPhases = {
  'Candidature': [EOpportunityState.APPLIED],
  'Entretien(s)': [EOpportunityState.INTERVIEWING],
  'Proposition(s)': [EOpportunityState.NEGOCIATION_ON_OFFERS],
  'Signature': [EOpportunityState.VALIDATED, EOpportunityState.REFUSED],
  'Archivé': [EOpportunityState.ABORTED, EOpportunityState.ARCHIVED],
};


const getCurrentStep = (currentPhase) => {
  return Object.keys(stepPhases).find(step =>
    stepPhases[step].includes(currentPhase)
  );
};


const isStepValidated = (step, currentPhase) => {
  const steps = Object.keys(stepPhases);
  const currentStepIndex = steps.indexOf(getCurrentStep(currentPhase)!);
  const stepIndex = steps.indexOf(step);
  return stepIndex < currentStepIndex;
};


const isStepFailed = (step, currentPhase) => {
  return step === 'Signature' && currentPhase === EOpportunityState.REFUSED;
};

const PhaseStepper = ({ currentPhase }) => {
  const currentStep = getCurrentStep(currentPhase);

  return (
    <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
      {Object.keys(stepPhases).map((step, index) => (
        <PhaseStepperItem
          key={index}
          isValidated={isStepValidated(step, currentPhase)}
          isFailed={isStepFailed(step, currentPhase)}
          isCurrentPhase={step === currentStep}
          itemName={step}
        />
      ))}
    </Box>
  );
};

export default PhaseStepper;
