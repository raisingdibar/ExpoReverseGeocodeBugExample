import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import { styles } from './styles';

// Define types for location and address data
type LocationObject = {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
};

// Use the correct type from expo-location
type AddressComponent = Location.LocationGeocodedAddress;

export default function App(): React.ReactElement {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressComponent[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reverseGeocodingError, setReverseGeocodingError] = useState<string | null>(null);

  // Hardcoded locations to test
  const hardcodedLocations = [
    {
      name: "San Francisco",
      coords: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    {
      name: "New York",
      coords: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    {
      name: "Tokyo",
      coords: {
        latitude: 35.6762,
        longitude: 139.6503
      }
    }
  ];

  // Current selected location index
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  useEffect(() => {
    // Initialize with the first hardcoded location
    setHardcodedLocation(0);
  }, []);

  const setHardcodedLocation = (index: number): void => {
    setCurrentLocationIndex(index);
    const selected = hardcodedLocations[index];

    setLocation({
      coords: {
        latitude: selected.coords.latitude,
        longitude: selected.coords.longitude,
        altitude: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0
      },
      timestamp: new Date().getTime()
    });

    // Clear any previous address when changing location
    setAddress(null);
    setReverseGeocodingError(null);
  };

  const handleReverseGeocode = async (): Promise<void> => {
    if (!location) {
      setReverseGeocodingError('No location available');
      return;
    }

    try {
      setIsLoading(true);
      setReverseGeocodingError(null);

      console.log('Attempting to reverse geocode coordinates:', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      // This is where the bug should occur
      const result = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      console.log('Reverse geocode result:', JSON.stringify(result, null, 2));

      setAddress(result);
      setIsLoading(false);
    } catch (error) {
      const err = error as Error;
      console.error('Reverse geocoding error:', err);
      setReverseGeocodingError(`Reverse geocoding failed: ${err.message}`);
      setIsLoading(false);

      // Show alert with error details
      Alert.alert(
        'Geocoding Error',
        `Error: ${err.message}\n\nStack: ${err.stack || 'No stack available'}`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerText}>expo-location Bug Demo</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.sectionTitle}>Test Locations:</Text>

        <View style={styles.locationButtonsContainer}>
          {hardcodedLocations.map((loc, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.locationButton,
                currentLocationIndex === index && styles.locationButtonActive
              ]}
              onPress={() => setHardcodedLocation(index)}
            >
              <Text
                style={[
                  styles.locationButtonText,
                  currentLocationIndex === index && styles.locationButtonTextActive
                ]}
              >
                {loc.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.coordinatesCard}>
          <Text style={styles.coordinatesText}>
            {location ? (
              <>
                <Text style={styles.coordinateLabel}>Selected Location: </Text>
                <Text style={styles.coordinateValue}>{hardcodedLocations[currentLocationIndex].name}</Text>
                {'\n'}
                <Text style={styles.coordinateLabel}>Latitude: </Text>
                <Text style={styles.coordinateValue}>{location.coords.latitude.toFixed(6)}</Text>
                {'\n'}
                <Text style={styles.coordinateLabel}>Longitude: </Text>
                <Text style={styles.coordinateValue}>{location.coords.longitude.toFixed(6)}</Text>
              </>
            ) : (
              "No coordinates selected"
            )}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, (!location || isLoading) && styles.buttonDisabled]}
          onPress={handleReverseGeocode}
          disabled={!location || isLoading}
        >
          <Text style={styles.buttonText}>Reverse Geocode (Reproduce Bug)</Text>
        </TouchableOpacity>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F7FF4D" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        )}

        {reverseGeocodingError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{reverseGeocodingError}</Text>
          </View>
        )}

        <ScrollView style={styles.addressContainer}>
          {address && address.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>Geocoding Results:</Text>
              {address.map((item, index) => (
                <View key={index} style={styles.addressItem}>
                  <Text style={styles.addressTitle}>Result {index + 1}</Text>
                  {Object.entries(item).map(([key, value]) => (
                    <Text key={key} style={styles.addressText}>
                      {key}: {value !== null ? String(value) : 'N/A'}
                    </Text>
                  ))}
                </View>
              ))}
            </>
          ) : address ? (
            <Text style={styles.errorText}>No address information found</Text>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}