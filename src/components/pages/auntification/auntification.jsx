/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { authenticate } from '../../redux/actions/userActions/userActions';

import Style from './aunification.module.scss';

const Authentication = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();
  const { container, formText, submitBtn, footerText, signUp, errorStyle } = Style;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const inputFields = [
    { name: 'email', type: 'email', placeholder: 'Email', className: 'email', label: 'Email address' },
    { name: 'password', type: 'password', placeholder: 'Пароль', className: 'password', label: 'Password' },
  ];

  const handleOneSubmit = (data) => {
    reset();
    dispatch(authenticate(data));
    navigate('/');
  };
  return (
    <div>
      {error && <p>Ошибка аутентификации: {error}</p>}
      <form onSubmit={handleSubmit(handleOneSubmit)} className={container}>
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
            />
          </label>
        ))}
        <button type="submit" disabled={!isValid} className={submitBtn}>
          {loading ? 'Загрузка...' : 'Login'}
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
