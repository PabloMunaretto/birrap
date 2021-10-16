import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom"
import adminMenuStyles from "../Styles/adminMenu";


// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = adminMenuStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Panel de Control
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Aca podras agregar, editar, eliminar tus productos, categorias, usuarios de tu local.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/admin/products" style={{ textDecoration: 'none', color: "inherit" }}>
                    <Button variant="contained"
                      color="primary">
                      Productos
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/admin/users" style={{ textDecoration: 'none', color: "inherit" }}>
                    <Button variant="contained"
                      color="primary">
                      Usuarios
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/admin/categories" style={{ textDecoration: 'none', color: "inherit" }}>
                    <Button variant="contained"
                      color="primary">
                      Categorias
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/admin/orders" style={{ textDecoration: 'none', color: "inherit" }}>
                    <Button variant="contained"
                      color="primary">
                      Ordenes de compra
                  </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}