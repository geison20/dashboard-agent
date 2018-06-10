import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';

ReactDOM.render(<Dashboard />, document.getElementById('root'));

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Dashboard.js', () => {
    const NextApp = require('./Dashboard').default;
    ReactDOM.render(<NextApp />, document.getElementById('root'));
  });
}
registerServiceWorker();
