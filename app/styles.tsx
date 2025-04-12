import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Theme colors based on your uploaded theme.js
const theme = {
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
const spacing = {
  xs: height * 0.01,
  sm: height * 0.02,
  md: height * 0.03,
  lg: height * 0.04,
  xl: height * 0.05,
};

export const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Map container
  mapContainer: {
    height: '50%',
    width: '100%',
    overflow: 'hidden',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  
  // Loading container
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  
  // Controls section
  controlsContainer: {
    flex: 1,
    padding: spacing.md,
  },
  
  // Text styles
  coordinatesText: {
    fontSize: 16,
    marginBottom: spacing.md,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
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
    color: theme.colors.primary,
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