import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import categoriesStyles from "../Styles/categories";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCategories } from "../store/categories";


export default function SignUp() {
  const classes = categoriesStyles();
  const categories = useSelector((state) => state.categories);
  const [newCategory, setNewCategory] = useState({});
  const dispatch = useDispatch();

  useEffect((event) => {
      dispatch(getCategories());
  },[dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: `post`,
      url: `http://localhost:8000/api/category`,
      data: newCategory
    })
      .then(() => {
        dispatch(getCategories());
        setNewCategory({name: ""})
      });
  };

  const handleInputChange = (event) => {
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });
    console.log("newProductttttt", newCategory);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Category
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="categoryName"
              label="Category Name"
              name="name"
              autoComplete="category"
              value={newCategory.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
      <Grid>
        <Typography align="center" variant="h4">
          Tus Categorias Son:
        </Typography>
      </Grid>
      <TableContainer>
        <Table>
          <TableBody>
            {categories.map((category) => (
              <TableRow>
                <TableCell>
                  <Typography
                    variant="h6"
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/admin/categories/edit/${category.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button variant="contained" color="primary">
                      Editar
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
