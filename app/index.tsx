import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
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
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        setIsLoading(true);
        // Get current location
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setLocation({
          coords: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            altitude: currentLocation.coords.altitude,
            accuracy: currentLocation.coords.accuracy,
            altitudeAccuracy: currentLocation.coords.altitudeAccuracy,
            heading: currentLocation.coords.heading,
            speed: currentLocation.coords.speed,
          },
          timestamp: currentLocation.timestamp
        });
        setIsLoading(false);
      } catch (error) {
        const err = error as Error;
        setErrorMsg(`Error getting location: ${err.message}`);
        setIsLoading(false);
      }
    })();
  }, []);

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

  const handleMapPress = async (event: MapPressEvent): Promise<void> => {
    try {
      const { coordinate } = event.nativeEvent;
      setLocation({
        coords: {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0
        },
        timestamp: new Date().getTime()
      });

      // Clear previous address when selecting a new location
      setAddress(null);
    } catch (error) {
      const err = error as Error;
      console.error('Error handling map press:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerText}>expo-location Bug Demo</Text>
      </View>

      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            onPress={handleMapPress}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Selected Location"
              pinColor="#F7FF4D"
            />
          </MapView>
        ) : (
          <View style={[styles.map, styles.loadingContainer]}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#F7FF4D" />
            ) : (
              <Text style={styles.errorText}>{errorMsg || "Waiting for location..."}</Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.controlsContainer}>
        <Text style={styles.coordinatesText}>
          {location
            ? `Latitude: ${location.coords.latitude.toFixed(6)}\nLongitude: ${location.coords.longitude.toFixed(6)}`
            : "No coordinates available"}
        </Text>

        <TouchableOpacity
          style={[styles.button, (!location || isLoading) && styles.buttonDisabled]}
          onPress={handleReverseGeocode}
          disabled={!location || isLoading}
        >
          <Text style={styles.buttonText}>Reverse Geocode (Reproduce Bug)</Text>
        </TouchableOpacity>

        {isLoading && <ActivityIndicator style={styles.spinner} size="small" color="#F7FF4D" />}

        {reverseGeocodingError && (
          <Text style={styles.errorText}>{reverseGeocodingError}</Text>
        )}

        <ScrollView style={styles.addressContainer}>
          {address && address.length > 0 ? (
            address.map((item, index) => (
              <View key={index} style={styles.addressItem}>
                <Text style={styles.addressTitle}>Result {index + 1}</Text>
                {Object.entries(item).map(([key, value]) => (
                  <Text key={key} style={styles.addressText}>
                    {key}: {value !== null ? String(value) : 'N/A'}
                  </Text>
                ))}
              </View>
            ))
          ) : address ? (
            <Text style={styles.errorText}>No address information found</Text>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}