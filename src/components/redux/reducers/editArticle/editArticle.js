/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url, storedUser } from '../../actions/userActions/userActions';

export const editPost = createAsyncThunk('post/editPost', async ({ slug, articleData }, thunkAPI) => {
  const { token } = storedUser;
  try {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await axios.put(
      `${_Url}articles/${slug}`,
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
  edit: null,
  error: null,
  isLoading: false,
};

const editSlise = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.edit = action.payload;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setEdit, setError, setIsLoading } = editSlise.actions;

export default editSlise.reducer;
