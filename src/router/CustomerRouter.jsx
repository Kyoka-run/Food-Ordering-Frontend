import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../component/customer/HomePage'
import Navbar from '../component/shared/Navbar'
import Cart from '../component/customer/Cart'
import Profile from '../component/customer/Profile'
import PaymentSuccess from '../component/customer/PaymentSuccess'
import Search from '../component/customer/Search'
import CreateRestaurantForm from '../component/admin/CreateRestaurantForm'
import Restaurant from '../component/customer/Restaurant'
import PasswordChangeSuccess from '../component/customer/PasswordChangeSuccess'
import NotFound from '../component/customer/NotFound'

const CustomerRouter = () => {
  return (
    <div className='relative'>
      <nav className="sticky top-0 z-50">
        <Navbar/>
      </nav>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/account/:register' element={<HomePage/>}/>
        <Route exact path='/restaurant/:city/:title/:id' element={<Restaurant/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
        <Route path='/my-profile/*' element={<Profile/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/admin/add-restaurant' element={<CreateRestaurantForm/>}/>
        <Route exact path='/password_change_success' element={<PasswordChangeSuccess/>}/>
        <Route exact path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default CustomerRouter