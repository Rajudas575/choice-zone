import { Box } from "@mui/material";
import React from "react";
import { menLevelTwo } from "../../data/Category/LevelTwo/menLevelTwo";
import { womenLevelTwo } from "../../data/Category/LevelTwo/womenLevelTwo";
import { electronicsLevelTwo } from "../../data/Category/LevelTwo/electronicsLevelTwo";
import { furnitureLevelTwo } from "../../data/Category/LevelTwo/furnitureLevelTwo";
import { menLevelThree } from "../../data/Category/LevelThree/menLevelThree";
import { womenLevelThree } from "../../data/Category/LevelThree/womenLevelThree";
import { furnitureLevelThree } from "../../data/Category/LevelThree/furnitureLevelThree";
import { electronicsLevelThree } from "../../data/Category/LevelThree/electronicsLevelThree";
import { useNavigate } from "react-router";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  home_furniture: furnitureLevelThree,
  electronics: electronicsLevelThree,
};

const CategorySheet = ({
  selectedCategory,
  toggleDrawer,
  setShowSheet,
}: any) => {
  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter(
      (child: any) => child.parentCategoryId === parentCategoryId,
    );
  };

  const navigate = useNavigate();
  return (
    <Box className="bg-white shadow-lg lg:h-[500px] overflow-auto z-50">
      <div className="flex text-sm flex-wrap">
        {categoryTwo[selectedCategory]?.map((item, index) => (
          <div key={index} className={`p-8 lg:w-[20%] ${index % 2 == 0 ? "bg-slate-50" : "bg-white"}`}>
            
            
            <p className="text-[#004e98] mb-5 font-semibold">{item.name}</p>
            <ul className="space-y-3 text-gray-500">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId,
              )?.map((item: any) => (
                <div key={item.name}>
                  <li
                    onClick={() => navigate(`/products/${item.name}`)}
                    className="cursor-pointer">
                    {item.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
