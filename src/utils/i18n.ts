import config from "../../config.json";

const ALLOWED_LANGUAGE_CODES = config.languages.map((lang) => lang.code);

type LanguagesCodes = (typeof ALLOWED_LANGUAGE_CODES)[number];
interface Language {
  code: string;
  name: string;
  weight: number;
  isDefault?: boolean;
}

export const languages = config.languages.sort(
  (a: Language, b: Language) => a.weight - b.weight
);
export const defaultLanguage = config.languages.find(
  (lang) => lang.isDefault === true
);

if (!defaultLanguage)
  throw Error(
    "A default language needs to be set in the config.json. Add 'isDefault: true' to any language"
  );

export const findLanguage = (language: string): Language | undefined | null => {
  return config.languages.find((lang) => lang.code === language);
};

export const getLanguageFromUrl = (url: URL) => {
  const language = url.pathname.split("/")[1];

  return findLanguage(language) || defaultLanguage;
};

export const getRelativePath = (url: URL) => {
  const pathname = url.pathname;
  const secondSeparatorIndex = pathname.indexOf("/", 1);

  return secondSeparatorIndex !== -1
    ? pathname.substring(secondSeparatorIndex + 1)
    : "";
};

export const getUrlInLanguage = async (
  url: URL,
  targetLanguage: LanguagesCodes
) => {
  const relativePath = getRelativePath(url);
  const toLanguage = findLanguage(targetLanguage)?.code || defaultLanguage;

  return `/${toLanguage}${relativePath ? "/" + relativePath : ""}`;
};
