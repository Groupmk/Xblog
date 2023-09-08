/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { setOffset, setPage, artcleAxios } from '../../redux/reducers/articles/articles';
import heart_1 from '../../assets/img/heart 1.svg';
import heart_2 from '../../assets/img/Heart_corazón 1.svg';
import { setSlug } from '../../redux/reducers/slugAxios/slugAxios';
import { toggleLikeOnServer } from '../../redux/reducers/favoritCount/favoritCount';
import { storedUser } from '../../redux/actions/userActions/userActions';
import { filterLikes } from '../../redux/reducers/filterLikes/filterLikes';

import ArticleAuthor from './../articleAuthor/articleAuthor';
import Style from './articlelist.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articlesArray, limit, page, offset } = useSelector((state) => state.article);
  const { likes } = useSelector((state) => state.likes);
  const { filterLikesArray } = useSelector((state) => state.filterLikes);
  const { articlesCount, articles } = articlesArray;
  const [stored, setStored] = useState(storedUser);

  const {
    container,
    articleList,
    articleListInner,
    titleContainer,
    titleInner,
    tagContainer,
    authorContainer,
    articleBody,
    articleData,
  } = Style;
  const [likeClicked, setLikeClicked] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setOffset((page - 1) * limit));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(filterLikes());
  }, [likes]);

  const hendleOnPageChange = (page) => {
    dispatch(setPage(page));
    navigate(`/article/${page}`);
  };

  function formatDate(date) {
    return format(new Date(date), 'MMMM d, yyyy');
  }

  const onClickArtickle = (slug) => {
    dispatch(setSlug(slug));
    navigate(`/articles/${slug}`);
  };

  const onLike = (slug, likes) => {
    if (!stored || !Object.keys(stored).length > 0) {
      setLikeClicked(likeClicked);
      return null;
    }
    dispatch(toggleLikeOnServer({ slug: slug, favoritesCount: likes })).then(() => {});
  };

  if (!articles || !articles.length) {
    return <p>No article available</p>;
  }

  const totalCount = Math.ceil(articlesCount / articles.length);

  const likedFilter = (article) => {
    console.log('filterLikesArray:', filterLikesArray);

    if (filterLikesArray && filterLikesArray.articles) {
      const isLiked = filterLikesArray.articles.some((item) => item.slug === article.slug);
      if (isLiked) {
        return <img src={heart_2} alt="heart" />;
      } else {
        return <img src={heart_1} alt="heart" />;
      }
    } else {
      return <img src={heart_1} alt="heart" />;
    }
  };

  return (
    <div className={container}>
      {articles.map((article, index) => (
        <div key={index} className={articleList}>
          <div>
            <div className={articleListInner}>
              <div className={titleContainer}>
                <div className={titleInner}>
                  <button onClick={() => onClickArtickle(article.slug)}>
                    <div>article {article.title}</div>
                  </button>
                  <div>
                    <button onClick={() => onLike(article.slug, article.favoritesCount)}>{likedFilter(article)}</button>
                    {article.favoritesCount}
                  </div>
                </div>
                <div className={tagContainer}>
                  {article.tagList.map((tag, index) => (
                    <div key={index}>{tag}</div>
                  ))}
                </div>
              </div>
              <div className={authorContainer}>
                <ArticleAuthor createdAt={article.createdAt} article={article} formatDate={formatDate} />
              </div>
            </div>
            <p className={articleBody}>{article.body}</p>
          </div>
        </div>
      ))}
      <Pagination defaultCurrent={1} current={page} total={totalCount} onChange={hendleOnPageChange} />
    </div>
  );
};

export default ArticleList;
