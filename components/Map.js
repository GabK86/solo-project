import React from 'react';
import {
    Text, View, StyleSheet, FlatList
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react/cjs/react.development';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GOOGLE_API_KEY } from "@env";
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
        ApiServices.getRestaurants(url).then((restaurants) => setRestaurants(restaurants.results));
    }, []);

    // console.log('restaurants', restaurants);

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <View style={{
                // backgroundColor: 'red',
                // height: '50%',
                // width: '100%'
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
                        flex: 1
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
                // backgroundColor: 'blue',
                // height: '50%',
                // width: '100%'
                flex: 1
            }}>
                <FlatList
                    // style={{ flex: 1 }}
                    data={restaurants}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        < TouchableOpacity >
                            <ListItem name={item.name}
                                photoReference={item.photos && item.photos[0].photo_reference}
                                rating={item.rating}
                                totalRatings={item.user_ratings_total}
                                priceLevel={item.price_level}
                                placeId={place_id}

                            />
                        </TouchableOpacity>
                    )
                    }
                />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent: 'space-around',]
        flex: 1
    },
    map: {
        flex: 1
    }
});
