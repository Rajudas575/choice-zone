import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../tempReduxToolkit/store";
import {
  sendLoginSignupOtp,
  signin,
} from "../tempReduxToolkit/features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OTPInput from "../customer/components/OtpFild/OtpInput";

const LoginForm = () => {
  const navigate = useNavigate();
  // const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState<number>(30); // Timer state
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    onSubmit: (values: any) => {
      dispatch(signin({ email: values.email, otp: values.otp, navigate }));
      console.log("Form data:", values);
    },
  });

  // const handleOtpChange = (otp: any) => {
  //   setOtp(otp);
  // };

  const handleResendOTP = () => {
    // Implement OTP resend logic
    dispatch(sendLoginSignupOtp({ email: "signing_" + formik.values.email }));
    console.log("Resend OTP");
    setTimer(30);
    setIsTimerActive(true);
  };

  const handleSentOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  const handleLogin = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
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
            helperText={
              formik.touched.email ? formik.errors.email?.toString() : ""
            }
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
              helperText={
                formik.touched.otp ? formik.errors.otp?.toString() : ""
              }
            />
          </div>
        )}

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
              Login
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
