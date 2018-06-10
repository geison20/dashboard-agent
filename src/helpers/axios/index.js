import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000',
  responseType: 'json',
  responseEncoding: 'utf8',
  maxContentLength: 2000,
  headers: {
    'accept-version': 1,
    'Accept-Language': 'pt',
  },
});
