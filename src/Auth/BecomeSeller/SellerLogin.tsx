import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../tempReduxToolkit/store";
import {
  sendLoginOtp,
  verifyLoginOtp,
} from "../../tempReduxToolkit/features/seller/sellerAuthentication";
import { sendLoginSignupOtp } from "../../tempReduxToolkit/features/Auth/AuthSlice";
import { useNavigate } from "react-router";

const SellerLogin = () => {
  const auth = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(verifyLoginOtp({ ...values, navigate }));
    },
  });

  const handleSenfOtp = () => {
    dispatch(sendLoginSignupOtp({ email: "signin_" + formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-3xl text-center text-sky-700 pb-5 font-bold">
        Seller Login
      </h1>
      <div className="space-y-5">
        <div>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        {auth.sentOtp && (
          <div>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}
        <div>
          <Button
            onClick={auth.sentOtp ? formik.handleSubmit : handleSenfOtp}
            fullWidth
            sx={{ py: "12px" }}
            type="submit"
            variant="contained">
            {auth.sentOtp ? "Login" : "Sent OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
