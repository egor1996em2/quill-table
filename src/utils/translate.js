import {dict} from '../assets/dict';

export function translate(key, forceLang) {
    const lang = forceLang || window.lang || 'EN';
    const langDict = dict[lang] || dict['EN'];
    return langDict[key] || dict['EN'][key] || key;
}
