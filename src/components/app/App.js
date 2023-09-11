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
import Loader from '../ui/loading/spin';
import { storedUser, userProfile } from '../redux/actions/userActions/userActions';
import Slug from '../pages/slug/slug';
import { MyContextProvider } from '../context/userContext';

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
  console.log(storedUser);

  const UserProfileData = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    userProfile();
  }, []);

  // if (!articlesArray) {
  //   if (!articlesArray) {
  //     return loading ? <Loader /> : null;
  //   }
  // }
  // if (error) {
  //   return <div>Error</div>;
  // }
  return (
    <MyContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="auntification" element={<Auntification />} />
          <Route path="articles/:slug" element={<Slug />} />
          <Route path="article/:page" element={<ArticleList />} />
          <Route path="profile" element={UserProfileData?.username ? <UpdateUsers /> : <Auntification to="/login" />} />
          <Route
            path="new-article"
            element={UserProfileData?.username ? <CreateArticle /> : <Auntification to="/login" />}
          />
          <Route
            path="/articles/:slug/edit"
            element={UserProfileData?.username ? <CreateArticle /> : <Auntification to="/login" />}
          />
          <Route
            path="create/:slug"
            element={UserProfileData?.username ? <CreateArticle /> : <Auntification to="/login" />}
          />
          <Route index element={<ArticleList />} />
        </Route>
      </Routes>
    </MyContextProvider>
  );
}

export default App;
