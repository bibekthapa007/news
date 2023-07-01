import { createSlice } from "@reduxjs/toolkit";
import {
    defaultLang,
    Ii18nState,
    supportedLangs,
} from "types/i18n";

const initialState: Ii18nState = {
    lang: defaultLang, // "en" when app loads
    supportedLangs: { ...supportedLangs },
    // We'll keep our translations in Redux to start.
    // Later on we'll move them to their own files so
    // that they're easier to manage.
    translations: {
        en: {
            home: {
                CREATED_NEWS: "Created News",
                every: "every",
                single: "single",
                CHOOSE_YOUR_PREFERRED_LANGUAGE: "Choose your preferred language",
                nepali: "nepali",
                english: "english"
            }
        },
        np: {
            home: {
                CREATED_NEWS: "Created News",
                every: "every",
                single: "single",
                CHOOSE_YOUR_PREFERRED_LANGUAGE: "Nepali Choose your preferred language",
                nepali: "nepali",
                english: "english"
            }
        }
    },
};
 const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        setLang: (state, action) => {
            localStorage.setItem("lang", action.payload)
            state.lang = action.payload;
        }
    }
});

export const { setLang } = i18nSlice.actions;

export const selectTranslations = (state: any) =>
    state.i18n.translations[state.i18n.lang];

export default i18nSlice.reducer;