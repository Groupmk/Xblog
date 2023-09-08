/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import Style from './author.module.scss';

const ArticleAuthor = ({ article, createdAt }) => {
  const { slugArray } = useSelector((state) => state.slug);
  const { container, username, imageAuthor, articleData, userNameContaier } = Style;

  if (!article || !article.author) {
    return <p>No article available</p>;
  }
  function formatDate(date) {
    return format(new Date(date), 'MMMM d, yyyy');
  }

  const { author } = article;

  return (
    <div className={container}>
      <div className={userNameContaier}>
        <p className={username}>{author.username}</p>
        <div className={articleData}> {formatDate(createdAt)}</div>
      </div>
      <img src={author.image} alt={author.username} className={imageAuthor} />
    </div>
  );
};

export default ArticleAuthor;
