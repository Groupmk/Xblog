/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';

import { setSlug, setSlugArray } from '../../redux/reducers/slugAxios/slugAxios';
import { storedUser } from '../../redux/actions/userActions/userActions';
import { deletePost } from '../../redux/reducers/deletePost/deletePost';
import { storedSlug } from '../../local-store/local-store';
import { artcleAxios } from '../../redux/reducers/articles/articles';
import { setPost } from '../../redux/reducers/createArticle/createArticle';

import Style from './author.module.scss';

const ArticleAuthor = ({ article, createdAt }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug, slugArray } = useSelector((state) => state.slug);
  const [stored, setStored] = useState(storedUser);
  const [jsxCode, setJsxCode] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    container,
    username,
    imageAuthor,
    articleData,
    userNameContaier,
    edit,
    deleteBtn,
    btnContainer,
    modal,
    modalContent,
  } = Style;

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onDeleteConfirmed = async () => {
    dispatch(setPost({}));
    await dispatch(deletePost({ slug: article.slug }));
    localStorage.removeItem('slug');
    closeDeleteModal();
    navigate('/');
  };

  const onClickArticle = () => {
    dispatch(setSlug(article.slug));
    localStorage.removeItem('slug');
    navigate(`/articles/${article.slug}/edit`);
  };

  function formatDate(date) {
    return format(new Date(date), 'MMMM d, yyyy');
  }

  if (!article) {
    return <p>No article available</p>;
  }

  useEffect(() => {
    const storedSlug = localStorage.getItem('slug');
    if (slug && storedSlug === article.slug) {
      if (stored && stored?.username === article.author?.username) {
        const popconfirm = (
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={onDeleteConfirmed}
            onCancel={closeDeleteModal}
            okText="Yes"
            cancelText="No"
            placement="rightTop"
            className={modal}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        );

        const editButton = (
          <Button onClick={onClickArticle} className={edit}>
            EDIT
          </Button>
        );

        setJsxCode(
          <div className={btnContainer}>
            {popconfirm}
            {editButton}
          </div>
        );
      }
    } else {
      setJsxCode(null);
    }
  }, [slug, storedSlug, article.slug]);

  return (
    <div className={container}>
      <div className={userNameContaier}>
        <p className={username}>{article.author?.username}</p>
        <div className={articleData}> {formatDate(createdAt)}</div>
        {jsxCode}
        {isDeleteModalOpen && (
          <div className={modal}>
            <div className={modalContent}>
              <p>Вы уверены, что хотите удалить эту статью?</p>
              <button onClick={onDeleteConfirmed}>Да</button>
              <button onClick={closeDeleteModal}>Нет</button>
            </div>
          </div>
        )}
      </div>
      <img src={article.author?.image} alt={article.author?.username} className={imageAuthor} />
    </div>
  );
};

export default ArticleAuthor;
