import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url, storedUser } from '../../actions/userActions/userActions';

export const filterLikes = createAsyncThunk('article/filterLikes', async () => {
  const { username } = storedUser;
  try {
    const response = await axios.get(`${_Url}articles?favorited=${username}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  filterLikesArray: [],
  isLoading: false,
  error: null,
};

const filterLikesSlice = createSlice({
  name: 'likeFilter',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(filterLikes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(filterLikes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.filterLikesArray = action.payload;
    });
    builder.addCase(filterLikes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setPage, setOffset } = filterLikesSlice.actions;
export default filterLikesSlice.reducer;
