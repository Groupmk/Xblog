/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url, storedUser } from '../../actions/userActions/userActions';

export const unToggleLikeOnServer = createAsyncThunk('favorite/unToggleLikeOnServer', async ({ slug, isLiked }, _) => {
  const token = storedUser?.token;
  console.log(token);
  try {
    console.log(isLiked);
    const response = await axios.delete(`${_Url}articles/${slug}/favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  disLikes: null,
  error: null,
};

const unFavoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setLikes: (state, action) => {
      state.disLikes = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(unToggleLikeOnServer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(unToggleLikeOnServer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.disLikes = action.payload;
    });
    builder.addCase(unToggleLikeOnServer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLikes, setArticles } = unFavoriteSlice.actions;
export default unFavoriteSlice.reducer;
