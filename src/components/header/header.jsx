/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../assets/img/х.svg';
import { setUser } from '../redux/reducers/userAuentification/userAuentification';
import defaultUserImg from '../assets/img/Rectangle 1.png';
import { setProfile } from '../redux/reducers/profile/profile';
import { setSlug } from '../redux/reducers/slugAxios/slugAxios';
import { setAuthor } from '../redux/reducers/filterUserProfile/filterUserProfile';

import Style from './header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  const {
    container,
    SignUp,
    SignUpBtn,
    X,
    XContainer,
    userImg,
    userContainer,
    userInfo,
    logOut,
    createArticle,
    SignIn,
    btnContainer,
  } = Style;

  const { updateProfile, profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auentification);
  const { post } = useSelector((state) => state.postCreate);
  const [jsxCode, setJsxCode] = useState(null);
  const [localStorageUpdated, setLocalStorageUpdated] = useState(false);

  const onClickCreate = () => {
    dispatch(setSlug(''));
    dispatch(setAuthor({}));
    localStorage.removeItem('slug');
  };

  const setClearUser = () => {
    localStorage.removeItem('user');
    setLocalStorageUpdated(false);
    dispatch(setProfile(null));
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
      dispatch(setUser(storedUserData));
      setLocalStorageUpdated(true);
    } else {
      setLocalStorageUpdated(false);
    }
  }, [dispatch, updateProfile]);

  useEffect(() => {
    if (updateProfile?.username || user) {
      setLocalStorageUpdated(true);
    } else {
      setLocalStorageUpdated(false);
    }
  }, [updateProfile, user]);

  useEffect(() => {
    if (localStorageUpdated) {
      setJsxCode(
        <div className={userInfo}>
          {updateProfile?.image || user?.image ? (
            <img src={updateProfile?.image || user?.image} alt="user" className={userImg} />
          ) : (
            <img src={defaultUserImg} alt="defaultUserImg" className={userImg} />
          )}
          <div>{user?.username}</div>
        </div>
      );
    } else {
      setJsxCode(null);
    }
  }, [localStorageUpdated, user]);

  return (
    <div className={container}>
      <div className={XContainer} onClick={onClickCreate}>
        <Link to="/">
          <img src={Logo} alt="logo" className={X} />
        </Link>
      </div>
      {updateProfile?.username || localStorageUpdated ? (
        <div className={userContainer}>
          <button onClick={onClickCreate} className={createArticle}>
            <Link to={'/new-article'}>Create Article</Link>
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
  );
};

export default Header;
