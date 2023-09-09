/* eslint-disable no-unused-vars */
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RegistrationForm from '../pages/registrationForm/registrationForm';
import Layout from '../layout/layout';
import Auntification from '../pages/auntification/auntification';
import UpdateUsers from '../pages/profile/userProfile';
import { artcleAxios } from '../redux/reducers/articles/articles';
import ArticleList from '../pages/articleList/articlelist';
import CreateArticle from '../pages/createArticle/createArticle';
import PollingComponent from '../polling/pollingComponents';
import { storedSlug } from '../local-store/local-store';
import { storedUser } from '../redux/actions/userActions/userActions';
import Slug from '../pages/slug/slug';

function App() {
  const dispatch = useDispatch();
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

  if (!articlesArray) {
    if (!articlesArray) {
      return loading ? <div>Loading...</div> : null;
    }
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="auntification" element={<Auntification />} />
          <Route path="profile" element={<UpdateUsers />} />
          <Route path="articles/:slug" element={<Slug />} />
          <Route path="article/:page" element={<ArticleList />} />
          <Route path="new-article" element={<CreateArticle />} />
          <Route path="/articles/:slug/edit" element={<CreateArticle />} />
          <Route path="create/:slug" element={<CreateArticle />} />
          <Route index element={<ArticleList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
