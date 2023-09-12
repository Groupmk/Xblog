/* eslint-disable no-unused-vars */
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RegistrationForm from '../pages/registrationForm/registrationForm';
import Layout from '../layout/layout';
import Auntification from '../pages/auntification/auntification';
import UpdateUsers from '../pages/profile/userProfile';
import { artcleAxios } from '../redux/reducers/articles/articles';
import ArticleList from '../pages/articleList/articlelist';
import CreateArticle from '../pages/createArticle/createArticle';
import { userProfile, storedUser } from '../redux/actions/userActions/userActions';
import Slug from '../pages/slug/slug';

function App() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.article);
  const { likes } = useSelector((state) => state.likes);
  const { post } = useSelector((state) => state.postCreate);
  const { edit } = useSelector((state) => state.edit);
  const { user } = useSelector((state) => state.auentification);

  useEffect(() => {
    localStorage.removeItem('slug');
    const fnTimeout = setTimeout(() => {
      dispatch(artcleAxios());
    }, 1000);
    return () => {
      clearTimeout(fnTimeout);
    };
  }, [page, likes, post, edit, user]);

  useEffect(() => {
    userProfile();
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="registration" element={<RegistrationForm />} />
        <Route path="auntification" element={<Auntification />} />
        <Route path="articles/:slug" element={<Slug />} />
        <Route path="article/:page" element={<ArticleList />} />
        <Route path="profile" element={user?.username ? <UpdateUsers /> : <Auntification to="/login" />} />
        <Route path="new-article" element={user?.username ? <CreateArticle /> : <Auntification to="/login" />} />
        <Route
          path="/articles/:slug/edit"
          element={user?.username ? <CreateArticle /> : <Auntification to="/login" />}
        />
        <Route path="create/:slug" element={user?.username ? <CreateArticle /> : <Auntification to="/login" />} />
        <Route index element={<ArticleList />} />
      </Route>
    </Routes>
  );
}

export default App;
