// @ts-nocheck
/* eslint-disable react/prop-types */
import DeleteItem from "../../ui/DeleteItem";
import { formatCurrency } from "../../utils/helpers";
import UpdateCartQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getQuantityById } from "./CartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getQuantityById(pizzaId));

  return (
    <li className="py-3 max-md:flex max-md:items-center max-md:justify-between md:block">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between max-md:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <div className="flex items-center gap-4">
          <UpdateCartQuantity
            pizzaId={pizzaId}
            currentQuantity={currentQuantity}
          />
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
