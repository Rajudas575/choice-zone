import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { menLevelTwo } from "../../data/Category/LevelTwo/menLevelTwo";
import { useAppDispatch, useAppSelector } from "../../tempReduxToolkit/store";
import { createDeal } from "../../tempReduxToolkit/features/admin/dealSlice";

const CreateDealForm = () => {
  const dispatch = useAppDispatch();

  const homeCategories = useAppSelector(
    (store) => store.homeCategory.homeCategories,
  );

  const formik = useFormik({
    initialValues: {
      discount: 0,
      categoryId: "",
    },
    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      dispatch(createDeal(values));
      resetForm();
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ width: 600, margin: "auto", padding: 3 }}
      className="space-y-6">
      <div>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Create New Deal
        </Typography>
      </div>
      <div>
        <TextField
          fullWidth
          name="discount"
          label="Discount"
          value={formik.values.discount}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <FormControl fullWidth required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="categoryId"
            value={formik.values.categoryId}
            label="category"
            onChange={formik.handleChange}>
            <MenuItem value="none">None</MenuItem>

            {homeCategories.dealCategories.map((item, index) => (
              <MenuItem key={index} value={item._id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button sx={{ py: "11px" }} fullWidth type="submit" variant="contained">
        Create Deal
      </Button>
    </Box>
  );
};

export default CreateDealForm;
