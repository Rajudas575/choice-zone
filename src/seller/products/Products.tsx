import React, { useEffect } from "react";
import ProductTable from "./ProductTable";
import { useAppDispatch } from "../../tempReduxToolkit/store";
import { fetchSellerProducts } from "../../tempReduxToolkit/features/seller/sellerProductSlice";

const Products = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt")));
  }, []);
  return (
    <>
      <h1 className="pb-5 font-bold text-xl">All Products</h1>
      <ProductTable />
    </>
  );
};

export default Products;
