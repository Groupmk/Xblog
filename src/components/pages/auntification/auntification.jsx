/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { authenticate } from '../../redux/actions/userActions/userActions';
import { setFlag } from '../../redux/reducers/userAuentification/userAuentification';
import Loader from '../../ui/loading/spin';

import Style from './aunification.module.scss';

const Authentication = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auentification);
  const { user, loading } = useSelector((state) => state.auentification);
  const navigate = useNavigate();
  const { container, formText, submitBtn, footerText, signUp, errr } = Style;
  const [articleData, setArticleData] = useState({
    email: '',
  });
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const fetchStoredEmail = async () => {
      const storedEmail = await JSON.parse(localStorage.getItem('mail'));
      if (storedEmail) {
        setArticleData({
          ...articleData,
          email: storedEmail,
        });
      }
    };

    fetchStoredEmail();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const inputFields = [
    { name: 'email', type: 'email', placeholder: 'Email', className: 'email', label: 'Email address' },
    { name: 'password', type: 'password', placeholder: 'Пароль', className: 'password', label: 'Password' },
  ];
  const [isLoading, setIsLoading] = useState(false);

  const handleOneSubmit = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    localStorage.setItem('mail', JSON.stringify(articleData.email));
    try {
      dispatch(authenticate({ ...articleData }));
      dispatch(setFlag(true));
      reset();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  console.log(loading);

  return (
    <div>
      <form onSubmit={handleSubmit(handleOneSubmit)} className={container}>
        {error && <p className={errr}>Ошибка аутентификации</p>}
        <p className={formText}>Sign In</p>
        {inputFields.map(({ name, type, placeholder, label }) => (
          <label htmlFor={name} key={name} className={Style.labelText}>
            {label && <span>{label}</span>}
            <input
              key={name}
              id={name}
              type={type}
              name={name}
              {...register(name)}
              placeholder={placeholder}
              className={Style[name]}
              value={articleData[name] || ''}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  [name]: e.target.value,
                })
              }
            />
          </label>
        ))}
        <button type="submit" disabled={!isValid || isLoading} className={submitBtn}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        <p className={footerText}>
          Don’t have an account?{' '}
          <Link to="/registration" className={signUp}>
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Authentication;
