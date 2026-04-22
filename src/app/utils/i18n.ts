/* eslint-disable @typescript-eslint/no-explicit-any */
import fr from "@/app/lang/fr.json";
import en from "@/app/lang/en.json";

const languages: Record<string, any> = {
  fr,
  en,
};

export const getTranslation = (lang: string) => {
  return languages[lang] || languages["fr"]; // fallback en français
};
