/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url, storedUser } from '../../actions/userActions/userActions';

export const toggleLikeOnServer = createAsyncThunk('favorite/toggleLikeOnServer', async ({ slug, isLiked }, _) => {
  const token = storedUser?.token;
  try {
    console.log(isLiked);
    const response = await axios.post(
      `${_Url}articles/${slug}/favorite`,
      { favorite: isLiked },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  likes: null,
  error: null,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setLikes: (state, action) => {
      state.likes = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleLikeOnServer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(toggleLikeOnServer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likes = action.payload;
    });
    builder.addCase(toggleLikeOnServer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLikes, setArticles } = favoriteSlice.actions;
export default favoriteSlice.reducer;
