/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSlug, slugAxiox } from '../redux/reducers/slugAxios/slugAxios';
import Header from '../header/header';
import { storedSlug } from '../local-store/local-store';
import Loader from '../../components/ui/loading/spin';

import Style from './layout.module.scss';
const Layout = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { articlesArray, loading, error, page, limit, offset } = useSelector((state) => state.article);
  const { slugArray } = useSelector((state) => state.slug);
  const { container } = Style;

  const location = useLocation();
  const navigate = useNavigate();

  const removeSlug = slug;

  const updateSlug = (removeSlug) => {
    dispatch(setSlug(removeSlug));
    dispatch(slugAxiox({ slug: removeSlug }));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        console.log('Key pressed:', event.key);
        if (location.pathname !== '/') {
          setTimeout(() => {
            localStorage.removeItem('slug');
          }, 0);
          console.log('location.pathname:', location.pathname);
          dispatch(setSlug(''));
          navigate(-1);
        }
      }
      if (event.key === 'ArrowRight') {
        if (location.pathname !== '/') {
          console.log('Key pressed:', event.key);
          console.log(removeSlug);
          updateSlug(removeSlug);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, location, dispatch, removeSlug, storedSlug]);
  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <main className={container} id="main">
          <Outlet />
        </main>
      )}
      <footer>###</footer>
    </>
  );
};

export default Layout;
