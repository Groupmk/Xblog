/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url } from '../../actions/userActions/userActions';

export const slugAxiox = createAsyncThunk('slug/slugAxios', async ({ slug }, thunkAPI) => {
  try {
    const response = await axios.get(`${_Url}articles/${slug}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  slugArray: [],
  slug: '',
  loading: false,
  error: null,
};

const slugSlice = createSlice({
  name: 'slug',
  initialState,
  reducers: {
    setSlug: (state, action) => {
      state.slug = action.payload;
    },
    setSlugArray: (state, action) => {
      state.slugArray = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(slugAxiox.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(slugAxiox.fulfilled, (state, action) => {
      state.loading = false;
      state.slugArray = action.payload;
    });
    builder.addCase(slugAxiox.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setSlug, setSlugArray } = slugSlice.actions;
export default slugSlice.reducer;
