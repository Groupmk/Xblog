/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { updateUser, storedUser } from '../../redux/actions/userActions/userActions';
import { setProfile } from '../../redux/reducers/profile/profile';
import { clearUser } from '../../redux/reducers/userReduser/userReducer';

const UpdateUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateProfile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const stored = storedUser;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const inputFields = [
    { name: 'username', type: 'text', placeholder: 'Имя пользователя', minLength: 3, maxLength: 20 },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Пароль', minLength: 3, maxLength: 40 },
    { name: 'image', type: 'text', placeholder: 'Изображение URL' },
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
      window.location.reload();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {inputFields.map(({ name, type, placeholder, minLength, maxLength }) => (
          <label key={name}>
            <input
              key={name}
              type={type}
              name={name}
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
            {errors[name] && <p>{errors[name].message}</p>}
          </label>
        ))}
        <button type="submit">update</button>
      </form>
      <button onClick={setClearUser} style={{ marginLeft: '10px' }}>
        clear
      </button>
    </>
  );
};

export default UpdateUsers;
