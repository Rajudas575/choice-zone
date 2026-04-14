import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../tempReduxToolkit/store";
import { createOrder } from "../../../tempReduxToolkit/features/customer/orderSlice";

const AddressForm = ({ paymentGateWay }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      locality: "",
    },
    onSubmit: (value) => {
      console.log("Form submit", value);
      dispatch(
        createOrder({
          address: value,
          jwt: localStorage.getItem("jwt"),
          paymentGateWay,
        }),
      );
    },
  });
  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <p className="text-xl font-bold text-center pb-5">Contact Details</p>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pinCode"
              label="Pin Code"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              sx={{ py: "14px" }}
              type="submit"
              variant="contained"
              color="primary">
              Add Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;
