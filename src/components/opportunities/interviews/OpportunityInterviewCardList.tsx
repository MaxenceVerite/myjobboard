import React from "react";
import { Interview } from "../../../models/opportunities/Opportunity";
import ActionableSection from "../../common/ActionableSection";
import { Button, Card, Grid, alpha } from "@mui/material";
import OpportunityInterviewCard from "./OpportunityInterviewCard";
import { useModal } from "../../../contexts/ModalContext";
import CreateOrEditInterviewForm from "./CreateOrEditInterviewForm";


interface OpportunityInterviewCardListProps {
  opportunityId: string,
  interviews?: Interview[];
  isExpanded: boolean;
}

const OpportunityInterviewCardList = ({ interviews, isExpanded, opportunityId }: OpportunityInterviewCardListProps) => {

const {openModal, closeModal} = useModal();

const handleOpenCreateInterviewModal = () =>{
    openModal(
        "Créer un entretien",
        <CreateOrEditInterviewForm opportunityId={opportunityId} onSubmit={closeModal}/>
    )
    
}

const handleSearchInterview = () =>{

  
}

const handleFilterInterview = ()=> {

}

  return (
    <ActionableSection 
    sectionTitle="Entretiens"
    isExpanded={isExpanded}
    onSearch={handleSearchInterview} 
    onFilter={handleFilterInterview}
    onAddElement={handleOpenCreateInterviewModal}
    >
      <Grid container xs={12}>
        {interviews && 
        interviews.map((interview, index) => (
          <Grid key={index} item xs={6} md={2} marginY={4}>
            <OpportunityInterviewCard opportunityId={opportunityId} interview={interview} />
          </Grid>
        ))}
        {(
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
                onClick={handleOpenCreateInterviewModal}
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

export default OpportunityInterviewCardList;