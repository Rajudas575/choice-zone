import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../tempReduxToolkit/store";
import {
  sendLoginSignupOtp,
  signup,
} from "../tempReduxToolkit/features/Auth/AuthSlice";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const auth = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(signup({ ...values, navigate }));
    },
  });

  const handleSentOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-3xl text-center text-sky-700 pb-5 font-bold">
        Signup
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-5">
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

        {auth.sentOtp && (
          <div>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </div>
        )}
        {/* <div>
          <Button
            fullWidth
            sx={{ py: "12px" }}
            type="submit"
            variant="contained"
            onClick={!auth.sentOtp ? handleSentOtp : undefined}>
            Create Account
          </Button>
        </div> */}

        <div>
          {!auth.sentOtp ? (
            <Button
              fullWidth
              sx={{ py: "12px" }}
              variant="contained"
              onClick={handleSentOtp}>
              Send OTP
            </Button>
          ) : (
            <Button
              fullWidth
              sx={{ py: "12px" }}
              type="submit"
              variant="contained">
              Signup
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
