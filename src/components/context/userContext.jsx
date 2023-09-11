/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';

import { storedUser } from '../redux/actions/userActions/userActions';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [lagOn, setFlagOn] = useState(false);

  useEffect(() => {
    async function checkStoredUser() {
      const user = await storedUser;
      if (user && user.username) {
        setFlagOn(true);
      } else {
        setFlagOn(false);
      }
    }

    checkStoredUser();
  }, []); // Теперь useEffect запустится только один раз при монтировании компонента

  return <MyContext.Provider value={lagOn}>{children}</MyContext.Provider>;
}

export { MyContext, MyContextProvider };
