import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
      flexGrow: 1,
  
    },
    children: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "20px",
      backgroundColor: "#A41313",
      borderRadius: "20px",
      color: "white",
      fontSize: "120%", 
      height: "50%", 
      width: "50%"
    },
    cuadro: {
      padding: "20px",
      alignItems: "center"
    },
    carrito: {
      padding: theme.spacing(2),
      alignSelf: "flex-start"
    },
    text1: {
      alignItems: "center",
      fontSize: "200%"
    },
    text: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "150%"
    }
  }))
  export default useStyles;