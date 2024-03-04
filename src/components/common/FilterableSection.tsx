import React, { useState } from "react";
import { Box,Typography,IconButton, Collapse, Grid } from "@mui/material";
import { Tune,NoteAdd, Search, ExpandLess, ExpandMore, Expand } from "@mui/icons-material";


interface FilterableSectionProps {
  sectionTitle: string,
  isExpanded?: boolean,
  children: React.ReactNode

}
const FilterableSection = ({sectionTitle, isExpanded, children}: FilterableSectionProps) => {

  const [localIsExpanded, setLocalIsExpanded] = useState(isExpanded ?? false);
  const handleExpandClick = () => {
    setLocalIsExpanded(!localIsExpanded);
  };


  return (
    <>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="info.main" fontWeight={500} variant="h5" flexGrow={1}>
            {sectionTitle}
          </Typography>
          <Box>
            <IconButton>
              <Tune />
            </IconButton>
            <IconButton>
              <NoteAdd />
            </IconButton>
            <IconButton>
              <Search />
            </IconButton>
            <IconButton onClick={handleExpandClick}>
              {localIsExpanded ? <ExpandLess /> : <ExpandMore color="primary" />}
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Collapse
        sx={{ width: "100%" }}
        in={localIsExpanded}
        timeout="auto"
        unmountOnExit
      >
       
      {children}

      </Collapse>
    </>
    
  );
};

export default FilterableSection;
