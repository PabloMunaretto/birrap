import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      padding: '0 90px',
      height: 48,
    },
    fbButton:{
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: 'Lucida Grande, Helvetica Neue, Helvetica, Arial, sans-serif',
      display: "inline-block",
      fontSize: "1em",
      background: "#3A5A97",
      color: '#fff',
      textDecoration: 'none',
      height: "3.5em",
      position: 'relative',
      borderRadius: '5px',
      paddingTop: '1em'
    }
  }));

 export default useStyles;