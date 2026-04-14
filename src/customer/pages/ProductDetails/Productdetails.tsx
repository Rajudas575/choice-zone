import React, { useEffect, useState } from "react";
import {
  Add,
  AddShoppingCart,
  Favorite,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import SimilarProduct from "./SimilarProduct";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../tempReduxToolkit/store";
import { fetchProductById } from "../../../tempReduxToolkit/features/customer/ProductSlice";
import { useParams } from "react-router";
import { addItemToCart } from "../../../tempReduxToolkit/features/customer/cartSlice";

// const images = [
//   "https://m.media-amazon.com/images/I/71H8pZW--fL._SY679_.jpg",
//   "https://m.media-amazon.com/images/I/71tEKOefGFL._SY679_.jpg",
//   "https://m.media-amazon.com/images/I/71X1S3JlxwL._SY679_.jpg",
//   "https://m.media-amazon.com/images/I/71gz330Lw9L._SY679_.jpg",
//   "https://m.media-amazon.com/images/I/71bCDntfhKL._SY679_.jpg",
// ];

const Productdetails = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((store) => store.product);
  const { productId } = useParams();

  // console.log("product", product);
  // console.log("images", product?.images);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch]);

  const handleChangeCurrentImage = (index: number) => setCurrentImage(index);

  // const handleQuantityChange = (value: number) => setQuantity(value + quantity);
  const handleQuantityChange = (value: number) => {
    if (quantity + value < 1) return;
    setQuantity(quantity + value);
  };

  const handleAddCartItem = () => {
    if (!product?._id) return;
    const request = {
      size: "M",
      productId: product?._id,
      quantity: quantity,
    };
    dispatch(addItemToCart({ jwt: localStorage.getItem("jwt"), request }));
  };

  return (
    <div className="min-h-screen px-5 lg:px-20 pt-10">
      <div className="grid grid-cols -1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product?.images?.map((img: string, index: number) => (
              <img
                key={index}
                onClick={() => handleChangeCurrentImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={img}
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            {product?.images?.length ? (
              <img
                src={product.images[currentImage]}
                className="w-full rounded-md"
                alt={product.title}
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
        </section>
        <section>
          <h1 className="font-bold text-lg text-blue-500">Choice Clothing</h1>
          <p className="text-grey-500 font-semibold">{product?.title}</p>
          <div className="flex justify-between items-center py-2 border-gray-300 w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <Star color="primary" />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>478 Rating</span>
          </div>
          <div className="space-y-2 pt-5">
            <div className="price flex items-center gap-3">
              <span className="font-semibold text-blue-600">
                ₹{product?.sellingPrice}
              </span>
              <span className="text font-thin line-through text-gray-400">
                ₹{product?.mrpPrice}
              </span>
              <span className="font-semibold text-blue-600">
                {product?.discountPercent}% off
              </span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>
          </div>
          <div className="mt-7 apace-y-3">
            <div className="flex items-center gap-4">
              <Shield color="primary" />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium color="primary" />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping color="primary" />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet color="primary" />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                onClick={() => handleQuantityChange(-1)}
                variant="outlined">
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button
                onClick={() => handleQuantityChange(+1)}
                variant="outlined">
                <Add />
              </Button>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-5">
            <Button
              startIcon={<AddShoppingCart />}
              variant="outlined"
              fullWidth
              sx={{ py: "1rem" }}
              onClick={handleAddCartItem}>
              Add To Bag
            </Button>
            <Button
              startIcon={<Favorite />}
              variant="outlined"
              fullWidth
              sx={{ py: "1rem" }}>
              Wishlist
            </Button>
          </div>
          <div className="mt-5">
            <p>{product?.description}</p>
          </div>
        </section>
      </div>
      <section className="mt-20">
        <h1 className="text-lg font-bold">Similar Product</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </section>
    </div>
  );
};

export default Productdetails;
