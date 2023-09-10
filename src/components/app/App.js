/* eslint-disable no-unused-vars */
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RegistrationForm from '../pages/registrationForm/registrationForm';
import Layout from '../layout/layout';
import Auntification from '../pages/auntification/auntification';
import UpdateUsers from '../pages/profile/userProfile';
import { artcleAxios } from '../redux/reducers/articles/articles';
import ArticleList from '../pages/articleList/articlelist';
import CreateArticle from '../pages/createArticle/createArticle';
import { storedSlug } from '../local-store/local-store';
import { storedUser, userProfile } from '../redux/actions/userActions/userActions';
import { setSlug } from '../redux/reducers/slugAxios/slugAxios';
import Slug from '../pages/slug/slug';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articlesArray, loading, error, page, limit, offset } = useSelector((state) => state.article);
  const { slugArray, slug } = useSelector((state) => state.slug);
  const { likes } = useSelector((state) => state.likes);
  const { post } = useSelector((state) => state.postCreate);
  const { edit } = useSelector((state) => state.edit);
  const { user } = useSelector((state) => state.user);
  const { deleteData } = useSelector((state) => state.deletePost);

  useEffect(() => {
    localStorage.removeItem('slug');
    const fnTimeout = setTimeout(() => {
      dispatch(artcleAxios());
    }, 1000);
    return () => {
      clearTimeout(fnTimeout);
    };
  }, [page, likes, post, edit, storedUser, storedUser?.image, storedUser?.username]);

  useEffect(() => {
    userProfile();
  }, []);

  if (!articlesArray) {
    if (!articlesArray) {
      return loading ? <div>Loading...</div> : null;
    }
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="registration" element={<RegistrationForm />} />
        <Route path="auntification" element={<Auntification />} />
        <Route path="articles/:slug" element={<Slug />} />
        <Route path="article/:page" element={<ArticleList />} />
        <Route path="profile" element={storedUser?.username ? <UpdateUsers /> : <Auntification to="/login" />} />
        <Route path="new-article" element={storedUser?.username ? <CreateArticle /> : <Auntification to="/login" />} />
        <Route
          path="/articles/:slug/edit"
          element={storedUser?.username ? <CreateArticle /> : <Auntification to="/login" />}
        />
        <Route path="create/:slug" element={storedUser?.username ? <CreateArticle /> : <Auntification to="/login" />} />
        <Route index element={<ArticleList />} />
      </Route>
    </Routes>
  );
}

export default App;
