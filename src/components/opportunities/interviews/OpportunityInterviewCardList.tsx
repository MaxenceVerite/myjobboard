import React from "react";
import { Interview } from "../../../models/opportunities/Opportunity";
import FilterableSection from "../../common/FilterableSection";
import { Button, Card, Grid, alpha } from "@mui/material";
import OpportunityInterviewCard from "./OpportunityInterviewCard";
import { useModal } from "../../../contexts/ModalContext";
import CreateOrEditInterviewForm from "./CreateOrEditInterviewForm";


interface OpportunityInterviewCardListProps {
  interviews: Interview[];
  isExpanded: boolean;
}

const OpportunityInterviewCardList = ({ interviews, isExpanded }) => {

const {openModal, closeModal} = useModal();

const handleOpenCreateInterviewModal = () =>{
    openModal(
        "Créer un entretien",
        <CreateOrEditInterviewForm onSubmit={closeModal}/>
    )
    
}

const handleOpenEditInterviewModal = (interview: Interview) =>{
    openModal(
        "Modifier un entretien",
        <CreateOrEditInterviewForm /*interview={null}*/ onSubmit={closeModal}/>
    )
    
}

  return (
    <FilterableSection sectionTitle="Entretiens" isExpanded={isExpanded}>
      <Grid container xs={12}>
        {interviews.map((interview, index) => (
          <Grid key={index} item xs={6} md={2} marginY={4}>
            <OpportunityInterviewCard interview={interview} />
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
    </FilterableSection>
  );
};

export default OpportunityInterviewCardList;