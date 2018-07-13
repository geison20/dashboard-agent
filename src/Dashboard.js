import React from "react";
import { Provider } from "react-redux";
import DocumentTitle from "react-document-title";
import { PersistGate } from "redux-persist/integration/react";
import { hot } from "react-hot-loader";

import { store, history, persistor } from "./redux/store";
import PublicRoutes from "./router";
import { ThemeProvider } from "styled-components";
import { LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";
import themes from "./settings/themes";
import AppLocale from "./language";
import DashboardCSSMain from "./dashAppStyle";
import { themeConfig, getDefaultLocale, defaultTitle } from "./settings";

const currentAppLocale = AppLocale[getDefaultLocale()];

const Dashboard = () => (
	<DocumentTitle title={defaultTitle}>
		<LocaleProvider locale={currentAppLocale.antd}>
			<IntlProvider
				locale={currentAppLocale.locale}
				messages={currentAppLocale.messages}
			>
				<ThemeProvider theme={themes[themeConfig.theme]}>
					<DashboardCSSMain>
						<Provider store={store}>
							<PersistGate loading={null} persistor={persistor}>
								<PublicRoutes history={history} />
							</PersistGate>
						</Provider>
					</DashboardCSSMain>
				</ThemeProvider>
			</IntlProvider>
		</LocaleProvider>
	</DocumentTitle>
);

export default hot(module)(Dashboard);
export { AppLocale };
