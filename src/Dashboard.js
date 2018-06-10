import React from 'react';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { PersistGate } from 'redux-persist/integration/react'

import { store, history, persistor } from './redux/store';
import PublicRoutes from './router';
import { ThemeProvider } from 'styled-components';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import themes from './settings/themes';
import AppLocale from './languageProvider';
import config, {
  getCurrentLanguage
} from './containers/LanguageSwitcher/config';
import { themeConfig } from './settings';
import DashAppHolder from './dashAppStyle';

const currentAppLocale = AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];
const title = "chat-commerce"

const Dashboard = () => (
  <DocumentTitle title={title}>
    <LocaleProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <ThemeProvider theme={themes[themeConfig.theme]}>
          <DashAppHolder>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <PublicRoutes history={history} />
              </PersistGate>
            </Provider>
          </DashAppHolder>
        </ThemeProvider>
      </IntlProvider>
    </LocaleProvider>
  </DocumentTitle>
);

export default Dashboard;
export { AppLocale };
