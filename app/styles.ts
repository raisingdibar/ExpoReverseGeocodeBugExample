import { StyleSheet, Dimensions, TextStyle, ViewStyle, ImageStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

// Define theme types
type ThemeColors = {
  background: string;
  primary: string;
  text: {
    primary: string;
    secondary: string;
    placeholder: string;
    dark: string;
  };
  input: {
    background: string;
    border: string;
  };
  button: {
    primary: string;
    text: string;
  };
  border: string;
  error: string;
};

type BorderRadius = {
  sm: number;
  md: number;
  lg: number;
};

type Theme = {
  colors: ThemeColors;
  borderRadius: BorderRadius;
};

// Define spacing type
type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

// Theme colors based on your uploaded theme.js
const theme: Theme = {
  colors: {
    background: "#191919",
    primary: "#F7FF4D", // yellow
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
      placeholder: "#777777",
      dark: "#191919",
    },
    input: {
      background: "#252525",
      border: "rgba(255, 255, 255, 0.13)",
    },
    button: {
      primary: "#F7FF4D",
      text: "#191919",
    },
    border: "#FFFFFF",
    error: "#FF4D4D",
  },
  borderRadius: {
    sm: 10,
    md: 15,
    lg: 50,
  },
};

// Responsive spacing
const spacing: Spacing = {
  xs: height * 0.01,
  sm: height * 0.02,
  md: height * 0.03,
  lg: height * 0.04,
  xl: height * 0.05,
};

// Define our style types
type StylesType = {
  container: ViewStyle;
  locationContainer: ViewStyle;
  coordinatesCard: ViewStyle;
  locationButtonsContainer: ViewStyle;
  locationButton: ViewStyle;
  locationButtonActive: ViewStyle;
  locationButtonText: TextStyle;
  locationButtonTextActive: TextStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
  coordinatesText: TextStyle;
  coordinateLabel: TextStyle;
  coordinateValue: TextStyle;
  buttonText: TextStyle;
  errorText: TextStyle;
  errorContainer: ViewStyle;
  sectionTitle: TextStyle;
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  addressContainer: ViewStyle;
  addressItem: ViewStyle;
  addressTitle: TextStyle;
  addressText: TextStyle;
  spinner: ViewStyle;
  header: ViewStyle;
  headerText: TextStyle;
};

export const styles = StyleSheet.create<StylesType>({
  // Main container
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Location container (replaces map container)
  locationContainer: {
    flex: 1,
    padding: spacing.md,
  },

  // Coordinates card
  coordinatesCard: {
    backgroundColor: theme.colors.input.background,
    borderRadius: theme.borderRadius.sm,
    padding: spacing.md,
    marginVertical: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },

  // Location buttons
  locationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  locationButton: {
    backgroundColor: theme.colors.input.background,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: theme.borderRadius.sm,
    flex: 1,
    marginHorizontal: spacing.xs / 2,
    alignItems: 'center',
  },
  locationButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  locationButtonText: {
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
  locationButtonTextActive: {
    color: theme.colors.text.dark,
  },

  // Loading container
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  loadingText: {
    color: theme.colors.primary,
    marginTop: spacing.sm,
    fontSize: 14,
  },

  // Text styles
  coordinatesText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text.primary,
  },
  coordinateLabel: {
    color: theme.colors.text.secondary,
    fontWeight: 'normal',
  },
  coordinateValue: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  buttonText: {
    color: theme.colors.button.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: spacing.sm,
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
    padding: spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginVertical: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.error,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginVertical: spacing.sm,
  },

  // Button styles
  button: {
    backgroundColor: theme.colors.button.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  buttonDisabled: {
    backgroundColor: '#555555',
  },

  // Address results
  addressContainer: {
    marginTop: spacing.md,
    flex: 1,
  },
  addressItem: {
    backgroundColor: theme.colors.input.background,
    padding: spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  addressTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: spacing.xs,
    color: theme.colors.text.primary,
  },
  addressText: {
    fontSize: 14,
    marginBottom: 4,
    color: theme.colors.text.secondary,
  },

  // Activity indicator
  spinner: {
    marginTop: spacing.sm,
  },

  // Header
  header: {
    backgroundColor: theme.colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
});