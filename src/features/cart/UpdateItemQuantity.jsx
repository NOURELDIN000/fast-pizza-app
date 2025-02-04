/* eslint-disable react/prop-types */
// @ts-nocheck
import { useDispatch } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './CartSlice';
import Button from '../../ui/Button';

export default function UpdateCartQuantity({pizzaId, currentQuantity}) {
    const dispatch = useDispatch();
  return (
    <div className=' max-sm:space-x-2  space-x-4'>
        <Button type='round' onClick={()=> dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span className='font-medium'>{currentQuantity}</span>
        <Button type='round' onClick={()=> dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
  )
}
