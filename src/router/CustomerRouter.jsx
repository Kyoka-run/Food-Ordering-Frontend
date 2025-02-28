import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../component/customer/home/HomePage'
import Navbar from '../component/Navbar'
import Cart from '../component/customer/cart/Cart'
import Profile from '../component/customer/profile/Profile'
import PaymentSuccess from '../component/customer/checkout/PaymentSuccess'
import Search from '../component/customer/search/Search'
import Restaurant from '../component/customer/restaurant/Restaurant'
import PasswordChangeSuccess from '../component/customer/auth/PasswordChangeSuccess'

const CustomerRouter = () => {
  return (
    <div className='relative'>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/account/:register' element={<HomePage/>}/>
        <Route exact path='/restaurant/:id' element={<Restaurant/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/payment/success' element={<PaymentSuccess/>}/>
        <Route path='/my-profile/*' element={<Profile/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route exact path='/password_change_success' element={<PasswordChangeSuccess/>}/>
      </Routes>
    </div>
  )
}

export default CustomerRouter