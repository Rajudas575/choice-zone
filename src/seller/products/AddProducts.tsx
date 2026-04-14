import { AddPhotoAlternate, Close, RingVolume } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { colors } from "../../data/filter/colors";
import { mainCategory } from "../../data/Category/mainCategory";
import { menLevelTwo } from "../../data/Category/LevelTwo/menLevelTwo";
import { womenLevelTwo } from "../../data/Category/LevelTwo/womenLevelTwo";
import { furnitureLevelTwo } from "../../data/Category/LevelTwo/furnitureLevelTwo";
import { electronicsLevelTwo } from "../../data/Category/LevelTwo/electronicsLevelTwo";
import { menLevelThree } from "../../data/Category/LevelThree/menLevelThree";
import { womenLevelThree } from "../../data/Category/LevelThree/womenLevelThree";
import { furnitureLevelThree } from "../../data/Category/LevelThree/furnitureLevelThree";
import { electronicsLevelThree } from "../../data/Category/LevelThree/electronicsLevelThree";
import { uploadToCloudnary } from "../../util/uploadToCloudnary";
import { useAppDispatch } from "../../tempReduxToolkit/store";
import { createProduct } from "../../tempReduxToolkit/features/seller/sellerProductSlice";
import { useNavigate } from "react-router-dom";

const sizes = ["FREE", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const AddProducts = () => {
  const [uploadImage, setuploadImage] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: 100,
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      size: "",
    },
    onSubmit: async (value) => {
      try {
        const jwt = localStorage.getItem("jwt");

        await dispatch(createProduct({ jwt, request: value })).unwrap();

        // redirect if success
        navigate("/seller/products");
      } catch (error) {
        console.log("Product create failed", error);
      }
    },
  });

  const handleImageChang = async (event: any) => {
    const file = event.target.files[0];

    setuploadImage(true);
    const image = await uploadToCloudnary(file);

    formik.setFieldValue("images", [...formik.values.images, image]);
    setuploadImage(false);

    console.log("Handle image change");
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (child: any) => child.parentCategoryId === parentCategoryId,
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-5">ADD PRODUCTS</h1>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{ xs: 12 }}>
            <input
              type="file"
              accept="image/"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChang}
            />
            <label htmlFor="fileInput" className="relative">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternate className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className="absolute flex justify-center items-center w-24 h-24 top-0 right-0 buttom-0 left-0">
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((item, index) => (
                <div className="relative" key={index}>
                  <img src={item} alt="" className="w-24 h-24 object-cover" />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      outline: "none",
                      backgroundColor: "white",
                      padding: "2px",
                    }}>
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="mrp_price"
              name="mrpPrice"
              label="MRP Price"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="selling_price"
              name="sellingPrice"
              label="Selling Price"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth required>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                label="Color"
                onChange={formik.handleChange}>
                <MenuItem value="">None</MenuItem>

                {colors.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <FormControl fullWidth required>
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                id="size"
                name="size"
                value={formik.values.size}
                label="size"
                onChange={formik.handleChange}>
                <MenuItem value="">None</MenuItem>

                {sizes.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                label="category"
                onChange={formik.handleChange}>
                <MenuItem value="none">None</MenuItem>

                {mainCategory.map((item, index) => (
                  <MenuItem key={index} value={item.categoryid}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="category2-label">Second Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                label="second category"
                onChange={formik.handleChange}>
                <MenuItem value="">None</MenuItem>

                {formik.values.category &&
                  categoryTwo[formik.values.category]?.map((item, index) => (
                    <MenuItem key={index} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <FormControl fullWidth required>
              <InputLabel id="category3-label">Third Category</InputLabel>
              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                value={formik.values.category3}
                label="Third category"
                onChange={formik.handleChange}>
                <MenuItem value="">None</MenuItem>

                {formik.values.category2 &&
                  childCategory(
                    categoryThree[formik.values.category],
                    formik.values.category2,
                  )?.map((item, index) => (
                    <MenuItem key={index} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              fullWidth
              type="submit"
              variant="contained">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProducts;
