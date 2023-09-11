import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url, storedUser } from '../../actions/userActions/userActions';

export const authorFilter = createAsyncThunk('article/author', async () => {
  const { username } = storedUser;
  try {
    const response = await axios.get(`${_Url}articles?author=${username}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  author: null,
  isLoading: false,
  error: null,
};

const authorFilterSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authorFilter.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(authorFilter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.author = action.payload;
    });
    builder.addCase(authorFilter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setAuthor } = authorFilterSlice.actions;
export default authorFilterSlice.reducer;
