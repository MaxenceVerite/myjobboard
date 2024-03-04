import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { SouthEast } from "@mui/icons-material";



const ExpendableTextfield = ({ isExtended, ...textFieldProps }) => {
  const [localIsExpanded, setLocalIsExpanded] = useState(isExtended?? false);

  return (
    <>
      <TextField multiline rows={localIsExpanded ? 15 : 5} {...textFieldProps}>
        <IconButton sx={{ position: "absolute", right: "5px", bottom: "5px" }}>
            <SouthEast/>
        </IconButton>
      </TextField>
    </>
  );
};

export default ExpendableTextfield;
