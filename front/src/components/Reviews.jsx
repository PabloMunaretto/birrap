import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Button,
  Avatar,
  Typography,
  Grid,
  TextField,
  NativeSelect
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { writeReview } from "../store/review";
import { getUser, getFbUser } from "../store/user";
import StarRateIcon from "@material-ui/icons/StarRate";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import reviewsStyles from "../Styles/reviews"


const Reviews = ({ productId }) => {
  const classes = reviewsStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [review, setReview] = useState({});
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(localStorage.getItem("id")){
      dispatch(getFbUser(localStorage.getItem("id")))
      .then((foundUser) => {
        const user= foundUser.payload
        const data= { review, productId, user }
        dispatch(writeReview(data))
        .then(() => history.push("/me"))
      })
    }
    else{
    dispatch(getUser()).then((foundUser) => {
      const user = foundUser.payload;
      const data = { review, productId, user };
      dispatch(writeReview(data)).then(() => history.push("/me"));
    });
  }};

  const printStar = (amount) => {
    let arrRteurn = [];
    for (let i = 0; i < amount; i++) {
      arrRteurn.push(<StarRateIcon />);
    }
    return arrRteurn;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={2}>
        <Grid item xs={12} >
            <Typography component="h1" variant="h5">
              <label name="stars" for="stars">
                Evalúa el producto
              </label>
            </Typography>
            </Grid>
            <br />
            
            {printStar(review.stars)}
            <br />
            <Grid item xs={12} >
            <NativeSelect id="select"
            fullWidth
              name="stars"
              value={review.stars}
              size="1"
              required
              onChange={handleChange}
            >
              <option> </option>
              <option value="1">1 estrella </option>
              <option value="2">2 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="5">5 estrellas</option>
            </NativeSelect>
            </Grid>
            <br />
            <br />
            <Grid item xs={12} >
            <span>Titulo</span>
            <br />
            <TextField
              name="title"
              type="text"
              fullWidth
              required
              placeholder=""
              onChange={handleChange}
            />
            </Grid>
            <Grid item xs={12} >
            <span>Descripción</span>
            <br />
            <TextField
              name="description"
              type="text"
              required
              fullWidth
              placeholder=""
              onChange={handleChange}
            />
            </Grid>
            </Grid>
          <div>
            <br />
            <Button fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} type="submit">Enviar</Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Reviews;
