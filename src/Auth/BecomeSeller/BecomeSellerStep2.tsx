import { Grid, TextField } from "@mui/material";
import React from "react";

const BecomeSellerStep2 = ({ formik }: any) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.mobile"
            label="Mobile"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.pinCode"
            label="PinCode"
            value={formik.values.pickupAddress.pinCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
            helperText={formik.touched.pinCode && formik.errors.pinCode}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.address"
            label="Address (House No, Building, Street)"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupaddress?.address &&
              Boolean(formik.errors.pickupaddress?.address)
            }
            helperText={
              formik.touched.pickupaddress?.address &&
              formik.errors.pickupaddress?.address
            }
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="pickupAddress.locality"
            label="Locality/Town"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupaddress?.locality &&
              Boolean(formik.errors.pickupaddress?.locality)
            }
            helperText={
              formik.touched.pickupaddress?.locality &&
              formik.errors.pickupaddress?.locality
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.city"
            label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupaddress?.city &&
              Boolean(formik.errors.pickupaddress?.city)
            }
            helperText={
              formik.touched.pickupaddress?.city &&
              formik.errors.pickupaddress?.city
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            name="pickupAddress.state"
            label="State"
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pickupaddress?.state &&
              Boolean(formik.errors.pickupaddress?.state)
            }
            helperText={
              formik.touched.pickupaddress?.state &&
              formik.errors.pickupaddress?.state
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeSellerStep2;
