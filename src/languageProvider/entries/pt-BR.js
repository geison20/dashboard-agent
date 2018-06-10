import antdEn from 'antd/lib/locale-provider/pt_BR';
import appLocaleData from 'react-intl/locale-data/pt';
import enMessages from '../locales/pt_BR.json';
// import { getKeys, getValues } from '../conversion';
// getValues(enMessages);

const PtLang = {
  messages: {
    ...enMessages,
  },
  antd: antdEn,
  locale: 'pt-BR',
  data: appLocaleData,
};
export default PtLang;
