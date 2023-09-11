import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  flag: false,
};

const auentificationSlise = createSlice({
  name: 'log',
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
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFlag: (state, action) => {
      state.flag = action.payload;
    },
  },
});

export const { setLoading, setError, setUser, setToken, setFlag } = auentificationSlise.actions;
export default auentificationSlise.reducer;
