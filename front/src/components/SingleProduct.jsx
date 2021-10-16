import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/singleProduct"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarRateIcon from '@material-ui/icons/StarRate';
import productStyles from "../Styles/products"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { TableCell, Button } from '@material-ui/core';
import { addItemToCarrito } from "../store/items"

// - visual de cada item: (imagen del producto, descripcion del producto, precio, reviews, y valoracion)

const SingleProduct = ({ productId }) => {
  const classes = productStyles();
  const dispatch = useDispatch();
  const product = useSelector(state => state.singleProduct)
  const carrito = useSelector((state) => state.carrito);
  const reviews = product.reviews

  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch, productId])

  const addToCart = (productId) => {
    const itemData = {
      cartId: carrito.id,
      productId,
      qty: 1
    }
    return dispatch(addItemToCarrito(itemData));
  }

  const printStar = (amount) => {
    let arrRteurn = []
    for (let i = 0; i < amount; i++) {
      arrRteurn.push(<StarRateIcon />)
    }
    return arrRteurn
  }

  const averageRating = () => {
    let sumaFinal = 0;
    const promedio = [];

    reviews && reviews.map((e) => promedio.push(e.stars))

    for (let i = 0; i < promedio.length; i++) {
      sumaFinal = sumaFinal + promedio[i];
    }
    return Math.round(sumaFinal / promedio.length);
  }



  return (
    <div className={classes.root}>
      <br/>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img 
                alt=""
                src={product.url}
                width="128"
                height="128"
                margin='auto'
                display='block'
                maxWidth='100%'
                maxHeight='100%'
                className={classes.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {product.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Descripción: {product.description}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {printStar((averageRating()))}
                </Typography>
              </Grid>
              <Grid item>
                <TableCell align="center">
                  {localStorage.getItem("token") ? <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product.id)}
                  >
                    Agregar  <ShoppingCartIcon />
                  </Button> : <Button
                    variant="contained"
                    color="primary"
                    disabled="true">
                    Agregar  <ShoppingCartIcon />
                  </Button>}

                </TableCell>

                <Grid>
                  <Typography variant="h5" gutterBottom>
                    Reviews:
                    </Typography>
                  <TableCell>
                    {reviews && reviews.map(review => (
                      <Typography variant="h5" align="left">
                        <Typography variant="body2" color="textSecondary">
                          {printStar(review.stars)}
                        </Typography>
                        {review.title}
                        <br />
                        <Typography variant="h6" align="left">
                          "{review.description}"
                        <br />
                          <br />
                        </Typography>
                      </Typography>
                    ))}
                  </TableCell>

                </Grid>

              </Grid>


            </Grid>
            <Grid item>
              <Typography variant="h5">Precio: ${product.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
};
export default SingleProduct;





