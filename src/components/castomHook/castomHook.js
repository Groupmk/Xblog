/* eslint-disable no-unused-vars */
// Ваш хук useLocalStorage.js

import { useState, useEffect } from 'react';

const useLocalStorage = (key) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : {}; // Возвращаем пустой объект, если данных нет
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
