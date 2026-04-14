import React from "react";
import { Divider } from "@mui/material";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import { Route, Routes, useNavigate } from "react-router";
import UserDetails from "../account/UserDetails";
import { useAppDispatch } from "../../../tempReduxToolkit/store";
import { performLogout } from "../../../tempReduxToolkit/features/Auth/AuthSlice";

const menu = [
  { name: "orders", path: "/account/orders" },
  { name: "profile", path: "/account" },
  { name: "Saved Cards", path: "/account/saved-card" },
  { name: "Addresses", path: "/account/addresses" },
  { name: "Logout", path: "/" },
];

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (item: any) => {
    if (item.name === "Logout") handleLogout();
    navigate(item.path);
  };

  const handleLogout = () => {
    dispatch(performLogout());
  };

  return (
    <div className="px-5 lg:px-53 min-h-screen mt-10">
      <div>
        <h1 className="text-xl font-bold pb-5">Choice</h1>
      </div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <div className="col-span-1 lg:border-r border-gray-200 lg:pr-5 py-5 h-full flex flex-row flex-wrap lg:flex-col gap-3">
          {menu.map((item) => (
            <div
              onClick={() => handleClick(item)}
              className="px-5 py-3 rounded-md hover:bg-[#004e98] hover:text-white cursor-pointer"
              key={item.path}>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route index element={<UserDetails />} />

            <Route path="orders" element={<Order />} />

            <Route
              path="orders/:orderId/item/:orderItemId"
              element={<OrderDetails />}
            />
          </Routes>

          {/* <Order/> */}
          {/* <OrderDetails /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
