/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { registerUser } from '../../redux/actions/userActions/userActions.js';
import { registerSuccess } from '../../redux/reducers/userReduser/userReducer';

import Style from './registration.module.scss';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.user);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [castomErrors, setCastomErrors] = useState('данные уже использовались или введены не корректно');
  const { container, formText, errrConfirm, errr, submitBtn, footerText, signIn, errorUser } = Style;

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
    {
      name: 'username',
      type: 'text',
      placeholder: 'Имя пользователя',
      minLength: 3,
      maxLength: 20,
      className: 'username',
      label: 'Username',
    },
    { name: 'email', type: 'email', placeholder: 'Email', className: 'email', label: 'Email address' },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      minLength: 3,
      maxLength: 40,
      className: 'password',
      label: 'Password',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Подтвердите пароль',
      className: 'confirmPassword',
      label: 'Repeat Password',
    },
    {
      name: 'PD',
      type: 'checkbox',
      placeholder: 'I agree',
      className: 'PD',
      label: 'I agree to the processing of my personal information',
    },
  ];

  const handleOnSubmit = async (data) => {
    reset();
    dispatch(registerSuccess(data));
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return;
    }

    dispatch(registerUser(data));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    error !== null && setRedirectToLogin(true);
  };
  useEffect(() => {
    if (redirectToLogin) {
      return navigate('/auntification');
    }
  }, [redirectToLogin]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={container}>
        {error && <p className={errorUser}>{castomErrors}</p>}
        <h2 className={formText}>Create new account</h2>
        {inputFields.map((field) => (
          <div key={field.name}>
            {field.type === 'checkbox' ? (
              <>
                <label htmlFor={name} key={name} className={Style.labelTextInput}>
                  <input
                    type={field.type}
                    name={field.name}
                    {...register(field.name, { required: true })}
                    className={Style[field.name]}
                  />
                  {field.label && <span>{field.label}</span>}
                </label>
                <div>{errors?.[field.name] && 'Поле обязательно'}</div>
              </>
            ) : (
              <div>
                <label htmlFor={name} key={name} className={Style.labelText}>
                  {field.label && <span>{field.label}</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={Style[field.name]}
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
                  <div className={errrConfirm}>{'Пароли не совпадают'}</div>
                )}
                <div>
                  {errors?.[field.name] && (
                    <p className={errr}>{errors?.[field.name]?.message || 'Поле обязательно'}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <button type="submit" disabled={!isValid} className={submitBtn}>
          Create
        </button>
        <p className={footerText}>
          Already have an account?
          <Link to="/auntification" className={signIn}>
            Sign In.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
