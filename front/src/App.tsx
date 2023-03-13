import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './Layout';
import Products from './pages/products/Products';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Purchases from './pages/purchases/Purchases';
import User from './pages/user/User';
import Admin from './pages/admin/Admin';
import AdminUsers from './pages/admin/users/AdminUsers';
import AdminProducts from './pages/admin/produtcts/AdminProducts';
import AdminCreateProduct from './pages/admin/produtcts/AdminCreateProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/adminproducts" element={<AdminProducts />} />
          <Route path="/admincreateproducts" element={<AdminCreateProduct />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
