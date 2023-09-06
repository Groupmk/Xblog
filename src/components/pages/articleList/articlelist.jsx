/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import { setOffset, setPage, artcleAxios } from '../../redux/reducers/articles/articles';
import heart_1 from '../../assets/img/heart 1.svg';
import heart_2 from '../../assets/img/Heart_corazón 1.svg';
import { setSlug } from '../../redux/reducers/slugAxios/slugAxios';
import { toggleLikeOnServer } from '../../redux/reducers/favoritCount/favoritCount';
import { storedUser } from '../../redux/actions/userActions/userActions';

import ArticleAuthor from './../articleAuthor/articleAuthor';
import Style from './articlelist.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articlesArray, limit, page } = useSelector((state) => state.article);
  const [localLikes, setLocalLikes] = useState({});
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
  } = Style;
  const [likeClicked, setLikeClicked] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setOffset((page - 1) * limit));
  }, [dispatch, page]);

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
    if (!stored && !Object.keys(stored).length > 0) {
      setLikeClicked(likeClicked);
      return null;
    }
    setLikeClicked(!likeClicked);
    const updatedLocalLikes = { ...localLikes };
    updatedLocalLikes[slug] = !updatedLocalLikes[slug];
    setLocalLikes(updatedLocalLikes);
    dispatch(toggleLikeOnServer({ slug: slug, favoritesCount: likes })).then(() => {});
  };

  if (!articles || !articles.length) {
    return <p>No article available</p>;
  }

  const totalCount = Math.ceil(articlesCount / articles.length);

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
                    <button onClick={() => onLike(article.slug, article.favoritesCount)}>
                      {!localLikes[article.slug] ? (
                        <img src={heart_1} alt="heart" />
                      ) : (
                        <img src={heart_2} alt="heart" />
                      )}
                    </button>
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
                <ArticleAuthor article={article} />
                <div>{formatDate(article.createdAt)}</div>
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
