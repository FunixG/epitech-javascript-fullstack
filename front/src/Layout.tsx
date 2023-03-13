import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardPopup from './components/global/CardPopup';
import Websocket from './components/Websocket';

function Layout() {
  return (
    <>
      <Websocket />
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
