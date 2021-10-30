import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          error: {
            login: "User don't exist",
          },
          common: {
            a: "Add",
            rec: "Recover",
            rem: "Remove",
            e: "Email",
            p: "Password",
            n: "Name",
            r: "Role",
            s: "Select",
            i: "Id",
          },
          menu: {
            s: "Sing in",
            r: "Registrate",
            l: "Language",
          },
          login: {
            r: "Remember me",
            e: "Email",
            p: "Password",
          },
          users: {
            s: "Show users",
            sr: "Show removed users",
          },
          // here we will place our translations...
        },
      },
      uk: {
        translation: {
          error: {
            login: "Користувача не існує",
          },
          common: {
            a: "Додати",
            rec: "Возобновити",
            rem: "Видалити",
            i: "Унікальний номер",
            e: "Почта",
            p: "Пароль",
            n: "Им'я",
            r: "Роль",
            s: "Виберіть",
          },
          menu: {
            s: "Увійти",
            r: "Зарегіструватися",
            l: "Мова",
          },
          login: {
            r: "Запам'ятати",
            e: "Почта",
            p: "Пароль",
          },
          users: {
            s: "Показати користувачів",
            sr: "Показати видалених користувачів",
          },
          // here we will place our translations...
        },
      },
    },
  });

export default i18n;
