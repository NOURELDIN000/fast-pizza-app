/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getQuantityById } from "../../features/cart/CartSlice";
import DeleteItem from "../../ui/DeleteItem";
import UpdateCartQuantity from "../../features/cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  function handleAddToCart() {
    console.log(id);
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  const currentQuantity = useSelector(getQuantityById(id));
  
  const isInCart = currentQuantity > 0;

  return (
    <li className="flex gap-4 py-2 pt-0.5  ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""} `}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(",  ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          <div >

          

         { !soldOut && !isInCart && <Button type="small" onClick={handleAddToCart}>
            Add To Cart
          </Button> }

          {  isInCart &&
          <div className="flex items-center gap-3">
            <UpdateCartQuantity  pizzaId={id} currentQuantity={currentQuantity}/>
            <DeleteItem pizzaId={id}/>
          </div> 
          }
          </div>

        </div>
      </div>
    </li>
  );
}

export default MenuItem;
