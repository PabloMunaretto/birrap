import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarritosProfile } from "../store/carritosProfile";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button, Typography, Grid } from '@material-ui/core';
import profileStyles from "../Styles/profile"


const Profile = () => {
  const classes = profileStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const carritos = useSelector((state) => state.carritosProfile);
  useEffect(() => {
    dispatch(getCarritosProfile(user.id));
  }, [dispatch, user]);

  return (
    <div>
      <div >
        <div align="center" ><AccountCircleIcon style={{ fontSize: 80 }} /></div>
        <div component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.text1}>
        {user.firstName} {user.lastName}
        </div>

        <div className={classes.cuadro}>
          <div className={classes.text}>{user.email}</div>
          <Typography align="center" className={classes.text1}> Tus compras pasadas:</Typography>
        </div>

        <div className={classes.container}>

          {carritos.length > 0 ?
            carritos.map((carrito) => (
              <div className={classes.children}>
                <ShoppingCartIcon className={classes.carrito} />
                <div className={classes.cuadro}>
                  <div className={classes.children}>Numero de compra: {carrito.id}</div>
                  <div className={classes.children}>Metodo de pago: {carrito.paymentMethod}</div>
                  <div className={classes.children}>Numero de mesa: {carrito.table}</div>
                  {carrito.products.map((item) => {
                    return (
                      <div className={classes.children}>
                        <Grid align="center">
                          <Typography >
                            - {item.item.qty} {item.name}
                            <Grid align="center"><Link
                              style={{ textDecoration: "none", color: "inherit" }}
                              to={`/review/${item.id}`}
                            >
                              <Button variant="outlined" color="secondary" >Deja tu reseña!!</Button>
                            </Link></Grid>
                          </Typography>
                        </Grid>


                        <br />
                      </div>
                    );
                  })}
                  <div className={classes.children}>Total: ${carrito.total}</div>

                  <div className={classes.children}>Estado: {carrito.state}</div>
                </div>
                <br />
                <br />
              </div>
            )) 
            :
            <Grid>
              <br/>
              <br/>
            <Typography variant="h6">No has hecho ninguna compra todavia</Typography>
            <Typography variant="h6">No te quedes con hambre Birrapper!!!!</Typography>
            </Grid>
            }
        </div>
      </div>
    </div>
  );
};

export default Profile;


