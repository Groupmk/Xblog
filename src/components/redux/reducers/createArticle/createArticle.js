/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url, storedUser } from '../../actions/userActions/userActions';

export const postAxios = createAsyncThunk('post/postAxios', async (articleData, thunkAPI) => {
  const { token } = storedUser;
  try {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await axios.post(
      `${_Url}articles`,
      { article: articleData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const article = response.data.article;
    return article;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  post: null,
  error: null,
  isLoading: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postAxios.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(postAxios.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(postAxios.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setPost, setError, setIsLoading } = postSlice.actions;

export default postSlice.reducer;
