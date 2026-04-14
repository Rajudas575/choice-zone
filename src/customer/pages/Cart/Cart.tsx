import React, { useEffect } from "react";
import CartItemCart from "./CartItemCart";
import { Favorite, LocalOffer } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PricingCard from "./PricingCard";
import store, {
  useAppDispatch,
  useAppSelector,
} from "../../../tempReduxToolkit/store";
import { fetchCart } from "../../../tempReduxToolkit/features/customer/cartSlice";
import { useNavigate } from "react-router";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((store) => store.cart);
  // console.log("cart--", cart);

  useEffect(() => {
    dispatch(fetchCart(localStorage.getItem("jwt")));
  }, []);
  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      {cart.cart?.cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {cart.cart?.cartItems.map((item) => (
              <CartItemCart key={item._id} item={item} />
            ))}
          </div>

          <div className="col-span-1 text-sm space-y-3">
            <div className="border  border-gray-300 rounded-md px-5 py-3 space-y-5">
              <div>
                <div className="flex gap-3 text-sm items-center">
                  <LocalOffer color="primary" sx={{ fontSize: "17px" }} />
                  <span>Apply Coupons</span>
                </div>
              </div>
              <div className="flex justify-beteen items-center">
                <TextField placeholder="coupon code" size="small" />
                <Button size="small">Apply</Button>
              </div>
            </div>
            <section className="border rounded-md border-gray-300 rounded-md">
              <PricingCard />
              <div className="p-5">
                <Button
                  onClick={() => navigate("/checkout/address")}
                  sx={{ py: "11px" }}
                  fullWidth
                  variant="contained">
                  BUY NOW
                </Button>
              </div>
            </section>
            <div className="border border-gray-300 rounded-md px-5 py-4 flex justify-between items-center cursor-pointer">
              <span>Add From Wishlist</span>
              <Favorite color="primary" />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-2xl text-center font-semibold">Cart is empty!</h1>
      )}
    </div>
  );
};

export default Cart;
