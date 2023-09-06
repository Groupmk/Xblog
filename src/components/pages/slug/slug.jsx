/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { slugAxiox, setSlug } from '../../redux/reducers/slugAxios/slugAxios';
import { storedUser } from '../../redux/actions/userActions/userActions';
const Slug = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slugArray, slug } = useSelector((state) => state.slug);
  const { article } = slugArray;
  const [stored, setStored] = useState(storedUser);
  useEffect(() => {
    dispatch(slugAxiox(slug));
  }, [dispatch, slug]);

  console.log(article);
  if (!article) {
    return <p>No slugArray available</p>;
  }
  const onClickArtickle = (slug) => {
    dispatch(setSlug(slug));
    navigate(`/create/${slug}`);
  };
  return (
    <div>
      {stored.username === article.author.username ? (
        <button onClick={() => onClickArtickle(slug)}>{/* <Link to={`/create/${slug}`}>Edit</Link> */}TYT</button>
      ) : null}
      <h1>{article.title}</h1>
      <div>{article.body}</div>
    </div>
  );
};

export default Slug;
