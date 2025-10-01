import { AppTranslations } from '../types';

const en: AppTranslations = {
    common: {
        welcome: 'Welcome',
        continue: 'Continue',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        error: 'Error',
        success: 'Success',
        select_language: 'Select Language',
        loading: 'Loading...',
        retry: 'Retry',
    },
    login: {
        title: 'Login',
        email: 'Email',
        password: 'Password',
        forgot_password: 'Forgot Password?',
        login_button: 'Login',
        signup_link: "Don't have an account? Sign up",
        errors: {
            invalid_email: 'Please enter a valid email address',
            short_password: 'Password must be at least 6 characters',
            required_field: 'This field is required',
        },
    },
    dashboard: {
        title: 'Dashboard',
        welcome_message: 'Welcome back!',
        settings: 'Settings',
        profile: 'Profile',
        logout: 'Logout',
    },
};

export default en;