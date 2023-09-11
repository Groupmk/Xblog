/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { updateUser, storedUser } from '../../redux/actions/userActions/userActions';
import { setProfile } from '../../redux/reducers/profile/profile';
import { clearUser } from '../../redux/reducers/userReduser/userReducer';
import { artcleAxios } from '../../redux/reducers/articles/articles';

import Style from './profile.module.scss';

const UpdateUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateProfile, profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const stored = storedUser;
  const { container, formText, errrConfirm, errr, submitBtn, footerText, logOut } = Style;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
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
      label: 'New password',
    },
    { name: 'image', type: 'text', placeholder: 'Изображение URL', className: 'image', label: 'Avatar image (url)' },
  ];

  const handleOnSubmit = (data) => {
    reset();
    const filteredData = {};
    for (const key in data) {
      if (data[key]) {
        filteredData[key] = data[key];
      }
    }
    dispatch(updateUser(filteredData));
  };

  const setClearUser = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    if (user === null) {
      navigate('/');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={container}>
        <h2 className={formText}>Edit Profile</h2>
        {inputFields.map(({ name, type, placeholder, minLength, maxLength, label }) => (
          <label key={name} htmlFor={name} className={Style.labelTextInput}>
            {label && <span>{label}</span>}
            <input
              key={name}
              type={type}
              id={name}
              name={name}
              className={Style[name]}
              {...register(name, {
                minLength: {
                  value: minLength,
                  message: `Минимум ${minLength} символа`,
                },
                maxLength: {
                  value: maxLength,
                  message: `Максимум ${maxLength} символов`,
                },
              })}
              placeholder={placeholder}
            />
            {errors[name] && <p className={errr}>{errors[name].message}</p>}
          </label>
        ))}
        <button type="submit" className={submitBtn}>
          Save
        </button>
        <button onClick={setClearUser} className={logOut}>
          log out
        </button>
      </form>
    </>
  );
};

export default UpdateUsers;
