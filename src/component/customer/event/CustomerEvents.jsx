import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../../redux/actions/restaurantActions';
import EventCard from '../../admin/event/EventCard';

const CustomerEvents = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
 
  const {restaurant} = useSelector(store => store);

  useEffect(()=>{
    dispatch(getAllEvents({jwt}))
  },[dispatch])

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-5 font-semibold">Events</h1>
      {restaurant.events.map((item)=> <div>
        <EventCard isCustomer={true} item={item}/>
      </div>)}
    </div>
  )
}

export default CustomerEvents