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
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
