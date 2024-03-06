import React from "react";
import { Button, Typography, Grid } from "@mui/material";

interface ConfirmFormProps {
  text: string;
  onConfirm: () => void;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({ text, onConfirm }) => {
  return (
    <form>
      <Typography variant="body2" align="center" sx={{ marginBottom: 3 }}>
        {text}
      </Typography>

      <Button
        sx={{ color: "white" }}
        fullWidth
        variant="contained"
        color="secondary"
        onClick={onConfirm}
      >
        Confirmer
      </Button>
    </form>
  );
};

export default ConfirmForm;
