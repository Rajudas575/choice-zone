import React, { useEffect, useState } from "react";
import "./productCard.css";
import { useNavigate } from "react-router";

const ProductCard = ({ item }: any) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(
        () => setCurrentImage((prev) => (prev + 1) % item.images.length),
        1000,
      );
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);
 
  
  return (
    <div
      onClick={() =>
        navigate(`/product-details/${item.category}/${item.title}/${item._id}`)
      }
      className="group px-4 relative">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="z-1 relative w-[250px] sm:w-full h-[350px] overflow-hidden">
        {item.images.map((image: string, index: number) => (
          <img
            src={image}
            className="card-media object-top"
            key={index}
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name space-y">
          <h1 className="font-semibold text-lg">
            {item.seller.businessDetails?.businessName}
          </h1>
          <p>Kanjivaram Pure Soft Silk</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-blue-800">
            ₹{item.sellingPrice}
          </span>
          <span className="text font-thin line-through text-gray-400">
            ₹{item.mrpPrice}
          </span>
          <span className="font-semibold text-blue-600">
            {item.discountPercent}% off
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
