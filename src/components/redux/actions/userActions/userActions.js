/* eslint-disable no-unused-vars */
import axios from 'axios';

import { setLoading, setError, registerSuccess } from '../../reducers/userReduser/userReducer';
import { setProfile } from '../../reducers/profile/profile';
import { setUser } from '../../reducers/userAuentification/userAuentification';
import { authorFilter } from '../../reducers/filterUserProfile/filterUserProfile';

export const _Url = 'https://blog.kata.academy/api/';

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.post(`${_Url}users`, { user: userData });
    const user = response.data.user;
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const authenticate = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.post(`${_Url}users/login`, { user: userData });
    const user = response.data.user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mail', JSON.stringify(userData.email));
    dispatch(setUser(user));
    dispatch(setProfile(user));
    dispatch(userProfile(user.token));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const storedUser = JSON.parse(localStorage.getItem('user'));

export const userProfile = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${_Url}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const profile = response.data.user;
    if (storedUser) {
      storedUser.image = profile?.image;
      storedUser.username = profile?.username;
      storedUser.email = profile?.email;
      storedUser.password = profile?.password;
      localStorage.setItem('user', JSON.stringify(storedUser));
    }
    dispatch(setProfile(profile));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateUser = (userData) => async (dispatch) => {
  const token = storedUser ? storedUser.token : '';

  try {
    const response = await axios.put(
      `${_Url}user`,
      { user: userData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const profile = response.data.user;
    if (storedUser) {
      console.log(storedUser);
      storedUser.image = profile?.image;
      storedUser.username = profile?.username;
      storedUser.email = profile?.email;
      storedUser.password = profile?.password;
      localStorage.setItem('user', JSON.stringify(storedUser));
      localStorage.setItem('mail', JSON.stringify(storedUser.email));
    }
    dispatch(setProfile(profile));
    console.log(profile);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
