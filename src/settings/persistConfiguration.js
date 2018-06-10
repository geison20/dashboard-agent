import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createEncryptor from 'redux-persist-transform-encrypt';

const encryptor = createEncryptor({
  secretKey: 'oi',
  onError(error) {
    console.log('Encryptor error', error);
    // Handle the error.
  },
});

export default {
  key: 'root',
  storage,
  // transforms: [encryptor],
};
