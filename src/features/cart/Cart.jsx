/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
// @ts-nocheck

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./CartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((store) => store.user.username);

  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-5 text-xl font-bold">Your cart, {username}</h2>
      <ul className="mt-8 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-8 space-x-6">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
