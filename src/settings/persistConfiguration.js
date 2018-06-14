import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { createFilter } from 'redux-persist-transform-filter';
// import createEncryptor from 'redux-persist-transform-encrypt';

// const encryptor = createEncryptor({
//   secretKey: 'oi',
//   onError(error) {
//     console.log('Encryptor error', error);
//     // Handle the error.
//   },
// });


// you want to store only a subset of your state of reducer one
const saveSubsetFilter = createFilter(
  'Authentication',
  ['token']
);

export default {
  key: 'root',
  storage,
  // blacklist: ['app'] // navigation will not be persisted
  transforms: [
    saveSubsetFilter,
  ],
};
