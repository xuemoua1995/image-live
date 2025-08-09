import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translate/en.json'
import la from './translate/la.json'
import cn from './translate/cn.json'

export interface Langs {
  [key: string]: LG[];
}

export interface LG {
  value: string;
  label: string;
  icon: string;
}

export const LANGS: Langs = {
  la: [
    {
      value: 'la',
      label: 'ລາວ',
      icon: '/assets/icons/ic_flag_la.svg',
    },
    {
      value: 'en',
      label: 'ອັງກິດ',
      icon: '/assets/icons/ic_flag_en.svg',
    },
    {
      value: 'cn',
      label: 'ຈີນ',
      icon: '/assets/icons/ic_flag_ch.svg',
    }
  ],
  en: [
    {
      value: 'la',
      label: 'Lao',
      icon: '/assets/icons/ic_flag_la.svg',
    },
    {
      value: 'en',
      label: 'English',
      icon: '/assets/icons/ic_flag_en.svg',
    },
    {
      value: 'cn',
      label: 'Chinese',
      icon: '/assets/icons/ic_flag_ch.svg',
    }
  ],
  cn: [
    {
      value: 'la',
      label: '老挝语',
      icon: '/assets/icons/ic_flag_la.svg',
    },
    {
      value: 'en',
      label: '英语',
      icon: '/assets/icons/ic_flag_en.svg',
    },
    {
      value: 'cn',
      label: '中文',
      icon: '/assets/icons/ic_flag_ch.svg',
    }
  ]
}

const resources = {
  en: {
    translation: en,
  },
  la: {
    translation: la,
  },
  cn: {
    translation: cn,
  }
  // Add translations for other languages
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'en', // Default language
  //keySeparator: false, // Disable key separator
  //interpolation: {
  //  escapeValue: false, // Disable HTML escaping for react
  // },
});

export default i18n;