import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import  AdminHeader from "../../../components/admin/header";
import request from "../../../connects/axios_config";
import { userUrl } from "../../../connects/url";
import { useHistory } from "react-router-dom";
import parse from 'html-react-parser';
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/product";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProductAdmin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.product);
  useEffect(() => {
    console.log("hello anh bao")
    dispatch(getProduct({}));
  }, []);
  return (
    <div>
      <AdminHeader />
      <Container>
        <Button
          style={{ margin: 20 }}
          onClick={() => history.replace("/admin/product/add")}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
                
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.response
                ? data.response.map((product) => (
                    <TableRow key={product.id}>
                       <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                    
                      <TableCell>
                        
                        {parse(product.description)}
                        
                      </TableCell>
                      {/* {product.status === "ACTIVE" ? (
                        <TableCell align="center">
                          <div
                            style={{
                              borderRadius: 10,
                              textAlign: "center",
                              backgroundColor: "#00a105",
                              color: "#ffff",
                            }}
                          >
                            {product.status}
                          </div>
                        </TableCell>
                      ) : (
                        <TableCell
                          align="right"
                          style={{ backgroundColor: "#c4044e" }}
                        >
                          {product.status}
                        </TableCell>
                      )} */}
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};
export default ProductAdmin;
