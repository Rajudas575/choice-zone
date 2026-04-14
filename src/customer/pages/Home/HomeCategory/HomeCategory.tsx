import React from "react";
import HomeCategoryCard from "./HomeCategoryCard";
import { useAppSelector } from "../../../../tempReduxToolkit/store";

const HomeCategory = () => {
  const category = useAppSelector(
    (store) => store.homeCategory.homeCategories?.shopByCategories,
  );
  return (
    <div className="flex justify-center gap-7 flex-wrap">
      {category.map((item, index) => (
        <HomeCategoryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default HomeCategory;
