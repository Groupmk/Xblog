/* eslint-disable no-unused-vars */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import userSlice from '../reducers/userReduser/userReducer';
import auentificationSlise from '../reducers/userAuentification/userAuentification';
import userProfileSlice from '../reducers/profile/profile';
import articleSlice from '../reducers/articles/articles';
import slugSlice from '../reducers/slugAxios/slugAxios';
import favoriteSlice from '../reducers/favoritCount/favoritCount';
import postSlice from '../reducers/createArticle/createArticle';
import editSlise from '../reducers/editArticle/editArticle';

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    user: userSlice,
    auentification: auentificationSlise,
    profile: userProfileSlice,
    article: articleSlice,
    slug: slugSlice,
    likes: favoriteSlice,
    postCreate: postSlice,
    edit: editSlise,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});
