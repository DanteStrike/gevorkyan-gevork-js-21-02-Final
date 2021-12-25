import React from 'react';
import {HashRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'antd/dist/antd.min.css';
import './index.scss';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import OverlayScrollbars from 'overlayscrollbars';
import App from './App';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import {ThemeProvider} from './context/ThemeContext';
import configuredStore from './store';
import './locale/i18next';

OverlayScrollbars(document.body, {
  nativeScrollbarsOverlaid: {
    initialize: false,
  },
  overflowBehavior: {
    x: 'hidden',
  },
});

const init = (store: typeof configuredStore) => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider storageKey="app-theme">
        <Router>
          <ScrollToTop />
          <App />
        </Router>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};
init(configuredStore);
