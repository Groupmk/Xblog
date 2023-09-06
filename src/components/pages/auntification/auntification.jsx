/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { authenticate } from '../../redux/actions/userActions/userActions';

const Authentication = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const inputFields = [
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Пароль' },
  ];

  const handleOneSubmit = (data) => {
    reset();
    console.log(data);
    dispatch(authenticate(data));
    setRedirectToLogin(true);
  };
  useEffect(() => {
    if (redirectToLogin && user) {
      navigate('/');
    }
  }, [redirectToLogin, user]);
  return (
    <div>
      <h2>Аутентификация</h2>
      {error && <p>Ошибка аутентификации: {error}</p>}
      <form onSubmit={handleSubmit(handleOneSubmit)}>
        {inputFields.map(({ name, type, placeholder }) => (
          <label key={name}>
            <input
              key={name}
              type={type}
              name={name}
              {...register(name, { required: true })}
              placeholder={placeholder}
            />
            <div>{errors?.[name] && 'Поле обязательно'}</div>
          </label>
        ))}
        <button type="submit" disabled={!isValid}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Authentication;
