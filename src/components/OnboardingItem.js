import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, useWindowDimensions} from 'react-native';


export default OnboardingItem = () => {
    const {width} = useWindowDimensions();


    return(
        <View style={[styles.container, {width}]}>
            {/* <Image source={item.image} style={[styles.image, {width, resizeMode: "contain"}]}/>

            <View style={{flex:0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

            </View> */}
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 0.7,
        justifyContent: "center"
    }
})