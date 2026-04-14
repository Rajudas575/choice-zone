import HomeCategoryTable from "../HomePage/HomeCategoryTable";
import store, { useAppSelector } from "../../tempReduxToolkit/store";

export default function DealTable() {
  const homeCategories = useAppSelector(
    (store) => store.homeCategory.homeCategories,
  );
  return <HomeCategoryTable categories={homeCategories.dealCategories} />;
}
