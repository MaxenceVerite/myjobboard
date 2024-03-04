
const getCheckBoxStyle = (theme) => {
    return {
      styleOverrides: {
        root: {
          padding: "15px",
          borderRadius: 0, // Pas de coins arrondis
          boxShadow: '5px 10px 15px 0 rgba(0,0,0,0.07)', // Applique une ombre de niveau 1 du thème
          textTransform: "none" as const, // Annule la transformation de texte par défaut
          '&:hover': {
            boxShadow: theme.shadows[2], // Applique une ombre de niveau 2 au survol
          },
          '&.MuiButton-containedSuccess': {
            color: theme.palette.secondary.main, // Applique la couleur de texte blanche pour les boutons succès
            '&:hover': {
              // Vous pouvez ajouter des styles supplémentaires pour l'état de survol si nécessaire
            }
          },
        },
      },
    };
  };

  export default getCheckBoxStyle;