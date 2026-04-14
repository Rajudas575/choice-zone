import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useParams, useSearchParams } from "react-router";
import store, {
  useAppDispatch,
  useAppSelector,
} from "../../../tempReduxToolkit/store";
import { getAllProducts } from "../../../tempReduxToolkit/features/customer/ProductSlice";

const product = {
  images: [
    "https://m.media-amazon.com/images/I/71H8pZW--fL._SY679_.jpg",
    "https://m.media-amazon.com/images/I/71tEKOefGFL._SY679_.jpg",
    "https://m.media-amazon.com/images/I/71X1S3JlxwL._SY679_.jpg",
    "https://m.media-amazon.com/images/I/71gz330Lw9L._SY679_.jpg",
    "https://m.media-amazon.com/images/I/71bCDntfhKL._SY679_.jpg",
  ],
  seller: {
    businessDetails: {
      businessName: "Banarasi Silk",
    },
  },
};

const Products = () => {
  const [sort, setSort] = useState("price_low");

  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const product = useAppSelector((store) => store.product);

  const dispatch = useAppDispatch();
  // console.log("PRODUCT---", product);
  // console.log("category id", categoryId, product);

  const handleSortProduct = (e: any) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllProducts({}));
  }, []);
  return (
    <div className="z-1 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 uppercase space-x-2">
          {" "}
          WOMEN SAREES
        </h1>
      </div>
      <div className="lg:flex">
        <section className="z-1 hidden lg:block w-[20%] min-h-screen border-gray-300">
          <FilterSection />
        </section>
        <section className="z-1 w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div></div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="sort"
                id="sort"
                value={sort}
                label="Sort"
                onChange={handleSortProduct}>
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low </MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center mt-5 cursor-pointer">
            {product?.products?.map((item, index) => (
              <div key={index * 3}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <Pagination
              count={product.totalPages}
              style={{ marginBottom: "5px" }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
