import React from "react";
import Navbar from "../../common/Navbar";
import SellerDraweList from "./SideBar/SellerDraweList";
import SellerRoutes from "../../routes/SellerRoutes";
import { useAppDispatch } from "../../tempReduxToolkit/store";
import { useEffect } from "react";
import { fetchSellerReport } from "../../tempReduxToolkit/features/seller/sellerSlice";

const SellerDashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerReport(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar DrawerList={SellerDraweList} />
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
          <SellerDraweList />
        </div>
        <div className="p-10 w-full lg:w-[80%] overflow-y-auto">
          <SellerRoutes />
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;
