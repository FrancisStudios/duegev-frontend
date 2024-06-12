import lang_en from '../lang/en';
import { LanguageModel } from '../type/language.type';

const getString = (id: keyof LanguageModel): String => {
    let language: LanguageModel;

    switch (localStorage.getItem('lang') as string) {
        case 'en':
            language = lang_en
            break;

        case 'hu':
            language = lang_en
            break;

        case 'dn':
            language = lang_en
            break;

        default: language = lang_en;
    }

    return language[id] as String;
}

export default getString;