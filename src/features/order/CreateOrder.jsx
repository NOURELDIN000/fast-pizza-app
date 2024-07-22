/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
/* eslint-disable react/no-unescaped-entities */
import { Form,  redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../../features/cart/CartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { store } from "../../Store";
import EmptyCart from "../../features/cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
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
  const priorityPrice = withPriority ?  totalCartPrice * 0.2 : 0 ;

  const totalPrice = totalCartPrice + priorityPrice;

 

  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const username = useSelector((store)=> store.user.username);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className=" md:w-[700px]  lg:w-[900px] sm:w-[500px] w-[300px] mx-auto mt-10">
      <h2 className="font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="mt-5">
        <div className="max-md:flex  max-md:items-center  md:block">
          <label className="max-md:basis-40 md:mb-2 inline-block">First Name</label>
          <div className="max-md:grow ">

          <input className="input w-full " type="text" name="customer" defaultValue={username} required />
          </div>
        </div>

        <div className="max-md:flex  max-md:items-center  md:block mt-5">
          <label className="max-md:basis-40 md:mb-2 inline-block">Phone number</label>
          <div className="max-md:grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-red-800 bg-red-300 rounded-sm py-1 px-2 text-xs mt-2">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="max-md:flex  max-md:items-center  md:block mt-5">
          <label className="max-md:basis-40 md:mb-2 inline-block">Address</label>
          <div className="max-md:grow">
            <input className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div className="mt-8 flex items-center">
          <input
          className=" accent-yellow-300 h-4 w-4  mr-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
<input  type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button type = 'primary'>{   isSubmitting ? 'placing order...' :     `Order now From ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  ); 



}

export async function action({request}){
  const formData = await request.formData()
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === true
  }

  const errors = {};
  if(!isValidPhone(order.phone)) 
   errors.phone = 'please enter a correct phone number'
  if(Object.keys(errors).length > 0) return errors;
  
  const newOrder = await createOrder(order);
 
store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}


export default CreateOrder;
