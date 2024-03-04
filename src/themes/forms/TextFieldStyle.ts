export default function getTextFieldStyles(theme) {
  return {
    styleOverrides: {
      root: {
        backgroundColor: 'white',
        "& label.Mui-focused": {
          color: theme.palette.primary.main,
        }
       
      },
    },
  };
}
