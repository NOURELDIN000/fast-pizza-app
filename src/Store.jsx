// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./features/user/UserSlice";
import CartSlice from "./features/cart/CartSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    cart: CartSlice,
  },
});
