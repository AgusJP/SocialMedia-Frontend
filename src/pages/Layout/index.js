import React from 'react';
import NavBar from '../../components/NavBar/index.js';

const Layout = ({children}) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout;