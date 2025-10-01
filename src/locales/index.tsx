import { AppTranslations, LanguageCode } from './types';
import en from './en';
import hi from './hi';

export const resources: Record<LanguageCode, AppTranslations> = {
    en,
    hi,
};

export type { AppTranslations, LanguageCode };
export { en, hi };