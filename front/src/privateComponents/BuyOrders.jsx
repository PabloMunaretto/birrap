import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../store/orders";
import { updateCarrito } from "../store/carrito";
import buyOrdersStyles from "../Styles/byOrders";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Button } from "@material-ui/core";


const BuyOrders = () => {
  const classes = buyOrdersStyles();
  const dispatch = useDispatch();
  const carritos = useSelector(state => state.orders);
  const [effect, setEffect] = useState({})
  useEffect(() => {
    dispatch(getOrders());
  }, [effect, dispatch]);
  
  const handlePayCarrito = (state, carrito) => {
    let cart = {
      state,
      id: carrito.id,
    }
    dispatch(updateCarrito(cart))
      .then(() => {
        setEffect([])
      })
  }


  return (
    <div>
      

      <div className={classes.container}>
        {carritos.length &&
          carritos.map(carrito => (
            <div className={classes.children}>
              <ShoppingCartIcon className={classes.carrito} />
              <div className={classes.cuadro}>
                <div className={classes.children}>
                  Numero de compra: {carrito.id}
                </div>
                <div className={classes.children}>
                  Metodo de pago: {carrito.paymentMethod}
                </div>
                <div className={classes.children}>
                  Numero de mesa: {carrito.table}
                </div>
                <div className={classes.children}>
                  Usuario: {carrito.userId}
                </div>

                <div className={classes.children}>Total: ${carrito.total}</div>

                
                    <div >
                        Estado: {carrito.state}
                    </div>
                
                <Button className={(classes.children, classes.completed)} variant="outlined" color="secondary"
                onClick={() => handlePayCarrito("COMPLETED", carrito)}
                >
                    <div >
                        Completed
                    </div>
                </Button>
                <Button className={(classes.children, classes.completed)} variant="outlined" color="secondary"
                onClick={() => handlePayCarrito("REJECTED", carrito)}
                >
                    <div >
                        Rejected
                    </div>
                </Button>
              </div>
              <br />
              <br />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuyOrders;
