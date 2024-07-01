import lang_en from '../lang/en';
import lang_hu from '../lang/hu';
import { LanguageModel } from '../type/language.type';

const getString = (id: keyof LanguageModel): string => {
    let language: LanguageModel;

    switch (localStorage.getItem('lang') as string) {
        case 'en':
            language = lang_en;
            break;

        case 'hu':
            language = lang_hu;
            break;

        case 'dn':
            language = lang_en;
            break;

        default: 
            language = lang_en;
            break;
    }

    return language[id] as string;
}

export default getString;