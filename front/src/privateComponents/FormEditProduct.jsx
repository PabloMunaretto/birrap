import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getProduct } from "../store/singleProduct";
import formEditProductStyles from "../Styles/formEditProduct";


export default function FormEditProduct({ productId }) {
  const classes = formEditProductStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [editProduct, setEditProduct] = useState({ categoryId: 1 }); //El select es un componente controlado, pero si no el primer valor que toma al renderizarse es `undefined`, react lo considera un componente descontrolado. Lo que genera problemas al renderizar. De esta manera se le agrega provisoriamente un `categoryId` el cual es mas tarde cambiado por el setEditProduct correctamente.
  const history = useHistory();

  useEffect(() => {
    dispatch(getProduct(productId)).then((res) => setEditProduct(res.payload));
  }, [dispatch, productId]);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    axios({
      method: `put`,
      url: `http://localhost:8000/api/product/${id}`,
      data: editProduct,
    }).then(() => history.push("/admin/products"));
  };

  const handleInputChange = (event) => {
    setEditProduct({ ...editProduct, [event.target.name]: event.target.value });
    console.log("editProductttttt", editProduct);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e, editProduct.id)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="productName"
                label="Product Name"
                value={editProduct.name || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="url"
                name="url"
                label="Picture URL"
                value={editProduct.url || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Price"
                id="price"
                name="price"
                value={editProduct.price || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={editProduct.description || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="stock"
                name="stock"
                label="Stock"
                value={editProduct.stock || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                required
                fullWidth
                label="Category"
                variant="outlined"
                name="categoryId"
                value={editProduct.categoryId || ""}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
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
