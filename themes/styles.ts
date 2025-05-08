import { StyleSheet } from 'react-native';
import { Theme } from './theme';

export const makeStyles = (theme: typeof Theme) => {
  return StyleSheet.create({
    // Layout
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex1: {
      flex: 1,
    },
    flexGrow1: {
      flexGrow: 1,
    },
    wrap: {
      flexWrap: 'wrap',
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
    },

    // Header
    staticHeader: {
      paddingTop: 50,
      paddingHorizontal: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
      backgroundColor: theme.colors.white,
      borderBottomLeftRadius: theme.borders.radius.lg,
      borderBottomRightRadius: theme.borders.radius.lg,
      ...theme.shadows.md,
      marginBottom: theme.spacing.xs,
    },
    headerTextBlock: {
      marginBottom: theme.spacing.sm,
    },

    // Inputs
    searchInput: {
      backgroundColor: theme.colors.primaryLightest,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borders.radius.md,
      fontSize: theme.typography.bodyLarge.fontSize,
      marginBottom: theme.spacing.sm,
      borderWidth: theme.borders.width.thin,
      borderColor: theme.colors.border,
    },

    // Cards
    card: {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borders.radius.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    essentialToolCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.sm,
      borderRadius: theme.borders.radius.sm,
      marginHorizontal: theme.spacing.xs,
    },
    cropCard: {
      width: '48%',
      backgroundColor: theme.colors.white,
      borderRadius: theme.borders.radius.md,
      padding: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
      alignItems: 'center',
      ...theme.shadows.sm,
      position: 'relative',
    },
    categoryCard: {
      width: '48%',
      backgroundColor: theme.colors.primaryLighter,
      borderRadius: theme.borders.radius.md,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
      alignItems: 'center',
      borderWidth: theme.borders.width.thin,
      borderColor: theme.colors.border,
    },
    alertCard: {
      backgroundColor: theme.colors.accentLighter,
      borderRadius: theme.borders.radius.md,
      padding: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
      borderLeftWidth: theme.borders.width.thick,
      borderLeftColor: theme.colors.dangerLight,
    },
    vedicCard: {
      backgroundColor: theme.colors.primaryLighter,
      borderRadius: theme.borders.radius.md,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      borderLeftWidth: theme.borders.width.thick,
      borderLeftColor: theme.colors.primaryLight,
    },
    diseaseAlertCard: {
      backgroundColor: theme.colors.accentLighter,
      borderRadius: theme.borders.radius.md,
      padding: theme.spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xxl,
      borderLeftWidth: theme.borders.width.thick,
      borderLeftColor: theme.colors.dangerLight,
    },

    // Weather
    weatherContainer: {
      marginBottom: theme.spacing.lg,
      borderRadius: theme.borders.radius.lg,
      overflow: 'hidden',
    },
    weatherAnimationWrapper: {
      height: 150,
      backgroundColor: '#E3F2FD',
      justifyContent: 'center',
      alignItems: 'center',
    },
    weatherAnimationContainer: {
      width: 200,
      height: 200,
    },
    weatherDetailsCard: {
      backgroundColor: theme.colors.white,
      padding: theme.spacing.md,
    },
    weatherLocationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    weatherInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    weatherMainInfo: {
      flex: 1,
    },
    weatherStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
    },
    weatherStat: {
      alignItems: 'center',
      marginHorizontal: theme.spacing.xs,
    },

    // Grids
    grid2: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    essentialTools: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.xs,
    },

    // Badges
    diseaseBadge: {
      position: 'absolute',
      top: theme.spacing.xs,
      right: theme.spacing.xs,
      backgroundColor: theme.colors.dangerLighter,
      paddingHorizontal: theme.spacing.xxs,
      paddingVertical: 2,
      borderRadius: theme.borders.radius.pill,
      borderWidth: theme.borders.width.thin,
      borderColor: theme.colors.accentLight,
    },

    // Buttons
    alertButton: {
      backgroundColor: theme.colors.dangerLight,
      paddingVertical: theme.spacing.xxs,
      paddingHorizontal: theme.spacing.sm,
      borderRadius: theme.borders.radius.sm,
      alignSelf: 'flex-start',
      marginTop: theme.spacing.xs,
    },

    // Images & Icons
    vedicIcon: {
      width: 40,
      height: 40,
      marginRight: theme.spacing.xs,
    },
    alertIcon: {
      width: 40,
      height: 40,
      marginRight: theme.spacing.xs,
    },
    cropIcon: {
      fontSize: 30,
      marginBottom: theme.spacing.xs,
    },

    // Text Containers
    alertTextContainer: {
      flex: 1,
      marginLeft: theme.spacing.xs,
    },
    vedicTextContainer: {
      flex: 1,
      marginLeft: theme.spacing.xs,
    },
    
  });
};

export const TextStyles = (theme: typeof Theme) => ({
  greeting: {
    ...theme.typography.heading1,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.primaryLight,
  },
  sectionTitle: {
    ...theme.typography.heading3,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  essentialToolText: {
    ...theme.typography.button,
    marginLeft: theme.spacing.xs,
  },
  weatherLocationText: {
    ...theme.typography.bodyLarge,
    marginLeft: theme.spacing.xs,
  },
  weatherTemp: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    color: theme.colors.primary,
  },
  weatherCondition: {
    ...theme.typography.bodyMedium,
    marginTop: theme.spacing.xs,
  },
  weatherStatText: {
    ...theme.typography.bodySmall,
    marginTop: theme.spacing.xs,
  },
  weatherErrorText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
    textAlign: 'center' as const,
  },
  alertTitle: {
    ...theme.typography.heading4,
    color: theme.colors.danger,
    marginBottom: theme.spacing.xs,
  },
  alertText: {
    ...theme.typography.bodyMedium,
    lineHeight: theme.typography.bodyMedium.lineHeight,
  },
  cropName: {
    ...theme.typography.bodyLarge,
    fontWeight: '600' as const,
    color: theme.colors.primary,
    textAlign: 'center' as const,
  },
  categoryText: {
    ...theme.typography.bodyLarge,
    fontWeight: '600' as const,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
    textAlign: 'center' as const,
  },
  vedicTitle: {
    ...theme.typography.heading4,
    marginBottom: theme.spacing.xs,
  },
  vedicText: {
    ...theme.typography.bodyMedium,
    lineHeight: theme.typography.bodyMedium.lineHeight,
  },
  alertButtonText: {
    ...theme.typography.button,
  },
  diseaseBadgeText: {
    ...theme.typography.caption,
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: theme.spacing.md,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  input: {
    borderWidth: theme.borders.width.thin,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.primaryLightest,
    fontSize: theme.typography.bodyLarge.fontSize,
  },
  detectLink: {
    color: theme.colors.primary,
    textAlign: 'right',
    marginTop: theme.spacing.xs,
    fontWeight: '600',
    fontSize: theme.typography.bodySmall.fontSize,
  },
  primaryButton: {
    backgroundColor: theme.colors.primaryLight,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius.md,
    marginVertical: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  or: {
    textAlign: 'center',
    marginVertical: theme.spacing.md,
    fontWeight: '600',
    color: theme.colors.textTertiary,
    fontSize: theme.typography.bodySmall.fontSize,
  },
  socialContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialButton: {
    backgroundColor: theme.colors.primaryLighter,
    padding: theme.spacing.sm,
    borderRadius: theme.borders.radius.md,
    marginVertical: theme.spacing.xs,
    width: '80%',
    alignItems: 'center',
    borderWidth: theme.borders.width.thin,
    borderColor: theme.colors.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xxl,
    borderRadius: theme.borders.radius.lg,
    width: '85%',
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    padding: theme.spacing.xs,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: theme.borders.width.medium,
    borderColor: theme.colors.border,
    borderRadius: theme.borders.radius.md,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    backgroundColor: theme.colors.primaryLighter,
  },
  resendLink: {
    marginBottom: theme.spacing.xl,
  },
  // Login Screen Specific Text Styles
  label: {
    ...theme.typography.bodyMedium,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  modalTitle: {
    ...theme.typography.heading3,
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  },
  modalSubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textTertiary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  socialText: {
    ...theme.typography.bodyLarge,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  resendText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textTertiary,
  },
  resendHighlight: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});