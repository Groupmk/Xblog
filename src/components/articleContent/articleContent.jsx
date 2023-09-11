/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import heart_1 from '../assets/img/heart 1.svg';
import heart_2 from '../assets/img/Heart_corazón 1.svg';
import { setSlug, slugAxiox } from '../redux/reducers/slugAxios/slugAxios';
import { toggleLikeOnServer } from '../redux/reducers/favoritCount/favoritCount';
import { storedUser } from '../redux/actions/userActions/userActions';
import { filterLikes } from '../redux/reducers/filterLikes/filterLikes';
import ArticleAuthor from '../pages/articleAuthor/articleAuthor';
import { authorFilter } from '../redux/reducers/filterUserProfile/filterUserProfile';
import Loader from '../ui/loading/spin';
import Hello from '../ui/helloMessage/helloMessage';

import Style from './articleContent.module.scss';

const ArticleContent = (propse) => {
  const { currentSlug, article, loading, error } = propse;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { likes } = useSelector((state) => state.likes);
  const { slug } = useSelector((state) => state.slug);
  const { filterLikesArray } = useSelector((state) => state.filterLikes);

  const [stored, setStored] = useState(storedUser);

  const [likeClicked, setLikeClicked] = useState(false);
  const { user } = useSelector((state) => state.auentification);

  const {
    articleListInner,
    titleContainer,
    titleInner,
    tagContainer,
    authorContainer,
    articleBody,
    articleData,
    titleText,
    likeBtn,
    likeBtnContainer,
    tagsText,
    articleDescription,
  } = Style;

  useEffect(() => {
    dispatch(filterLikes());
  }, [likes, article, dispatch, user]);

  const onClickArtickle = (slug) => {
    localStorage.setItem('slug', slug);
    dispatch(setSlug(slug));
    dispatch(authorFilter());
    navigate(`/articles/${slug}`);
  };

  const onLike = (slug, likes) => {
    if (!user?.username) {
      setLikeClicked(likeClicked);
      return null;
    }
    dispatch(toggleLikeOnServer({ slug: slug, favoritesCount: likes })).then(() => {});
  };
  const likedFilter = (article) => {
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

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  // useEffect(() => {
  //   dispatch(slugAxiox({ slug: currentSlug }));
  // }, [dispatch, currentSlug, slug, storedSlug]);

  if (!article) {
    return <Loader />;
  }
  return (
    <div>
      <div className={articleListInner}>
        <div className={titleContainer}>
          <div className={titleInner}>
            <button onClick={() => onClickArtickle(article.slug)}>
              <div className={titleText}> {article.title} </div>
            </button>
            <div className={likeBtnContainer}>
              <button onClick={() => onLike(article.slug, article.favoritesCount)} className={likeBtn}>
                {likedFilter(article)}
              </button>
              {article.favoritesCount}
            </div>
          </div>
          <div className={tagContainer}>
            {article.tagList.map((tag, index) => (
              <div key={index} className={tagsText}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className={authorContainer}>
          <ArticleAuthor createdAt={article.createdAt} article={article} />
        </div>
      </div>
      <p className={articleDescription}>{truncateDescription(article.description, 100)}</p>
      {currentSlug ? <ReactMarkdown className={articleBody}>{article.body}</ReactMarkdown> : null}
    </div>
  );
};

export default ArticleContent;
