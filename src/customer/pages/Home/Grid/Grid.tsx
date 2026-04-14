import React from "react";
import { useAppSelector } from "../../../../tempReduxToolkit/store";
import { Category } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const ShimmerBox = ({ className }: { className: string }) => {
  return <div className={`shimmer rounded-md ${className}`}></div>;
};

const Grid = () => {
  const { homeCategories, loading } = useAppSelector(
    (store) => store.homeCategory,
  );

  const category = homeCategories?.grid;

  // ✅ SHIMMER LOADER
  if (loading || !category || category.length < 6) {
    return (
      <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
        <ShimmerBox className="col-span-3 row-span-12" />
        <ShimmerBox className="col-span-2 row-span-6" />
        <ShimmerBox className="col-span-4 row-span-6" />
        <ShimmerBox className="col-span-3 row-span-12" />
        <ShimmerBox className="col-span-4 row-span-6" />
        <ShimmerBox className="col-span-2 row-span-6" />
      </div>
    );
  }
  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-12 text-white rounded-md">
        <img
          className="w-full h-full object-cover rounded-md"
          src={category[0].image}
          alt=""
        />
      </div>

      <div className="col-span-2 row-span-6 text-white rounded-md">
        <img
          className="w-full h-full object-cover rounded-md"
          src={category[1].image}
          alt=""
        />
      </div>

      <div className="col-span-4 row-span-6 text-white rounded-md">
        <img
          className="w-full h-full object-cover rounded-md"
          src={category[2].image}
          alt=""
        />
      </div>

      <div className="col-span-3 row-span-12 text-white rounded-md">
        <img
          className="w-full h-full object-cover rounded-md"
          src={category[3].image}
          alt=""
        />
      </div>

      <div className="col-span-4 row-span-6 text-white rounded-md">
        <img
          className="w-full h-full object-cover rounded-md"
          src={category[4].image}
          alt=""
        />
      </div>
      <div className="col-span-2 row-span-6 text-white rounded-md">
        <img
          className="w-full h-full object-cover rounded-md"
          src={category[5].image}
          alt=""
        />
      </div>
    </div>
  );
};

export default Grid;
