import React from "react";
import { Route, Routes } from "react-router";
import SellerTable from "../admin/Seller/SellerTable";
import Coupon from "../admin/Coupon/Coupon";
import CouponForm from "../admin/Coupon/CouponForm";
import GridTable from "../admin/HomePage/GridTable";
import ElectronicsTable from "../admin/HomePage/ElectronicsTable";
import ShopByCategorytable from "../admin/HomePage/ShopByCategorytable";
import Deal from "../admin/Deal/Deal";

const AdminRoutes = () => {
  
  return (
    <Routes>
      <Route path="/" element={<SellerTable />} />
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/add-coupon" element={<CouponForm />} />
      <Route path="/home-grid" element={<GridTable />} />
      <Route path="/electronics-category" element={<ElectronicsTable />} />
      <Route path="/shop-by-category" element={<ShopByCategorytable />} />
      <Route path="/deals" element={<Deal />} />
    </Routes>
  );
};

export default AdminRoutes;
