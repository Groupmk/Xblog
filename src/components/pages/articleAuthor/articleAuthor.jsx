const ArticleAuthor = ({ article }) => {
  if (!article || !article.author) {
    return <p>No article available</p>;
  }

  const { author } = article;

  return (
    <div style={{ display: 'flex' }}>
      <p>{author.username}</p>
      <img src={author.image} alt={author.username} style={{ width: '50px' }} />
      {/* <p>{author.following}</p> */}
    </div>
  );
};

export default ArticleAuthor;
