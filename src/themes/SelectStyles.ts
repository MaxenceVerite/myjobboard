export default function getSelectStyles(theme) {
  return {
    styleOverrides: {
      select: {
        backgroundColor: "white",

        "&:focus": {
          backgroundColor: "white",
        }
      },
      icon: {
        color: theme.palette.primary.main,
      },
    },
  };
}
