/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../assets/img/х.svg';
import { storedUser } from '../redux/actions/userActions/userActions';
import { postAxios } from '../redux/reducers/createArticle/createArticle';
import { setSlug } from '../redux/reducers/slugAxios/slugAxios';

import Style from './header.module.scss';
const Header = () => {
  const dispatch = useDispatch();
  const { container, SignUp, SignUpBtn, X, XContainer } = Style;
  const { updateProfile } = useSelector((state) => state.profile);
  const { post } = useSelector((state) => state.postCreate);
  const [stored, setStored] = useState(storedUser);
  console.log(stored);
  useEffect(() => {
    setStored(storedUser);
    if (storedUser && Object.keys(storedUser).length === 0) {
      setStored(null);
    }
  }, [stored, updateProfile]);

  const onClickCareate = () => {
    dispatch(setSlug(''));
  };

  return (
    <>
      <div className={container}>
        <div className={XContainer}>
          <Link to="/">
            <img src={Logo} alt="logo" className={X} />
          </Link>
        </div>
        {stored && Object.keys(stored).length > 0 ? (
          <button>
            <Link to="/profile">
              {stored && stored.image ? (
                <img
                  src={stored.image}
                  alt="user"
                  style={{ width: '2.875rem', height: '2.875rem', borderRadius: '50%' }}
                />
              ) : (
                'user'
              )}
            </Link>
          </button>
        ) : (
          <button>
            <Link to={'/auntification'}>Sign In</Link>
          </button>
        )}

        <button className={SignUpBtn}>
          <Link to="/registration" className={SignUp}>
            Sign Up
          </Link>
        </button>
        <button onClick={onClickCareate}>
          <Link to={'/create'}>createArticle</Link>
        </button>
      </div>
    </>
  );
};

export default Header;
