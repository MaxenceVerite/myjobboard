import { createTheme } from "@mui/material/styles";
import getTextFieldStyles from "./themes/forms/TextFieldStyle";
import getInputStyles from "./themes/forms/InputStyle";
import getButtonStyles from "./themes/forms/ButtonStyle";
import getCardStyles from "./themes/forms/Divs/CardStyle";
import getSelectStyles from "./themes/SelectStyles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b2cbf",
    },
    secondary: {
      main: "#7690ff",
    },
    success: {
      main: "#c1e712",
    },
    info: {
      main: "#50514f",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#fefcfd",
    },
  },
  typography: {
    fontFamily: [
      "Gotham"
    ].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
 
});

theme.components = 
{ 
    MuiInputBase: {
        styleOverrides: {
          root: {
            boxShadow: '5px 10px 15px rgba(0,0,0,0.07)',
            padding: '10px',
          },
        },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { 
          width: '600px', 
          maxHeight: '90vh', 
  
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: theme.palette.success.main,
        },
        iconHover: {
          color: theme.palette.success.main, 
        },
        iconEmpty: {
          color: theme.palette.success.main, 
        }
      },
    },
    MuiTextField : getTextFieldStyles(theme),
    MuiInput: getInputStyles(theme),
    MuiButton: getButtonStyles(theme),
    MuiCard: getCardStyles(theme),
    MuiSelect: getSelectStyles(theme),
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamBoldItalic.ttf') format('truetype');
        font-weight: bold;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamBook.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamBookItalic.ttf') format('truetype');
        font-weight: normal;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamLight.ttf') format('truetype');
        font-weight: 300;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamLightItalic.ttf') format('truetype');
        font-weight: 300;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamMedium.ttf') format('truetype');
        font-weight: 500;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamMediumItalic.ttf') format('truetype');
        font-weight: 500;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamThin.ttf') format('truetype');
        font-weight: 100;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamThinItalic.ttf') format('truetype');
        font-weight: 100;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamUltraItalic.ttf') format('truetype');
        font-weight: 800;
        font-style: italic;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamXLight.ttf') format('truetype');
        font-weight: 200;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'Gotham';
        src: url('/fonts/GothamXLightItalic.ttf') format('truetype');
        font-weight: 200;
        font-style: italic;
      }
      `,
    },
  }


export default theme;
