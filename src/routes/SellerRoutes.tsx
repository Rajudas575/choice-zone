import React from 'react'
import { Route, Routes } from 'react-router';
import HomePage from '../seller/HomePage/HomePage';
import Products from '../seller/products/Products';
import AddProducts from '../seller/products/AddProducts';
import Orders from '../seller/Orders/Orders'
import Account from '../seller/Account/Account';
import Payment from '../seller/Payment/Payment';
import Transactions from '../seller/Transaction/Transactions';

const SellerRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/add-product" element={<AddProducts/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/transaction" element={<Transactions/>}/>
    </Routes>
  )
}

export default SellerRoutes