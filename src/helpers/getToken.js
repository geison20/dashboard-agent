import LS from 'local-storage';

export default function getToken () {
  const reducers = LS.get('persist:root') || {};
  const authentication = reducers.Authentication;

  return authentication ? JSON.parse(authentication).token : {};
};
