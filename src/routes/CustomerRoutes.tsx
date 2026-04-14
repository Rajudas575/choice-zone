import React from "react";
import Navbar from "../customer/Navbar/Navbar";
import { Route, Routes } from "react-router";
import Home from "../customer/pages/Home/Home";
import Products from "../customer/pages/product/Products";
import Productdetails from "../customer/pages/ProductDetails/Productdetails";
import CartItemCart from "../customer/pages/Cart/CartItemCart";
import CheckOut from "../customer/pages/Checkout/CheckOut";
import Profile from "../customer/pages/Order/Profile";
import Footer from "../customer/Footer/Footer";
import Cart from "../customer/pages/Cart/Cart";

const CustomerRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:categoryId" element={<Products />} />
        <Route
          path="/product-details/:categoryId/:title/:productId"
          element={<Productdetails />}
        />
        {/* <Route path="/cart" element={<CartItemCart />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/address" element={<CheckOut />} />
        <Route path="/account/*" element={<Profile />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default CustomerRoutes;
