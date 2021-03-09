import React from 'react';
import {
    Text, View, Image, StyleSheet,
} from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StarRating } from "react-native-star-rating";

import { GOOGLE_API_KEY, PHOTO_URL } from '@env';

export default function ListItem (props) {

    return (
        <SafeAreaProvider style={styles.listItem}>
            <View >
                <Image
                    style={styles.image}
                    source={props.photoReference ? { uri: `${PHOTO_URL}&photoreference=${props.photoReference}&key=${GOOGLE_API_KEY}` } : { uri: `https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png` }}
                />
            </View>
            <View>
                <Text style={styles.text}>{props.name}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={props.rating}
                />
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
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'

    },
    image: {
        width: 100,
        height: 100,
    }
});
