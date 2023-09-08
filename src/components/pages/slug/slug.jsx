/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { slugAxiox, setSlug } from '../../redux/reducers/slugAxios/slugAxios';
import { storedUser } from '../../redux/actions/userActions/userActions';
import { deletePost, setDeleteData } from '../../redux/reducers/deletePost/deletePost';
import ArticleAuthor from '../articleAuthor/articleAuthor';

const Slug = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slugArray, slug } = useSelector((state) => state.slug);
  const { article } = slugArray;
  console.log(slug);

  const [stored, setStored] = useState(storedUser);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(slugAxiox({ slug: slug }));
  }, [dispatch, slug]);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onDeleteConfirmed = (slug) => {
    dispatch(deletePost({ slug: slug }));
    closeDeleteModal();
  };

  const onClickArtickle = (slug) => {
    dispatch(setSlug(slug));
    navigate(`/create/${slug}`);
  };

  if (!article || !article.author) {
    return <p>No article available</p>;
  }

  return (
    <div>
      {stored.username === article.author.username ? (
        <>
          <button onClick={() => onClickArtickle(slug)}>TYT</button>
          <button onClick={openDeleteModal} style={{ marginLeft: '50px' }}>
            Delete
          </button>
        </>
      ) : null}
      <div>
        <h1>{article.title}</h1>
        <ArticleAuthor article={article} createdAt={article.createdAt} />
      </div>
      <ReactMarkdown>{article.body}</ReactMarkdown>
      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Вы уверены, что хотите удалить эту статью?</p>
            <button onClick={() => onDeleteConfirmed(slug)}>Да</button>
            <button onClick={closeDeleteModal}>Нет</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slug;
