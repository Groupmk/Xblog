/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url, storedUser } from '../../actions/userActions/userActions';

export const deletePost = createAsyncThunk('post/deletePost', async ({ slug }, thunkAPI) => {
  const { token } = storedUser;
  try {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await axios.delete(`${_Url}articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const article = response.data.article;
    return article;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  deleteData: null,
  error: null,
  isLoading: false,
};

const deleteSlise = createSlice({
  name: 'delete',
  initialState,
  reducers: {
    setDeleteData: (state, action) => {
      state.deleteData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.delete = action.payload;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setDeleteData, setError, setIsLoading } = deleteSlise.actions;

export default deleteSlise.reducer;
