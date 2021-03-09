import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ApiServices from '../Services/ApiServices';

export default function Home ({ navigation }) {
  const [location, setLocation] = useState({});

  useEffect(() => {
    ApiServices.getUserLocation().then((result) => setLocation(result));
  }, []);

  return (
    <LinearGradient
      colors={['rgb(0, 48, 135)', '#070769']} // '#070769'
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Dine
          <Text>We</Text>
          Must
        </Text>
        <StatusBar backgroundColor="white" translucent />
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('Map', { userLocation: location });
          }}
          title="Find Restaurant Near You"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 35,
  },
});
