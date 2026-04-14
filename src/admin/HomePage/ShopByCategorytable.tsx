import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import store, { useAppSelector } from "../../tempReduxToolkit/store";

const ShopByCategorytable = () => {
  const homeCategories = useAppSelector(
    (store) => store.homeCategory.homeCategories,
  );
  return <HomeCategoryTable categories={homeCategories?.shopByCategories} />;
};

export default ShopByCategorytable;
