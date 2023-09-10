// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import axios, { CancelToken } from 'axios';

// import { artcleAxios } from '../redux/reducers/articles/articles';

// const PollingComponent = ({ children }) => {
//   const dispatch = useDispatch();
//   const [prevData, setPrevData] = useState(null);
//   const [cancelSource, setCancelSource] = useState(null);

//   useEffect(() => {
//     let pollingInterval;

//     const fetchData = async () => {
//       try {
//         const source = CancelToken.source();
//         setCancelSource(source);

//         const response = await axios.get('https://blog.kata.academy/api/articles', {
//           cancelToken: source.token,
//         });

//         const newData = response.data;
//         if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
//           setPrevData(newData);
//         }
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log('Request canceled:', error.message);
//         } else {
//           console.error('Error fetching data:', error);
//         }
//       }
//     };

//     const startPolling = () => {
//       pollingInterval = setInterval(fetchData, 1000);
//     };

//     const stopPolling = () => {
//       clearInterval(pollingInterval);
//     };

//     startPolling();

//     return () => {
//       if (cancelSource) {
//         cancelSource.cancel('Component unmounted');
//       }
//       stopPolling();
//     };
//   }, [prevData, cancelSource]);

//   return children;
// };

// export default PollingComponent;
