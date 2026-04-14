import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import OrderStepper from "./OrderStepper";
import { Payment } from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../tempReduxToolkit/store";
import {
  fetchOrderById,
  fetchOrderItemById,
} from "../../../tempReduxToolkit/features/customer/orderSlice";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const orderId = params.orderId;
  const orderItemId = params.orderItemId;
  const { orderItem, currentOrder } = useAppSelector((store) => store.order);

  useEffect(() => {
    if (orderId && orderItemId) {
      dispatch(
        fetchOrderItemById({
          jwt: localStorage.getItem("jwt"),
          orderItemId,
        }),
      );

      dispatch(
        fetchOrderById({
          jwt: localStorage.getItem("jwt"),
          orderId,
        }),
      );
    }
  }, [orderId, orderItemId]);

  return (
    <Box className="space-y-5">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img className="w-[100px]" src={orderItem?.product.images[0]} alt="" />

        <div className="text-sm space-y-1 text-center ">
          <h1>{"Choice Bazzar"}</h1>
          <p>{orderItem?.product.title}</p>
          <p>{"size: FREE"}</p>
        </div>
      </section>
      <section className="border border-gray-200 p-5">
        <OrderStepper />
      </section>
      <section className="border border-gray-200 p-5">
        <h1 className="font-bold pb-3"> Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{currentOrder?.shippingAddress?.name}</p>
            <Divider flexItem orientation="vertical" />
            <p>{currentOrder?.shippingAddress?.mobile}</p>
          </div>
          <p>
            {currentOrder?.shippingAddress?.address},
            {currentOrder?.shippingAddress?.locality},
            {currentOrder?.shippingAddress?.city},
            {currentOrder?.shippingAddress?.state},
            {currentOrder?.shippingAddress?.pincode},
          </p>
        </div>
      </section>
      <section className="border border-gray-200 space-y-4">
        <div className="flex justify-between text-sm pt-5 px-5">
          <div className="space-y-1">
            <p className="font-black">Total Item Price</p>
            <p>
              You saved{" "}
              <span className="text-green-400">
                ₹{orderItem?.mrpPrice - currentOrder?.totalSellingPrice} on this
                item
              </span>
            </p>
          </div>
          <p>₹{currentOrder?.totalSellingPrice}</p>
        </div>
        <div className="px-5">
          <div className="bg-blue-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <Payment />
            <p>Pay on delivery</p>
          </div>
        </div>
        <Divider />
        <div className="px-5 pt-5">
          <p className="text-xs">
            <strong>Sold By :</strong> Manaj Singh
          </p>
        </div>
        <div className="p-10">
          <Button fullWidth variant="outlined">
            Cancel Order
          </Button>
        </div>
      </section>
    </Box>
  );
};

export default OrderDetails;
