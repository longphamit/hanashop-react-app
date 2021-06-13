import React, { Component, useRef, useState, useEffect } from "react";
import AdminHeader from "../../../../components/admin/header/index";
import {
  Container,
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

const AddProduct = () => {
  const [urlImages, setUrlImages] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [brands, setBrands] = useState("");
  const [formCreate, setFormCreate] = useState({
    name: "",
    price: "",
    sale: "",
    quantity: "",
    brandId: "",
    categoryId: "",
    description: "",
  });

  const fetchBrand = async () => {
    const data = await request.get(brandUrl.FETCH);
    console.log(data);
    setBrands(data);
  };
  const fetchCategory = async () => {
    const data = await request.get(categoryUrl.FETCH);
    console.log(data);
    setCategories(data);
  };
  useEffect(() => {
    fetchBrand();
    fetchCategory();
  }, []);
  const onChangeImages = (e) => {
    const image = e.target.files[0];
    setImages([...images, image]);
    const urlImage = URL.createObjectURL(e.target.files[0]);
    setUrlImages([...urlImages, urlImage]);
  };
  const handleCkeditor = (event, editor) => {
    const data = editor.getData();
    console.log("log data" + data);
    setDescription(data);
    // console.log(editor.getContent());
  };
  const onSubmit = async () => {
    const formData = new FormData();
    console.log(formCreate);
    console.log(images);

    formData.append(
      "inforProduct",
      new Blob([JSON.stringify(formCreate)], {
        type: "application/json",
      })
    );
    if (images) {
      images.map((image) => {
        formData.append("images", image);
      });
    }
    request.post(productUrl.CREATE, formData);
  };

  return (
    <>
      <div style={{ flex: 1 }}>
        <AdminHeader />
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
                <Carousel>
                  {urlImages
                    ? urlImages.map((url) => {
                        return (
                          <Carousel.Item>
                            <img style={{ width: 300 }} src={url}></img>
                          </Carousel.Item>
                        );
                      })
                    : null}
                </Carousel>
              </div>

              <input type="file" onChange={onChangeImages} />
            </div>

            <div style={{ width: 400, marginLeft: 30 }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                variant="outlined"
                onChange={(e) =>
                  setFormCreate({ ...formCreate, name: e.target.value })
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
                style={{ margin: 10 }}
                onChange={(e) =>
                  setFormCreate({ ...formCreate, quantity: e.target.value })
                }
              />
              <Grid container>
                <Grid item xs={6}>
                  <InputLabel
                    id="demo-controlled-open-select-label"
                    style={{ marginTop: 20, marginLeft: 20 }}
                  >
                    Brand
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select-label"
                    value={formCreate.brand}
                    onChange={(e) =>
                      setFormCreate({ ...formCreate, brandId: e.target.value })
                    }
                    style={{ width: 100 }}
                  >
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
                </Grid>
                <Grid item xs={6}>
                  <InputLabel
                    id="demo-controlled-open-select-label"
                    style={{ marginTop: 20, marginLeft: 20 }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select-label"
                    value={formCreate.category}
                    onChange={(e) =>
                      setFormCreate({ ...formCreate, categoryId: e.target.value })
                    }
                    style={{ width: 200 }}
                  >
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
                </Grid>
              </Grid>
            </div>
          </div>
          <CKEditor
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
            data=""
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log(data)
              setFormCreate({...formCreate,description:data})
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          <div>
            <Button
              variant="success"
              onClick={() => onSubmit()}
              style={{ margin: 30 }}
            >
              Submit
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AddProduct;
