import React from "react";
import ElectronicCategoryCard from "./ElectronicCategoryCard";
import store, { useAppSelector } from "../../../../tempReduxToolkit/store";

// demo data
// const electronics = [
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Laptop",
//     image:
//       "https://rukminim1.flixcart.com/image/804/804/xif0q/computer/g/r/p/-original-imahg5ftvnmqhgqp.jpeg?q=90",
//     categoryId: "laptops",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Mobile",
//     image:
//       "https://rukminim1.flixcart.com/image/1366/1366/xif0q/mobile/c/7/b/-original-imahhmcn4pgkzaq3.jpeg?q=90",
//     categoryId: "mobiles",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Smartwatch",
//     image:
//       "https://rukminim1.flixcart.com/image/1366/1366/xif0q/smartwatch/4/4/f/49-edge-lite-black-001-android-ios-punnkfunnk-yes-original-imahkz2fpexfvsbf.jpeg?q=90",
//     categoryId: "smart_watches",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Headphones",
//     image:
//       "https://rukminim1.flixcart.com/image/1366/1366/xif0q/headphone/9/a/d/-original-imahgnf4h2xjhtb9.jpeg?q=90",
//     categoryId: "headphones_headphones",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Speaker",
//     image:
//       "https://rukminim1.flixcart.com/image/1366/1366/xif0q/speaker/g/b/4/-original-imah8keqctyv77ed.jpeg?q=90",
//     categoryId: "speakers",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Tv",
//     image:
//       "https://rukminim1.flixcart.com/image/1366/1366/xif0q/television/p/g/y/-original-imahcsfhdv9gtdg9.jpeg?q=90",
//     categoryId: "television",
//   },
//   {
//     section: "ELECTRIC_CATEGORIES",
//     name: "Camera",
//     image:
//       "https://rukminim1.flixcart.com/image/1366/1366/xif0q/dslr-camera/m/v/1/-original-imahhy8ynhh9atfd.jpeg?q=90",
//     categoryId: "cameras",
//   },
// ];

const ElectronicCategory = () => {
  const homeCategories = useAppSelector(
    (store) => store.homeCategory.homeCategories,
  );
  return (
    <div className="flex flex-wrap  justify-between py-5 lg:px-20 border-b border-gray-300">
      {homeCategories?.electricCategories?.slice(0, 7)?.map((item) => (
        <ElectronicCategoryCard key={item.categoryId} item={item} />
      ))}
    </div>
  );
};

export default ElectronicCategory;
