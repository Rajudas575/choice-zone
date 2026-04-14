import React from "react";
import ProductCard from "../product/ProductCard";

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

const SimilarProduct = () => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-2 gap-y-8">
      {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
        <ProductCard key={index} item={product} />
      ))}
    </div>
  );
};

export default SimilarProduct;
