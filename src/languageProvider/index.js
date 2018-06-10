import Portuguese from './entries/pt-BR';
import Enlang from './entries/en-US';
import Zhlang from './entries/zh-Hans-CN';
import Salang from './entries/ar_SA';
import Itlang from './entries/it_IT';
import Eslang from './entries/es_ES';
import Frlang from './entries/fr_FR';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  pt: Portuguese,
  en: Enlang,
  zh: Zhlang,
  sa: Salang,
  it: Itlang,
  es: Eslang,
  fr: Frlang
};
addLocaleData(AppLocale.pt.data);
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.zh.data);
addLocaleData(AppLocale.sa.data);
addLocaleData(AppLocale.it.data);
addLocaleData(AppLocale.es.data);
addLocaleData(AppLocale.fr.data);

export default AppLocale;
