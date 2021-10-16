import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import Admin from "./Admin";
import { useDispatch, useSelector } from "react-redux"
import { getUser, getFbUser } from "../store/user"
import { getCarrito } from "../store/carrito";




const Index = () => {
  const dispatch = useDispatch()
  const carrito = useSelector(state => state.carrito)
  
  useEffect(() => {
      // preguntar si hay carrito con estado pending y si no, crearlo. con el usuario que tengo, hacer un getCart
      if (localStorage.getItem("id")){
        dispatch(getFbUser(localStorage.getItem("id")))
        .then((usuario) => {
          if (usuario.payload && !usuario.payload.admin) {
            if (!carrito.id) dispatch(getCarrito(usuario.payload.id))
          }
      })
    }
    else {
      dispatch(getUser())
        .then((usuario) => {
          if (usuario.payload && !usuario.payload.admin) {
            if (!carrito.id) dispatch(getCarrito(usuario.payload.id))
          }
        })
    }
  }, [dispatch, carrito])

  return (
    <div>
      <Switch>
        <Route path="/admin" render={() => <Admin />} />
        <Route path="/" render={() => <App />} />
      </Switch>
    </div>
  );
};
export default Index;
