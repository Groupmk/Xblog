import axios from 'axios';

import { setLoading, setError, registerSuccess } from '../../reducers/userReduser/userReducer';
import { setProfile } from '../../reducers/profile/profile';
// import { setUser } from '../../reducers/userAuentification/userAuentification';

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
    dispatch(registerSuccess(user));
    dispatch(setProfile(user));
    window.location.reload();
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const storedUser = JSON.parse(localStorage.getItem('user'));
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
    dispatch(setProfile(profile));
    storedUser.image = profile.image;
    storedUser.username = profile.username;
    storedUser.email = profile.email;
    storedUser.password = profile.password;
    localStorage.setItem('user', JSON.stringify(storedUser));
    console.log(profile);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
