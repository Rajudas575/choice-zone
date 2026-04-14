import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./features/Auth/AuthSlice";
import userReducer from "./features/customer/userSlice";
import productReducer from "./features/customer/ProductSlice";
import orderReducer from "./features/customer/orderSlice";
import cartReducer from "./features/customer/cartSlice";
import couponReducer from "./features/customer/couponSlice";
import homeCategoryReducer from "./features/customer/homeCategorySlice";
import sellerAuthReducer from "./features/seller/sellerAuthentication";
import sellerOrderReducer from "./features/seller/sellerOrderSlice";
import sellerProductReducer from "./features/seller/sellerProductSlice";
import sellerReducer from "./features/seller/sellerSlice";
import transactionReducer from "./features/seller/transactionSlice";
import adminSlice from "./features/admin/adminSlice";
import dealSlice from "./features/admin/dealSlice";
import adminCouponReducer from "./features/admin/couponSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  cart: cartReducer,
  coupon: couponReducer,
  homeCategory: homeCategoryReducer,

  sellerAuth: sellerAuthReducer,
  sellerOrder: sellerOrderReducer,
  sellerProduct: sellerProductReducer,
  seller: sellerReducer,
  transaction: transactionReducer,

  admin: adminSlice,
  deal: dealSlice,
  adminCoupon: adminCouponReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AddDispath = typeof store.dispatch;
export type RootReducer = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AddDispath>();

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;

export default store;
