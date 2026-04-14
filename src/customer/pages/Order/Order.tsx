import React, { useEffect } from "react";
import OrderItemCard from "./OrderItemCard";
import { useNavigate } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../tempReduxToolkit/store";
import { fetchUserOrderHistory } from "../../../tempReduxToolkit/features/customer/orderSlice";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orderState = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="text-sm min-h-screen">
      <div className="ph-5">
        <h1 className="font-semibold">All Orders</h1>
        <p>from anytime</p>
      </div>
      <div className="space-y-2">
        {orderState?.orders?.map((order: any) =>
          order?.orderItems?.map((orderItem: any) => (
            <OrderItemCard
              key={orderItem._id}
              orderItem={orderItem}
              order={order}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Order;
