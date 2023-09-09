/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { setPost, postAxios } from '../../redux/reducers/createArticle/createArticle';
import { setEdit, editPost } from '../../redux/reducers/editArticle/editArticle';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.postCreate);
  const { slug } = useSelector((state) => state.slug);

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const inputFields = [
    { name: 'title', type: 'text', placeholder: 'Заголовок' },
    { name: 'description', type: 'text', placeholder: 'Описание' },
    { name: 'body', type: 'text', placeholder: 'Текст' },
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map(({ name, type, placeholder }) => (
        <label key={name}>
          <input key={name} type={type} name={name} {...register(name, { required: true })} placeholder={placeholder} />
        </label>
      ))}

      <div>
        <input name="tags" type="text" placeholder="Теги" onChange={handleTagChange} value={newTag} />
        <button type="button" onClick={handleAddTag}>
          add tags
        </button>
      </div>
      <div>
        {tags.map((tag) => (
          <span key={tag}>
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              Удалить
            </button>
          </span>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateArticle;
