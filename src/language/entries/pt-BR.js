import antdPtBr from "antd/lib/locale-provider/pt_BR";
import appLocaleData from "react-intl/locale-data/pt";
import ptBrMessages from "../locales/pt_BR.json";
// import { getKeys, getValues } from '../conversion';
// getValues(ptBrMessages);

const PtLang = {
	messages: {
		...ptBrMessages,
	},
	antd: antdPtBr,
	locale: "pt-BR",
	data: appLocaleData,
};

export default PtLang;
