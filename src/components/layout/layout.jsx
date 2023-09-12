/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSlug, slugAxiox } from '../redux/reducers/slugAxios/slugAxios';
import Header from '../header/header';
import { storedSlug } from '../local-store/local-store';
import Loader from '../../components/ui/loading/spin';

import Style from './layout.module.scss';
const Layout = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { loading } = useSelector((state) => state.article);
  useSelector((state) => state.slug);
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
        if (location.pathname !== '/') {
          setTimeout(() => {
            localStorage.removeItem('slug');
          }, 0);
          dispatch(setSlug(''));
          navigate(-1);
        }
      }
      if (event.key === 'ArrowRight') {
        if (location.pathname !== '/') {
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
