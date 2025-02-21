import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../../../redux/actions/orderActions';
import OrderCard from '../order/OrderCard'

const Orders = () => {
  const {order} = useSelector(state => state);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")

  useEffect(()=>{
    dispatch(getUserOrders(jwt))
  },[dispatch])

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-5 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
        { order.orders.map((order)=>order.items.map((item)=><OrderCard status={order.orderStatus} order={item}/>))}
      </div>
    </div>
  )
}

export default Orders