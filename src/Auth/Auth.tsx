import React, { useEffect, useState } from "react";

import SignupForm from "./SignupForm";
import { Button, Snackbar } from "@mui/material";
import LoginForm from "./LoginForm";
import { useAppSelector } from "../tempReduxToolkit/store";

const Auth = () => {
  const auth = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center h-[90vh] items-center ">
      <div className="max-w-md h-[85vh] rounded-md border border-gray-300 shadow-lg">
        <img
          className="w-full rounded-t-md"
          src="https://res.cloudinary.com/ds4zgf8p4/image/upload/q_auto/f_auto/v1776156654/login-new_qe0ede.png"
          alt=""
        />
        <div className="mt-8 px-10">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="flex items-center gap-1 justify-center mt-5">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Signup" : "Login"}
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={auth.sentOtp}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="OTP sent successfully"
      />
    </div>
  );
};

export default Auth;
