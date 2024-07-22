/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/cart/CartSlice';

export default function DeleteItem({pizzaId}) {
    const dispatch = useDispatch();
  return (
    <Button type='small' onClick={()=> dispatch(deleteItem(pizzaId))}> Delete</Button>
  )
}
