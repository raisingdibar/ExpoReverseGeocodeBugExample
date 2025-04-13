# expo-location reverseGeocodeAsync Bug Demo

This project demonstrates an issue with the `reverseGeocodeAsync` method in expo-location using TypeScript.

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
4. Open the app on your iOS or Android device using the Expo Go app

## Project Structure

This is a TypeScript project with the following structure:
- `App.tsx` - Main application component
- `styles.ts` - Strongly typed styles using StyleSheet
- Custom type definitions for better TypeScript integration

## Reproducing the Bug

1. Launch the app
2. You'll see three hardcoded locations (San Francisco, New York, and Tokyo)
3. Select a location by tapping on its button
4. Tap the "Reverse Geocode (Reproduce Bug)" button
5. Observe the error that occurs

## Expected Behavior

The `reverseGeocodeAsync` method should return address information for the given coordinates.

## Actual Behavior

Android: The method fails with an error or returns unexpected results.
iOS: The method succeeds and displays the reverse geocoded address.

## Technical Details

- Expo SDK Version: 52
- React Native Version: 0.76.9
- expo-location Version: 18.0.10
- TypeScript Version: 5.1.3

## Console Output

Check the console output in the Expo development tools for detailed error information. The app will also display errors directly on screen and provide an alert with the full error stack trace for debugging.