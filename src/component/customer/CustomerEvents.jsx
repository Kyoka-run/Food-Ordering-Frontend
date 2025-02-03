import React, { useEffect } from 'react'
import { getAllEvents } from '../../redux/actions/restaurantActions';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../admin/EventCard';

const CustomerEvents = () => {
  const dispatch=useDispatch()
  const jwt = localStorage.getItem("jwt")
 
  const {restaurant,auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getAllEvents({jwt}))
  },[auth.jwt])
  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
    {restaurant.events.map((item)=> <div>
      <EventCard isCustomer={true} item={item}/>
    </div>)}
   
  </div>
  )
}

export default CustomerEvents