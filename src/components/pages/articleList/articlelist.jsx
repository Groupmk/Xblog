/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { setOffset, setPage, artcleAxios } from '../../redux/reducers/articles/articles';
import ArticleContent from '../../articleContent/articleContent';

import ArticleAuthor from './../articleAuthor/articleAuthor';
import Style from './articlelist.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articlesArray, limit, page, offset } = useSelector((state) => state.article);
  const { articlesCount, articles } = articlesArray;

  const { container, articleList } = Style;

  useEffect(() => {
    dispatch(setOffset((page - 1) * limit));
  }, [dispatch, page]);

  const hendleOnPageChange = (page) => {
    dispatch(setPage(page));
    navigate(`/article/${page}`);
  };

  if (!articles || !articles.length) {
    return <p>No article available</p>;
  }

  const totalCount = Math.ceil(articlesCount / articles.length);

  return (
    <div className={container}>
      {articles.map((article, index) => (
        <div key={index} className={articleList}>
          <ArticleContent article={article} />
        </div>
      ))}
      <Pagination defaultCurrent={1} current={page} total={totalCount} onChange={hendleOnPageChange} />
    </div>
  );
};

export default ArticleList;
