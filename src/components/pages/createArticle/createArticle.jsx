/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { setPost, postAxios } from '../../redux/reducers/createArticle/createArticle';
import { setEdit, editPost } from '../../redux/reducers/editArticle/editArticle';
import { setAuthor } from '../../redux/reducers/filterUserProfile/filterUserProfile';

import Style from './createArticle.module.scss';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useSelector((state) => state.slug);
  const { author } = useSelector((state) => state.author);
  const articles = author?.articles;

  const firstArticle = articles && articles.length > 0 ? articles[0] : {};

  const [articleData, setArticleData] = useState({
    title: firstArticle?.title || '',
    description: firstArticle?.description || '',
    body: firstArticle?.body || '',
  });

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (author && slug) {
      setArticleData({
        title: firstArticle?.title || '',
        description: firstArticle?.description || '',
        body: firstArticle?.body || '',
      });
      setTags(firstArticle?.tagList || []);
    }
  }, [author, slug]);

  const onSubmit = (data) => {
    const updatedArticleData = {
      title: data.title || 'string',
      description: data.description || 'string',
      body: data.body || 'string',
      tagList: [...tags],
    };

    if (slug) {
      dispatch(setEdit(updatedArticleData));
      dispatch(editPost({ slug: slug, articleData: updatedArticleData }));
    } else {
      dispatch(setPost(updatedArticleData));
      dispatch(postAxios(updatedArticleData));
    }
    dispatch(setAuthor({}));
    reset();
    setTags([]);
    navigate('/');
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      addTag(newTag);
      setNewTag('');
    }
  };

  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const removeAllTags = () => {
    setTags([]);
  };

  const {
    container,
    tagsInput,
    tagsText,
    tagsBtn,
    deleteTags,
    submitBtn,
    tagText,
    titleForm,
    lableTags,
    tagsContainer,
    tagsContent,
  } = Style;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const inputFields = [
    { name: 'title', type: 'text', placeholder: 'Заголовок', className: 'title', label: 'Title' },
    {
      name: 'description',
      type: 'text',
      placeholder: 'Описание',
      className: 'description',
      label: 'Short description',
    },
    {
      name: 'body',
      placeholder: 'Текст',
      className: 'body',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={container}>
      <h2 className={titleForm}>Create new article</h2>
      {inputFields.map(({ name, type, placeholder, label }) => (
        <label key={name} htmlFor={name} className={Style.labelText}>
          {label && <span>{label}</span>}
          {name === 'body' ? (
            <textarea
              key={name}
              name={name}
              id={name}
              {...register(name, { required: true })}
              placeholder={placeholder}
              className={Style[name]}
              value={articleData[name]}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  [name]: e.target.value,
                })
              }
            />
          ) : (
            <input
              key={name}
              type={type}
              name={name}
              id={name}
              {...register(name, { required: true })}
              placeholder={placeholder}
              className={Style[name]}
              value={articleData[name]}
              onChange={(e) =>
                setArticleData({
                  ...articleData,
                  [name]: e.target.value,
                })
              }
            />
          )}
        </label>
      ))}
      <div className={tagsContainer}>
        <div>
          <p className={tagsText}>Tags</p>
          {tags.map((tag) => (
            <span key={tag} className={tagsContent}>
              <div className={tagText}>{tag}</div>
              <button type="button" onClick={() => removeTag(tag)} className={deleteTags}>
                Удалить
              </button>
            </span>
          ))}
        </div>

        <label className={lableTags}>
          <input
            name="tags"
            type="text"
            placeholder="Теги"
            onChange={handleTagChange}
            value={newTag}
            className={tagsInput}
          />
          <button type="button" onClick={() => removeAllTags()} className={deleteTags}>
            Удалить
          </button>
          <button type="button" onClick={handleAddTag} className={tagsBtn}>
            add tags
          </button>
        </label>
      </div>
      <button type="submit" className={submitBtn}>
        Submit
      </button>
    </form>
  );
};

export default CreateArticle;
