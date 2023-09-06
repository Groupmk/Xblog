import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articleData: [],
  updateProfile: {
    username: '',
    bio: 'I work at State Farm.',
    email: '',
    image: null,
    password: '',
    following: false,
  },
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setArticleData: (state, action) => {
      state.articleData = action.payload;
    },
    setProfile: (state, action) => {
      state.updateProfile.username = action.payload.username;
      state.updateProfile.email = action.payload.email;
      state.updateProfile.image = action.payload.image;
      state.updateProfile.password = action.payload.password;
      state.updateProfile.following = action.payload.following;
    },
  },
});

export const { setProfile, setArticleData } = userProfileSlice.actions;
export default userProfileSlice.reducer;
