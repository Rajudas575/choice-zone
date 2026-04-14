import { Button, ThemeProvider } from "@mui/material";
import { customeTheme } from "./Theme/customeTheme";
import Home from "./customer/pages/Home/Home";
import Products from "./customer/pages/product/Products";
import Footer from "./customer/Footer/Footer";
import Productdetails from "./customer/pages/ProductDetails/Productdetails";
import Cart from "./customer/pages/Cart/Cart";
import CheckOut from "./customer/pages/Checkout/CheckOut";
import Navbar from "./customer/Navbar/Navbar";
import Profile from "./customer/pages/Order/Profile";
import { Route, Routes } from "react-router";
import SellerDashboard from "./seller/SellerDashboard/SellerDashboard";
import BecomeSeller from "./Auth/BecomeSeller/BecomeSeller";
import CustomerRoutes from "./routes/CustomerRoutes";
import Auth from "./Auth/Auth";
import Dashboard from "./admin/Dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "./tempReduxToolkit/store";
import { useEffect } from "react";
import { fetchUserProfile } from "./tempReduxToolkit/features/customer/userSlice";
import { fetchSellerProfile } from "./tempReduxToolkit/features/seller/sellerSlice";
import { homeCategories } from "./data/homeCategories";
import { createHomeCategories } from "./tempReduxToolkit/features/customer/homeCategorySlice";

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt || auth.jwt) {
      dispatch(fetchUserProfile(jwt));
      dispatch(fetchSellerProfile(jwt));
    }
  }, [auth.jwt, dispatch]);

  // useEffect(() => {
  //   const jwt = auth.jwt || localStorage.getItem("jwt");

  //   if (!jwt) return;

  //   if (auth.role === "ROLE_CUSTOMER") {
  //     dispatch(fetchUserProfile(jwt));
  //   } else if (auth.role === "ROLE_SELLER") {
  //     dispatch(fetchSellerProfile(jwt));
  //   }
  // }, [auth.jwt, auth.role, dispatch]);

  useEffect(() => {
    dispatch(createHomeCategories(homeCategories));
  }, [dispatch]);

  return (
    <ThemeProvider theme={customeTheme}>
      {/* <Home /> */}
      {/* <Products /> */}
      {/* <Productdetails /> */}
      {/* <Cart/> */}
      {/* <CheckOut/> */}
      {/* <Profile /> */}

      {/* ---seller routes--- */}
      <Routes>
        <Route path="/become-seller/" element={<BecomeSeller />} />
        <Route path="/seller/*" element={<SellerDashboard />} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>

      {/* ---customer routes--- */}
      {/* <Navbar /> */}
      {/* <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route
          path="/product-details/:categoryId/:name/:productid"
          element={<Productdetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/address" element={<CheckOut />} />
        <Route path="/account/*" element={<Profile />} />
      </Routes> */}

      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
