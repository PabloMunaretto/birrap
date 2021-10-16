import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { getUsers } from "../store/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from '../store/store'

const StyledTableCell = withStyles(() => ({
  head: {
    color: "white",
    background: "#A41313	",
    textAlign: "center",
  },
  body: {
    fontSize: 14,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}))(TableCell);

export default function SignUp() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const admin = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const changeUserRole = (id) => {
    axios({
      method: `put`,
      url: `${API}/api/users/promote`,
      data: {
        id,
      },
    }).then(() => dispatch(getUsers()));
  };
  const deleteUser = (id) => {
    axios({
      method: `delete`,
      url: `${API}/api/users/${id}`,
    }).then(() => dispatch(getUsers()));
  };

  return (
    <TableContainer style={{ marginTop: "1.5%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Apellido</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Cambiar Rol</StyledTableCell>
            <StyledTableCell>Cambiar Vigencia</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            if (admin.id !== user.id) {
              return (
                <TableRow key={user.id}>
                  <TableCell align="center">
                    <Typography variant="h6">{user.firstName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{user.lastName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{user.email}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => changeUserRole(user.id)}
                    >
                      {user.admin ? "Remove Admin" : "Make Admin"}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete User
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
            return <TableRow></TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
