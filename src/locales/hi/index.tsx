import { AppTranslations } from '../types';

const hi: AppTranslations = {
    common: {
        welcome: 'स्वागत है',
        continue: 'जारी रखें',
        cancel: 'रद्द करें',
        save: 'सहेजें',
        delete: 'हटाएं',
        error: 'त्रुटि',
        success: 'सफलता',
        select_language: 'भाषा चुनें',
        loading: 'लोड हो रहा है...',
        retry: 'पुनः प्रयास करें',
    },
    login: {
        title: 'लॉगिन',
        email: 'ईमेल',
        password: 'पासवर्ड',
        forgot_password: 'पासवर्ड भूल गए?',
        login_button: 'लॉगिन',
        signup_link: 'खाता नहीं है? साइन अप करें',
        errors: {
            invalid_email: 'कृपया एक वैध ईमेल पता दर्ज करें',
            short_password: 'पासवर्ड कम से कम 6 वर्णों का होना चाहिए',
            required_field: 'यह फ़ील्ड आवश्यक है',
        },
    },
    dashboard: {
        title: 'डैशबोर्ड',
        welcome_message: 'वापसी पर स्वागत है!',
        settings: 'सेटिंग्स',
        profile: 'प्रोफाइल',
        logout: 'लॉगआउट',
    },
};

export default hi;