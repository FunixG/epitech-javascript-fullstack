import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardPopup from './components/global/CardPopup';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <CardPopup />
      <Footer />
    </>
  );
}

export default Layout;
