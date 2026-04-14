import React, { useEffect } from "react";
import Navbar from "../../common/Navbar";
import AdminDrawerList from "../Sidebar/AdminDrawerList";
import AdminRoutes from "../../routes/AdminRoutes";
import { useAppDispatch } from "../../tempReduxToolkit/store";
import { fetchHomeCategories } from "../../tempReduxToolkit/features/admin/adminSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeCategories({}));
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar DrawerList={AdminDrawerList} />
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
          <AdminDrawerList />
        </div>
        <div className="p-10 w-full lg:w-[80%] overflow-auto">
          <AdminRoutes />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
