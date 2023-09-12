import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updateProfile: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setArticleData: (state, action) => {
      state.articleData = action.payload;
    },
    setProfile: (state, action) => {
      state.updateProfile = action.payload;
    },
  },
});

export const { setProfile, setArticleData } = userProfileSlice.actions;
export default userProfileSlice.reducer;
