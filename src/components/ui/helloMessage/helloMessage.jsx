/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { setFlag } from '../../redux/reducers/userAuentification/userAuentification';

const Hello = (props) => {
  const { username } = props;
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [messageShown, setMessageShown] = useState(null);
  const { user, flag } = useSelector((state) => state.auentification);

  const info = () => {
    messageApi.info(`Hello, ${username}!`);
    setMessageShown(username);

    setTimeout(() => {
      messageApi.destroy();
    }, 3000);
  };

  useEffect(() => {
    if (flag) {
      info();
      setMessageShown(null);
      dispatch(setFlag(false));
    }
  }, [username, messageShown]);

  return <>{contextHolder}</>;
};

export default Hello;
