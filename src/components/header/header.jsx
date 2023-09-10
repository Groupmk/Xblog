/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../assets/img/х.svg';
import { storedUser } from '../redux/actions/userActions/userActions';
import { postAxios } from '../redux/reducers/createArticle/createArticle';
import { clearUser } from '../redux/reducers/userReduser/userReducer';
import { setSlug, setSlugArray } from '../redux/reducers/slugAxios/slugAxios';
import defaultImg from '../assets/img/Rectangle 1.png';

import Style from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const {
    container,
    SignUp,
    SignUpBtn,
    X,
    XContainer,
    user,
    userContainer,
    userInfo,
    logOut,
    createArticle,
    SignIn,
    btnContainer,
  } = Style;

  const { updateProfile, profile } = useSelector((state) => state.profile);
  const { post } = useSelector((state) => state.postCreate);
  const [jsxCode, setJsxCode] = useState(null);
  const [localStorageUpdated, setLocalStorageUpdated] = useState(false);

  console.log(defaultImg);

  const onClickCareate = () => {
    dispatch(setSlug(''));
    localStorage.removeItem('slug');
  };

  const setClearUser = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    setLocalStorageUpdated(true);
  };

  useEffect(() => {
    if (storedUser && (storedUser.image || defaultImg)) {
      const imageUser = storedUser.image ? (
        <img src={storedUser.image} alt="user" className={user} />
      ) : (
        <img src={defaultImg} alt="user" className={user} />
      );

      const userName = <div>{storedUser.username}</div>;
      setJsxCode(
        <div className={userInfo}>
          {userName} {imageUser}
        </div>
      );
    } else if (storedUser === null || localStorageUpdated) {
      setJsxCode(null);
      setLocalStorageUpdated(false);
    }
  }, [storedUser, localStorageUpdated, storedUser?.image, storedUser?.username]);

  return (
    <>
      <div className={container}>
        <div className={XContainer} onClick={onClickCareate}>
          <Link to="/">
            <img src={Logo} alt="logo" className={X} />
          </Link>
        </div>
        {storedUser && !localStorageUpdated ? (
          <div className={userContainer}>
            <button onClick={onClickCareate} className={createArticle}>
              <Link to={'/new-article'}>createArticle</Link>
            </button>
            <button>
              <Link to={'/profile'}>{jsxCode}</Link>
            </button>
            <button className={logOut} onClick={setClearUser}>
              Log Out
            </button>
          </div>
        ) : (
          <div className={btnContainer}>
            <button className={SignIn}>
              <Link to={'/auntification'}>Sign In</Link>
            </button>
            <button className={SignUpBtn}>
              <Link to="/registration">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
