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
      state.loading = true;
      state.error = null;
    },
    setErrors: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
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

export const { setLoading, setErrors, setUser, setToken, setFlag } = auentificationSlise.actions;
export default auentificationSlise.reducer;
