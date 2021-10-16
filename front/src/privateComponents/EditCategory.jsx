import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getCategory } from "../store/category";
import editCategoriesStyles from "../Styles/editCategories";


export default function FormEditCategory({ categoryId }) {
  const classes = editCategoriesStyles();
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState({}); //El select es un componente controlado, pero si no el primer valor que toma al renderizarse es `undefined`, react lo considera un componente descontrolado. Lo que genera problemas al renderizar. De esta manera se le agrega provisoriamente un `categoryId` el cual es mas tarde cambiado por el setEditProduct correctamente.
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategory(categoryId)).then((res) =>
      setEditCategory(res.payload)
    );
  }, [dispatch, categoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando categoria", editCategory);
    axios({
      method: `put`,
      url: `http://localhost:8000/api/category`,
      data: editCategory,
    }).then(() => history.push("/admin/categories"));
  };

  const handleInputChange = (event) => {
    setEditCategory({
      ...editCategory,
      [event.target.name]: event.target.value,
    });
    console.log("editProductttttt", editCategory);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Category
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="categoryname"
                label="Category Name"
                value={editCategory.name || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save & Edit
          </Button>
        </form>
      </div>
    </Container>
  );
}
