import React from 'react';
import {
    Text, View, StyleSheet, FlatList
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react/cjs/react.development';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';

import { GOOGLE_API_KEY, GOOGLE_MAPS_URL } from "@env";
import ApiServices from '../Services/ApiServices';
import ListItem from '../components/ListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Map ({ route }) {
    const [restaurants, setRestaurants] = useState([]);

    const { userLocation } = route.params;
    const { latitude } = userLocation.coords;
    const { longitude } = userLocation.coords;
    let radius = 2000;
    const type = 'restaurant';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;

    useEffect(() => {
        ApiServices.fetchRequiredData(url).then((restaurants) => setRestaurants(restaurants.results));
    }, []);

    // console.log('restaurants', restaurants);

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <View style={{
                flex: 1
            }}>
                <MapView
                    showsMyLocationButton
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                    style={{
                        flex: 1,
                    }}
                    provider="google"
                >
                    {restaurants.map(restaurant =>
                        <Marker
                            key={restaurant.place_id}
                            coordinate={{ latitude: restaurant.geometry.location.lat, longitude: restaurant.geometry.location.lng }}
                            title={restaurant.name}
                        />
                    )}
                </MapView>
            </View >
            <View style={{
                flex: 1
            }}>
                <FlatList
                    data={restaurants}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        < TouchableOpacity onPress={() => Linking.openURL(`${GOOGLE_MAPS_URL}origin=${latitude},${longitude}&destination=''&destination_place_id=${item.place_id}&mode=walking`)}>
                            <ListItem name={item.name}
                                photoReference={item.photos && item.photos[0].photo_reference}
                                rating={item.rating}
                                totalRatings={item.user_ratings_total}
                                priceLevel={item.price_level}
                                placeId={item.place_id}
                                userLatitude={latitude}
                                userLongitude={longitude}
                            />
                        </TouchableOpacity>
                    )
                    }
                />
            </View>
        </SafeAreaProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    }
});
