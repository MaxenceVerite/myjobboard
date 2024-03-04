import { alpha } from "@mui/material";

const getButtonStyles = (theme:any) => {
    return {
      styleOverrides: {
        contained: {
          padding: "15px",
          borderRadius: 0, 
          boxShadow: '5px 10px 15px 0 rgba(0,0,0,0.07)', 
          textTransform: "none" as const, 
          color:"white",
          "&:hover": {
            boxShadow: `5px 10px 15px ${alpha(
              theme.palette.success.main,
              0.2
            )}`,
            backgroundColor: theme.palette.success.main
          },

        },
      },
    };
  };

  export default getButtonStyles;