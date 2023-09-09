/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { setPost, postAxios } from '../../redux/reducers/createArticle/createArticle';
import { setEdit, editPost } from '../../redux/reducers/editArticle/editArticle';
import { artcleAxios } from '../../redux/reducers/articles/articles';

import Style from './createArticle.module.scss';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.postCreate);
  const { slug } = useSelector((state) => state.slug);

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const {
    container,
    tagsInput,
    tagsText,
    tagsBtn,
    deleteTags,
    submitBtn,
    tagText,
    titleForm,
    footerText,
    signUp,
    lableTags,
    tagsContainer,
    tagsContent,
  } = Style;

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

  const onSubmit = (data) => {
    const articleData = {
      title: data.title || 'string',
      description: data.description || 'string',
      body: data.body || 'string',
      tagList: [...tags],
    };
    if (slug) {
      dispatch(setEdit(articleData));
      dispatch(editPost({ slug: slug, articleData: articleData }));
    } else {
      dispatch(setPost(articleData));
      dispatch(postAxios(articleData));
    }
    reset();
    setTags([]);
    navigate('/');
  };

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
