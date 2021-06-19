import React, { Component, useRef, useState, useEffect } from "react";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Carousel, CarouselItem, Button, ThemeProvider } from "react-bootstrap";
import request from "../../../../connects/axios_config";
import { brandUrl, categoryUrl, productUrl } from "../../../../connects/url";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useHistory,useLocation } from "react-router-dom";
const ProductDetail = () => {
  const history = useHistory();
  const [urlImages, setUrlImages] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [brands, setBrands] = useState("");
  const location=useLocation();
  const [formCreate, setFormCreate] = useState({
    name: "",
    price: "",
    sale: "",
    quantity: "",
    brandId: "",
    categoryId: "",
    description: "",
  });
  const getBrands = async () => {
    const data = await request.get(brandUrl.FETCH);
    console.log(data);
    setBrands(data);
  };
  const getCategories = async () => {
    const data = await request.get(categoryUrl.FETCH);
    console.log(data);
    setCategories(data);
  };
  useEffect(() => {
    console.log(location.state.product);
    setProductDetail(location.state.product);
    getBrands();
    getCategories();
  }, []);

  return (
    <>
      <div style={{ flex: 1 }}>
        <Container>
          <div style={{ padding: 50, display: "flex", alignSelf: "center" }}>
            <div>
              <div
                style={{
                  width: 300,
                  height: 200,
                  border: "2px solid red",
                  marginRight: 20,
                }}
              >
                {productDetail.imageList ? (
                  <Carousel>
                    {productDetail.imageList.map((image) => {
                      return (
                        <Carousel.Item>
                          <img key={image.id} style={{ width: 300 }} src={image.path}></img>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                ) : null}
              </div>

              <input type="file" />
            </div>

            <div style={{ width: 400, marginLeft: 30 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                variant="outlined"
                value={productDetail.name}
                onChange={(e) =>
                  setProductDetail({ ...productDetail, name: e.target.value })
                }
                style={{ margin: 10, borderRadius: 20 }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Price"
                fullWidth
                variant="outlined"
                style={{ margin: 10 }}
                value={productDetail.price}
                onChange={(e) =>
                  setFormCreate({ ...formCreate, price: e.target.value })
                }
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Sale"
                fullWidth
                variant="outlined"
                style={{ margin: 10 }}
                value={productDetail.sale}
                onChange={(e) =>
                  setFormCreate({ ...formCreate, sale: e.target.value })
                }
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Quantity"
                fullWidth
                variant="outlined"
                value={productDetail.quantity}
                style={{ margin: 10 }}
                onChange={(e) =>
                  setFormCreate({ ...formCreate, quantity: e.target.value })
                }
              />
              <Grid container>
                <Grid item xs={6}>
                  {brands ? (
                    <FormControl style={{ margin: 20, width: 100 }}>
                      <InputLabel id="demo-simple-select-label">
                        Brand
                      </InputLabel>
                      <Select value={productDetail.brandId}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {brands.map((brand) => {
                          return (
                            <MenuItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  {categories ? (
                    <FormControl style={{ margin: 20, width: 200 }}>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select value={productDetail.categoryId}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {categories.map((category) => {
                          return (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          </div>
          {
            productDetail.description?(<CKEditor
              editor={Editor}
              config={{
                ckfinder: {
                  // Upload the images to the server using the CKFinder QuickUpload command.
                  uploadUrl: "http://localhost:8181/api/product/ckfinder",
                },
                toolbar: [
                  "heading",
                  "|",
                  "fontfamily",
                  "fontsize",
                  "|",
                  "alignment",
                  "|",
                  "fontColor",
                  "fontBackgroundColor",
                  "|",
                  "bold",
                  "italic",
                  "strikethrough",
                  "underline",
                  "subscript",
                  "superscript",
                  "|",
                  "link",
                  "|",
                  "outdent",
                  "indent",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "todoList",
                  "|",
                  "code",
                  "codeBlock",
                  "|",
                  "insertTable",
                  "|",
                  "uploadImage",
                  "blockQuote",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data={productDetail.description}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log(data);
                setFormCreate({ ...formCreate, description: data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />):null

          }
          
          <div>
            <Button variant="success" style={{ margin: 30 }}>
              Submit
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ProductDetail;
