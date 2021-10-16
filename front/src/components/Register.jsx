import React, { useState } from "react";
import { registerUser } from "../store/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import registerStyles from "../Styles/register"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FastfoodIcon from "@material-ui/icons/Fastfood";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Birrapp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({});
  const classes = registerStyles();
  
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(newUser))
      .then((usuario) => {
        if (usuario) history.push("/login")
      })
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
   
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
      
          <form className={classes.form} noVAlidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
          </Grid>
        
              <br/> <br/>  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
              > Guardar
            </Button>
            <Grid container justify="flex-end">
            <Grid item>
            
            </Grid>
          </Grid>
          </form>
        </div>
     
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
};

export default Register;
