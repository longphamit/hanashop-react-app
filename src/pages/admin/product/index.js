import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdminHeader from "../../../components/admin/header";
import request from "../../../connects/axios_config";
import { productUrl, brandUrl, categoryUrl } from "../../../connects/url";
import { useHistory } from "react-router-dom";
import parse from "html-react-parser";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/product";
import { Carousel } from "bootstrap";
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
  const [brands, setBrands] = useState();
  const [categories, setCategories] = useState();
  const getDetail = (product) => {
    history.push("/admin/product/detail", {
      product: product,
    });
  };
  const getBrand = async () => {
    const data = await request.get(brandUrl.FETCH);
    setBrands(data);
  };
  const getCategories = async () => {
    const data = await request.get(categoryUrl.FETCH);
    setCategories(data);
  };
  useEffect(() => {
    dispatch(getProduct({}));
    getBrand();
    getCategories();
  }, []);
  return (
    <div>
      <AdminHeader />
      <Container>
        <Box style={{ display: "flex", margin: 20 }}>
          <TextField label="Id" variant="outlined" style={{ margin: 20 }} />
          <TextField label="Name" variant="outlined" style={{ margin: 20 }} />
          <TextField
            label="From Price"
            variant="outlined"
            style={{ margin: 20 }}
          />
          <TextField
            label="To Price"
            variant="outlined"
            style={{ margin: 20 }}
          />
          <FormControl style={{ margin: 20, width: 100 }}>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {brands
                ? brands.map((brand) => {
                    return (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl style={{ margin: 20, width: 100 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories
                ? categories.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            style={{ margin: 20, backgroundColor: "#34dbeb", color: "#fff" }}
          >
            Search
          </Button>
        </Box>
        <Button
          style={{ margin: 20, backgroundColor: "#00a105" }}
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
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Status</TableCell>
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
                        <div>
                          {console.log(product.imageList.length)}
                          {product.imageList.length > 0 ? (
                            <img
                              key={product.imageList[0].id}
                              style={{
                                width: 200,
                                height: 100,
                                border: "2px solid red",
                                marginRight: 20,
                              }}
                              src={product.imageList[0].path}
                            ></img>
                          ) : (
                            <div
                              style={{
                                width: 200,
                                height: 100,
                                border: "2px solid red",
                                marginRight: 20,
                              }}
                            ></div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell align="center">{product.price} USD</TableCell>

                      {product.status === "STATUS_ACTIVE" ? (
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
                      )}
                      <TableCell align="center">
                        <Button
                          onClick={() => getDetail(product)}
                          style={{ margin: 20 }}
                          variant="contained"
                          color="primary"
                        >
                          Detail
                        </Button>
                        <Button variant="contained" color="secondary">
                          In Active
                        </Button>
                      </TableCell>
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
