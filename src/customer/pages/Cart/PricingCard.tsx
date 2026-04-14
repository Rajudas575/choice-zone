import Divider from "@mui/material/Divider";
import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../tempReduxToolkit/store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../util/sumCartItemSellingPrice";
import { fetchCart } from "../../../tempReduxToolkit/features/customer/cartSlice";

const PricingCard = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((store) => store.cart);

  useEffect(() => {
    dispatch(fetchCart(localStorage.getItem("jwt")));
  }, []);
  return (
    <>
      {cart.cart ? (
        <div className="">
          <div className="space-y-3 p-5">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>₹{sumCartItemMrpPrice(cart.cart?.cartItems)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Discount</span>
              <span>
                ₹
                {sumCartItemMrpPrice(cart.cart?.cartItems) -
                  sumCartItemSellingPrice(cart.cart?.cartItems)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span>₹{79}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Plateform Fee</span>
              <span>Free</span>
            </div>
          </div>
          <Divider />
          <div className="font-medium px-5 py-5 flex justify-between items-center">
            <span>Total</span>
            <span>₹{sumCartItemSellingPrice(cart.cart?.cartItems) + 79}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PricingCard;
