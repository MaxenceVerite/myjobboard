import React from "react";
import {
  Button,
  Typography,
  Grid,
} from "@mui/material";

interface ConfirmFormProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({ text, onConfirm, onCancel }) => {
  return (
    <form>
      <Typography variant="body2" align="center" sx={{ marginBottom: 3 }}>
        {text}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
    
            variant="contained"
            color="info"
            onClick={onCancel}
          >
            Annuler
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{ color: "white" }}
            variant="contained"
            color="secondary"
            onClick={onConfirm}
          >
            Confirmer
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ConfirmForm;
