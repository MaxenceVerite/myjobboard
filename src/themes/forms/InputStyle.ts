export default function getInputStyles(theme) {
    return {

      styleOverrides: {
      
        underline: {

          '&:before': {
            display: 'none',
          },
          '&:hover:not(.Mui-disabled):before': {
            display: 'none',
          },
          '&:after': {
     
            borderBottom: 0, 
          },
        }
      }
    }
       
}