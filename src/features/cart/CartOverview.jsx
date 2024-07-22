// @ts-nocheck
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./CartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const navigate = useNavigate();
  const totalCartQuantity = useSelector(getTotalQuantity);
  const totalCartPrice = useSelector(getTotalPrice);



if(!totalCartPrice) return ;

  return (
     
    

    <div className="bg-stone-800 text-stone-100 flex justify-between p-4 ">
      <p className="space-x-3 ">
        <span>{totalCartQuantity} pizzas</span>
        <span className=" inline-block">{formatCurrency(totalCartPrice)}</span>
      </p>
      <a   className=" cursor-pointer" onClick={()=>navigate('/cart')} >Open cart &rarr;</a>
    </div>
  );
}

export default CartOverview;
