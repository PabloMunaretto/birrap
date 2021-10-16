import React, { useEffect, useState } from "react";
import { loginUser, logFbUser, getFbUser } from "../store/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUser } from "../store/user";
import { getCarrito } from "../store/carrito";
import FacebookLogin from "react-facebook-login";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import loginStyles from "../Styles/login";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({});
  const classes = loginStyles();

  const responseFacebook = (response) => {
    dispatch(logFbUser(response))
      .then(() => dispatch(getFbUser(localStorage.getItem("id"))))
      .then(() => history.push("/"));
  };

  const componentClicked = () => {
    console.log("logueado desde facebook");
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(newUser))
      .then(() => dispatch(getUser()))
      .then((usuario) => {
        // pregunto por usuario y no por el estado user porque por alguna razon en este paso todavia no existe

        if (usuario.payload) {
          // console.log("usuario", usuario)
          dispatch(getCarrito(usuario.payload.id));
          return history.push("/");
        } else {
          setError(true);
        }
      })
      .catch();
  };
  useEffect(() => {}, [error]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        {/* <img src={process.env.PUBLIC_URL + '/bi.jpg'} alt="logo"  style={{ width: 200, height: 200 }}/> */}
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            onClick={() => setError(false)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onClick={() => setError(false)}
            onChange={handleChange}
          />
          {error && (
            <div
              style={{
                background: "rgb(191, 47, 34)",
                textAlign: "center",
                padding: "0.4em",
                borderRadius: "2em",
                color: "white",
              }}
            >
              Hubo un error de logueo
            </div>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <br />
          <FacebookLogin
            size="small"
            cssClass={classes.fbButton}
            appId="193196372226034"
            autoLoad={false}
            fullWidth
            textButton=" LOGIN WITH FACEBOOK"
            fields="name,email,picture"
            onClick={componentClicked}
            icon="fa-facebook"
            callback={responseFacebook}
          />
        </form>
      </div>
    </Container>
  );
};
export default Login;
