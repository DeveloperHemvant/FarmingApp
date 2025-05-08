export const Theme = {
  // Colors
  colors: {
    primary: '#2E7D32',
    primaryLight: '#4CAF50',
    primaryLighter: '#E8F5E9',
    primaryLightest: '#F1F8E9',
    secondary: '#1B5E20',
    accent: '#FF7043',
    accentLight: '#FFAB91',
    accentLighter: '#FFF3E0',
    info: '#26C6DA',
    warning: '#FFC107',
    danger: '#D84315',
    dangerLight: '#FF5722',
    dangerLighter: '#FFEBEE',
    textPrimary: '#212121',
    textSecondary: '#455A64',
    textTertiary: '#616161',
    white: '#FFFFFF',
    background: '#F8FDF8',
    border: '#C8E6C9',
    overlay: 'rgba(0,0,0,0.5)',
  },

  // Typography
  typography: {
    heading1: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      lineHeight: 36,
      color: '#1B5E20',
    },
    heading2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
      color: '#1B5E20',
    },
    heading3: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      lineHeight: 28,
      color: '#1B5E20',
    },
    heading4: {
      fontSize: 18,
      fontWeight: 'bold' as const,
      lineHeight: 24,
      color: '#1B5E20',
    },
    bodyLarge: {
      fontSize: 16,
      lineHeight: 24,
      color: '#455A64',
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: 20,
      color: '#455A64',
    },
    bodySmall: {
      fontSize: 12,
      lineHeight: 16,
      color: '#616161',
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: '#FFFFFF',
    },
    caption: {
      fontSize: 10,
      fontWeight: 'bold' as const,
      color: '#C62828',
    },
    link: {
      fontSize: 14,
      color: '#1B5E20',
      textDecorationLine: 'underline',
    },
    linkBold: {
      fontSize: 14,
      fontWeight: 'bold' as const,
      color: '#1B5E20',
      textDecorationLine: 'underline',
    },
    linkCenter: {
      fontSize: 14,
      color: '#1B5E20',
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  },

  // Spacing
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },

  // Borders
  borders: {
    radius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      pill: 50,
      circle: 100,
    },
    width: {
      thin: 1,
      medium: 2,
      thick: 4,
    },
  },

  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
  },

  // OTP Specific Styles
  otp: {
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 20,
    },
    inputBox: {
      width: 50,
      height: 50,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#C8E6C9',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
};

export type ThemeType = typeof Theme;
