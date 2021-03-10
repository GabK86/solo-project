import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Button, TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

import ApiServices from '../Services/ApiServices';

export default function Home ({ navigation }) {
  const [location, setLocation] = useState({});

  useEffect(() => {
    ApiServices.getUserLocation().then((result) => setLocation(result));
  }, []);

  return (
    <LinearGradient
      colors={['rgb(0, 48, 135)', '#070769', 'rgb(0, 48, 135)']} // '#070769'
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View>
          <Entypo name="bowl" size={100} color="#e75333" />
        </View>
        <Text style={styles.text}>
          DineWeMust
        </Text>
        <StatusBar backgroundColor="white" translucent />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Map', { userLocation: location });
          }}
          style={{
            backgroundColor: '#e75333',
            borderWidth: 2,
            borderColor: '#cf3918',
            marginTop: 100,
            width: 220,
            height: 50,
            borderRadius: 6
          }}
        >
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'sans-serif-condensed',
            paddingTop: 7,
            textTransform: 'uppercase'

          }}>Find restaurants</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient >
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
    paddingTop: 10
  },
});
