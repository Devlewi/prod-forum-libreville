export const i18n = {
    locales: ["en","fr"],
    defaultLocale: "fr",   // le site s'affiche en français (l ancienne valeur était en)
  };
  
  export type I18nConfig = typeof i18n;
  export type Locale = I18nConfig["locales"][number];
  