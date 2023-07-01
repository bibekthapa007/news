export const defaultLang = "en";
export const supportedLangs = {
    en: "English",
    np: "Nepali"
}

export interface Ii18nState {
    lang: string;
    supportedLangs: any;
    translations: any;
}