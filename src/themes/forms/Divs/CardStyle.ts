
const getCardStyles = (theme:any) => {
    return {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '5px 10px 15px 0 rgba(0,0,0,0.07)', // Applique une ombre de niveau 1 du thème

        },
      },
    };
  };

  export default getCardStyles;