/* eslint-disable no-unused-vars */
import Style from './author.module.scss';

const ArticleAuthor = ({ article, formatDate, createdAt }) => {
  const { container, username, imageAuthor, articleData, userNameContaier } = Style;
  if (!article || !article.author) {
    return <p>No article available</p>;
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
