import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { createFilter } from "redux-persist-transform-filter";
// import createEncryptor from 'redux-persist-transform-encrypt';

// const encryptor = createEncryptor({
//   secretKey: 'oi',
//   onError(error) {
//     console.log('Encryptor error', error);
//     // Handle the error.
//   },
// });

// you want to store only a subset of your state of reducer one
const AuthenticationSubsetFilter = createFilter("Authentication", ["token"]);
const AccountSubsetFilter = createFilter("Account", ["account"]);

export default {
	key: "root",
	storage,
	// blacklist: ["Account"], // will not be persisted
	transforms: [AuthenticationSubsetFilter, AccountSubsetFilter],
};
