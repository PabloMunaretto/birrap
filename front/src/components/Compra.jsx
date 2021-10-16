import React, { useState, useEffect } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarrito, updateCarrito } from "../store/carrito";
import { sendEmailToUser, sendEmailToAdmin } from "../store/emails";
import { getUsers } from "../store/users";
import compraStyles from "../Styles/compra"
import { Button, ButtonGroup, Container, Grid } from "@material-ui/core";
import { getCarritosProfile } from "../store/carritosProfile";


const steps = ['Payment Method', 'Table', 'Review your order'];

const GetStepContent = (step) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = compraStyles();
  const carrito = useSelector((state) => state.carrito);
  const user = useSelector((state) => state.user);
  // const items = useSelector((state) => state.items);
  const [admin, setAdmin] = useState("");

  // Si no hay un user admin se rompe. Poner un admin cualquiera
  // Podria poner un if (admin) en varios lugares, pero es un lio.
  // La realidad es que siempre deberia haber un admin

  useEffect(() => {
    return dispatch(getUsers()).then(({ payload }) => {
      let adminUser = payload.filter(usuario => usuario.admin === true);
      setAdmin(adminUser[0]); //Para saber a que admin se le manda el mail. Es al primero siempre
    });
  }, [dispatch]);

  let fullFilled = true;

  const [compraData, setCompraData] = useState({ pago: "Elegi tu metodo de pago:" });
  const handleChange = (e) => {
    setCompraData({ ...compraData, [e.target.name]: e.target.value });
  };
  if (compraData.pago !== "Elegi tu metodo de pago:" && compraData.mesa) {
    fullFilled = false;
  }

  // lógica para setear el total de la compra en el carrito del backend
  const precio = [];
  let total;
  if (carrito.items) {
    carrito.items.map(item => {
      precio.push(item.item.qty >= 1 ? item.price * item.item.qty : 0);
      return item
    });
    total = precio.reduce((a, b) => a + b, 0);
  }

  // 1-modifica estado del carrito 2-crea carrito nuevo 3-envia emails a user confirmando compra, y a admin avisandole de una nueva orden "WAITING" para aprobar "COMPLETED" o rechazar "REJECTED"
  const handlePayCarrito = e => {
    e.preventDefault();
    const cart = {
      state: "WAITING",
      id: carrito.id,
      total,
      paymentMethod: compraData.pago,
      table: Number(compraData.mesa),
    };

    let subject = `Birrap - Gran compra, Birrapper`;
    let text = `Hola, ${user.firstName} ${user.lastName}!!
    Se ha completado con exito tu compra.
    Descripccion del Pedido:
    ${carrito.items && carrito.items.map((item, index) =>
      (index === 0 ? '\t -' : '\t -') + item.item.qty + ' ' + item.name + ' $' + item.price + '\n'
    ).join("") }
      Total: $${total}

    Disfruta tu pedido.
    
    
    Con tu compra ganaste ${Math.round(total / 10)} Pablito's Tokens!!!`;

    const userEmailData = { email: user.email, subject, text };
    const adminEmailData = { email: admin.email };

    dispatch(updateCarrito(cart)) //Cambia el estado del carrito actual a WAITING
      .then(() => dispatch(getCarrito(user.id))) // Inmediatamente después genera un nuevo carrito.
      .then(() => history.push("/"))
      .then(() => dispatch(sendEmailToUser(userEmailData))) // Y le envio un mail al usuario avisandole de la compra
      .then(() => dispatch(sendEmailToAdmin(adminEmailData))); // le envia un mail al admin para aprobarla

      // Los then anidados es para que antes del redirect, se hagan los dispatch de este componente, asi no tenemos 10 dispatch distintos aleatoriamente cuando redirige a la home, y prevenir bugs
  };

  useEffect(() => {
    dispatch(getCarritosProfile(user.id));
  }, [dispatch, user]);

  switch (step) {
    case 0:
      return (<Container component="main" maxWidth="xs">
        <form noValidate onSubmit={(e) => handlePayCarrito(e)}>
          <Grid container spacing={2} className={classes.form}>
            <Grid item xs={12}>
              <select
                className={classes.form}
                name="pago"
                size="1"
                onChange={handleChange}
              >
                <option disabled selected value="Elegi tu metodo de pago:">Elegi tu metodo de pago:</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                <option value="Tarjeta de debito">Tarjeta de debito</option>
                <option value="Mercado Pago">Mercado Pago</option>
                <option value="Pablito Tokens">Pablito Tokens</option>
              </select>
            </Grid>
          </Grid>
        </form>
      </Container>);
    case 1:
      return (
        <Container component="main" maxWidth="xs">
          <form noValidate onSubmit={(e) => handlePayCarrito(e)}>
            <Grid container spacing={2} className={classes.form}>
              <Grid item xs={12}>
                {compraData.pago !== "Elegi tu metodo de pago:" && (
                  <Grid item xs={12} className={classes.form}>
                    <label>
                      Nº de mesa:
              <input type="number" name="mesa" onChange={handleChange} />
                    </label>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </form>
        </Container >
      );
    case 2:
      return (
        <Container component="main" maxWidth="xs">
          <Typography>Forma de Pago: {compraData.pago}</Typography>
          <Typography>Mesa: {compraData.mesa}</Typography>
          <Typography>Email: {user.email}</Typography>
          {carrito.items && carrito.items.map((item) => (
            <Typography>Producto: {item.item.qty} {item.name} ${item.price}</Typography>
          ))}
          <Typography>Precio a Pagar: ${total}</Typography>

          <form noValidate onSubmit={(e) => handlePayCarrito(e)}>
            <Grid container spacing={2} className={classes.form}>
              <Grid item xs={12} className={classes.form}>
                <ButtonGroup
                  variant="text"
                  aria-label="contained primary button group"
                  size="small"
                >
                  <Button
                    disabled={fullFilled}
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}

                  >
                    Confirmar compra
              </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
        </Container>
      );
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = compraStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

 

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {GetStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep !== 2 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}