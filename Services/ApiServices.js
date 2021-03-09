import React from 'react';
import * as Location from 'expo-location';

const getUserLocation = async () => {
  const { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') return 'Please allow location access!';
  const location = await Location.getCurrentPositionAsync({});
  return location;
};

const fetchRequiredData = (url) => fetch(url).then((result) => result.json());

export default { getUserLocation, fetchRequiredData };
