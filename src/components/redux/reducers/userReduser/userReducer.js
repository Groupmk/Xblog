import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    username: '',
    bio: 'I work at State Farm.',
    email: '',
    image: null,
    following: false,
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, registerSuccess, clearUser } = userSlice.actions;
export default userSlice.reducer;
