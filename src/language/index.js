import { addLocaleData } from "react-intl";

import Portuguese from "./entries/pt-BR";
import Enlang from "./entries/en-US";

const AppLocale = {
	pt: Portuguese,
	en: Enlang,
};

addLocaleData(AppLocale.pt.data);
addLocaleData(AppLocale.en.data);

export default AppLocale;
