/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { setOffset, setPage, artcleAxios } from '../../redux/reducers/articles/articles';
import ArticleContent from '../../articleContent/articleContent';
import Loader from '../../ui/loading/spin';
import Hello from '../../ui/helloMessage/helloMessage';

import Style from './articlelist.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articlesArray, limit, page, offset, loading, error } = useSelector((state) => state.article);
  const { articlesCount, articles } = articlesArray;
  const { user } = useSelector((state) => state.auentification);

  const { container, articleList } = Style;

  useEffect(() => {
    dispatch(setOffset((page - 1) * limit));
  }, [dispatch, page]);

  const hendleOnPageChange = (page) => {
    dispatch(setPage(page));
    navigate(`/article/${page}`);
  };

  if (!articles || !articles.length) {
    return <Loader />;
  }

  const totalCount = Math.ceil(articlesCount / articles.length);

  return (
    <div className={container}>
      {user?.username && !error && !loading && <Hello username={user?.username} />}
      {articles.map((article, index) => (
        <div key={index} className={articleList}>
          <ArticleContent article={article} loading={loading} error={error} />
        </div>
      ))}
      <Pagination defaultCurrent={1} current={page} total={totalCount} onChange={hendleOnPageChange} />
    </div>
  );
};

export default ArticleList;
