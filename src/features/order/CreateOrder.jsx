/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
/* eslint-disable react/no-unescaped-entities */
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCart,
  getTotalPrice,
} from "../../features/cart/CartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { store } from "../../Store";
import EmptyCart from "../../features/cart/EmptyCart";
import { fetchAddress } from "../../features/user/UserSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);

  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    error: errorAddress,
    address,
    position,
  } = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === "loading";

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-auto mt-10 w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px]">
      <h2 className="font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="mt-5">
        <div className="max-md:flex max-md:items-center md:block">
          <label className="inline-block max-md:basis-40 md:mb-2">
            First Name
          </label>
          <div className="max-md:grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>

        <div className="mt-5 max-md:flex max-md:items-center md:block">
          <label className="inline-block max-md:basis-40 md:mb-2">
            Phone number
          </label>
          <div className="max-md:grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-5 max-md:flex max-md:items-center md:block">
          <label className="inline-block max-md:basis-40 md:mb-2">
            Address
          </label>
          <div className="max-md:grow">
            <input
              className="input w-full"
              type="text"
              defaultValue={address}
              name="address"
              disabled={isLoadingAddress}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
            {!address && (
              <span className="absolute right-[2px] top-[2px] md:top-[33px]">
                <Button
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isLoadingAddress}
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center">
          <input
            className="mr-2 h-4 w-4 accent-yellow-300"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.latitude
              ? `${position.latitude}, ${position.longitude} `
              : ""
          }
        />
        <div>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "placing order..."
              : `Order now From ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please enter a correct phone number";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
