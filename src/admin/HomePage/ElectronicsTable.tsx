import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import store, { useAppSelector } from "../../tempReduxToolkit/store";

const ElectronicsTable = () => {
  const homeCategories = useAppSelector(
    (store) => store.homeCategory.homeCategories,
  );
  return (
    <>
      <HomeCategoryTable categories={homeCategories?.electricCategories} />
    </>
  );
};

export default ElectronicsTable;
