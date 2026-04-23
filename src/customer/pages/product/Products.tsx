import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  type SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Select,
  Box,
} from "@mui/material";
import ProductCard from "./ProductCard";
import { useParams, useSearchParams } from "react-router";
import store, {
  useAppDispatch,
  useAppSelector,
} from "../../../Redux Toolkit/store";
import { getAllProducts } from "../../../Redux Toolkit/features/customer/ProductSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// const product = {
//   images: [
//     "https://m.media-amazon.com/images/I/71H8pZW--fL._SY679_.jpg",
//     "https://m.media-amazon.com/images/I/71tEKOefGFL._SY679_.jpg",
//     "https://m.media-amazon.com/images/I/71X1S3JlxwL._SY679_.jpg",
//     "https://m.media-amazon.com/images/I/71gz330Lw9L._SY679_.jpg",
//     "https://m.media-amazon.com/images/I/71bCDntfhKL._SY679_.jpg",
//   ],
//   seller: {
//     businessDetails: {
//       businessName: "Banarasi Silk",
//     },
//   },
// };

const Products = () => {
  const [sort, setSort] = React.useState("");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showFilter, setShowFilter] = useState(false);
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const handleSortProduct = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
    console.log("showFilter   ", showFilter);
  };

  const handlePageChange = (value: any) => {
    setPage(value);
    console.log("page nummmberr ", value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const newFilters = {
      brand: searchParams.get("brand") || "",
      color: searchParams.get("color") || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pageNumber: page - 1,
      minDiscount: searchParams.get("discount")
        ? Number(searchParams.get("discount"))
        : undefined,
    };

    dispatch(getAllProducts({ category: categoryId, sort, ...newFilters }));
  }, [searchParams, categoryId, sort, page]);

  // console.log(" store ", products)
  return (
    <div className="-z-10 mt-10">
      <div className="">
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {categoryId?.split("_").map((item) => (
            <span>{item}</span>
          ))}
        </h1>
      </div>
      <div className="lg:flex">
        <section className="hidden lg:block  w-[20%] ">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton onClick={handleShowFilter}>
                  <FilterAltIcon />
                </IconButton>
              )}
              {showFilter && !isLarge && (
                <Box sx={{ zIndex: 3 }} className="absolute top-[60px]">
                  <FilterSection />
                </Box>
              )}
            </div>
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="sort">Sort</InputLabel>
              <Select
                labelId="sort"
                id="sort"
                value={sort}
                label="Sort"
                onChange={handleSortProduct}>
                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />

          {products.products?.length > 0 ? (
            <section
              className="grid sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4
            gap-y-5 px-5 justify-center">
              {products.products.map((item: any) => (
                <div key={item._id} className="">
                  <ProductCard item={item} categoryId={categoryId} />
                </div>
              ))}
            </section>
          ) : (
            <section className="items-center flex flex-col gap-5 justify-center h-[67vh] border">
              <img
                className="w-80"
                src="https://cdn.pixabay.com/photo/2022/05/28/10/45/oops-7227010_960_720.png"
                alt=""
              />
              <h1 className="font-bold text-xl text-center flex items-center gap-2">
                Product Not Found For{" "}
                <p className="text-primary-color flex gap-2 uppercase">
                  {" "}
                  {categoryId?.split("_").map((item) => (
                    <span>{item}</span>
                  ))}{" "}
                </p>{" "}
              </h1>
            </section>
          )}
          <div className="flex justify-center pt-10">
            <Pagination
              page={page}
              onChange={(e, value) => handlePageChange(value)}
              color="primary"
              count={products?.totalPages}
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
