import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { _Url } from '../../actions/userActions/userActions';

export const artcleAxios = createAsyncThunk('article/articleAxios', async (_, thunkAPI) => {
  const { offset } = thunkAPI.getState().article;
  try {
    const response = await axios.get(`${_Url}articles?limit=5&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  articlesArray: [],
  isLoading: false,
  error: null,
  limit: 5,
  offset: 0,
  page: 1,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(artcleAxios.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(artcleAxios.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articlesArray = action.payload;
    });
    builder.addCase(artcleAxios.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setPage, setOffset } = articleSlice.actions;
export default articleSlice.reducer;
