import React from 'react';
import {
    Text, View, Image, StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import { Directions } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AirbnbRating, Rating } from "react-native-ratings";
import StarRating from 'react-native-star-rating';

import { GOOGLE_API_KEY, PHOTO_URL, GOOGLE_DISTANCE_MATRIX_URL } from '@env';
import ApiServices from '../Services/ApiServices';

export default function ListItem (props) {
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);

    const DIRECTIONS_URL = `${GOOGLE_DISTANCE_MATRIX_URL}origins=${props.userLatitude},${props.userLongitude}&destinations=place_id:${props.placeId}&mode=walking&key=${GOOGLE_API_KEY}`;

    useEffect(() => {
        ApiServices.fetchRequiredData(DIRECTIONS_URL).then((distance) => {
            setDistance(distance.rows[0].elements[0].distance.text);
            setDuration(distance.rows[0].elements[0].duration.text);
        });
    }, []);

    // console.log('This is the top =================>>>>>>', duration);

    return (
        <SafeAreaProvider style={styles.listItem}>
            <View style={{
                alignSelf: 'center'
            }}>
                <Image
                    style={styles.image}
                    source={props.photoReference ? { uri: `${PHOTO_URL}&photoreference=${props.photoReference}&key=${GOOGLE_API_KEY}` } : { uri: `https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png` }}
                />
            </View>
            <View style={{
                display: 'flex',
                width: '70%',
                paddingLeft: 10,
            }}>
                <Text style={styles.text}>{props.name}</Text>
                <View>

                    <Rating
                        type='custom'
                        tintColor='teal'
                        startingValue={props.rating}
                        fractions={1}
                        showRating={true}
                        readonly={true}
                        ratingBackgroundColor='#c8c7c8'
                        ratingCount={5}
                        imageSize={30}
                        style={{
                            paddingTop: 5,
                            marginTop: 5,
                            height: 6,
                            alignSelf: 'flex-start',
                        }}
                    />
                </View>
                <View style={{
                    paddingTop: 45
                }}>
                    <Text style={{
                        color: 'white',
                    }}>Walking distance {distance} in aprox {duration} </Text>
                </View>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: 'teal',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 15,
        alignSelf: 'flex-start'

    },
    image: {
        width: 100,
        height: 100,
    }
});
