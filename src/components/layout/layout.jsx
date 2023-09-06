/* eslint-disable no-unused-vars */
import { Link, Outlet } from 'react-router-dom';

import Header from '../header/header';

import Style from './layout.module.scss';
const Layout = () => {
  const { container } = Style;
  return (
    <>
      <Header />
      <main className={container}>
        <Outlet />
      </main>
      <footer>###</footer>
    </>
  );
};

export default Layout;
