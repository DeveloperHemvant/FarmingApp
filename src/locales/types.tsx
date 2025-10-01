export interface CommonTranslations {
    welcome: string;
    continue: string;
    cancel: string;
    save: string;
    delete: string;
    error: string;
    success: string;
    select_language: string;
    loading: string;
    retry: string;
}

export interface LoginTranslations {
    title: string;
    email: string;
    password: string;
    forgot_password: string;
    login_button: string;
    signup_link: string;
    errors: {
        invalid_email: string;
        short_password: string;
        required_field: string;
    };
}

export interface DashboardTranslations {
    title: string;
    welcome_message: string;
    settings: string;
    profile: string;
    logout: string;
}

export interface AppTranslations {
    common: CommonTranslations;
    login: LoginTranslations;
    dashboard: DashboardTranslations;
}

export type LanguageCode = 'en' | 'es' | 'fr' | 'hi'; // Add more as needed