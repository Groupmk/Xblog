/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { slugAxiox, setSlug } from '../../redux/reducers/slugAxios/slugAxios';
import { storedUser } from '../../redux/actions/userActions/userActions';
import { deletePost, setDeleteData } from '../../redux/reducers/deletePost/deletePost';
import ArticleAuthor from '../articleAuthor/articleAuthor';
import ArticleContent from '../../articleContent/articleContent';

import Style from './slug.module.scss';

const Slug = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slugArray, slug } = useSelector((state) => state.slug);
  const { article } = slugArray;
  const { container } = Style;

  const storedSlug = localStorage.getItem('slug');
  const [currentSlug, setCurrentSlug] = useState(storedSlug || slug);
  useEffect(() => {
    localStorage.setItem('slug', currentSlug);
    dispatch(slugAxiox({ slug: currentSlug }));
  }, [dispatch, currentSlug, slug]);

  if (!article || !article.author) {
    return <p>No article available</p>;
  }

  return (
    <div className={container}>
      <ArticleContent article={article} />
    </div>
  );
};

export default Slug;
