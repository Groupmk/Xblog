/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { registerUser } from '../../redux/actions/userActions/userActions.js';
import { registerSuccess } from '../../redux/reducers/userReduser/userReducer';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [castomErrors, setCastomErrors] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const inputFields = [
    { name: 'username', type: 'text', placeholder: 'Имя пользователя', minLength: 3, maxLength: 20 },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Пароль', minLength: 3, maxLength: 40 },
    { name: 'confirmPassword', type: 'password', placeholder: 'Подтвердите пароль' },
    { name: 'PD', type: 'checkbox', placeholder: 'I agree' },
  ];

  const handleOnSubmit = async (data) => {
    reset();
    dispatch(registerSuccess(data));
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return;
    }

    try {
      await dispatch(registerUser(data));
      if (error) {
        setRedirectToLogin(true);
      }
    } catch (error) {
      setCastomErrors(true);
    }
  };

  useEffect(() => {
    if (redirectToLogin) {
      return navigate('/auntification');
    }
  }, [redirectToLogin, user, error, navigate]);
  console.log(redirectToLogin);
  return (
    <div>
      {error && <p>Логин или пароль уже использовались</p>}
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {inputFields.map((field) => (
          <div key={field.name}>
            {field.type === 'checkbox' ? (
              <>
                <label>
                  <input type={field.type} name={field.name} {...register(field.name, { required: true })} />
                  {field.placeholder}
                </label>
                <div>{errors?.[field.name] && 'Поле обязательно'}</div>
              </>
            ) : (
              <div>
                <label>{field.placeholder}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  {...register(field.name, {
                    required: 'Поле обязательно',
                    minLength: {
                      value: field.minLength,
                      message: `Минимум ${field.minLength} символа`,
                    },
                    maxLength: {
                      value: field.maxLength,
                      message: `Максимум ${field.maxLength} символов`,
                    },
                  })}
                />
                {field.name === 'confirmPassword' && watch('password') !== watch('confirmPassword') && (
                  <div>{'Пароли не совпадают'}</div>
                )}
                <div>{errors?.[field.name] && <p>{errors?.[field.name]?.message || 'Поле обязательно'}</p>}</div>
              </div>
            )}
          </div>
        ))}
        <button type="submit" disabled={!isValid}>
          Up
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
