import React, {useState, useRef} from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, Animated } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import slides from '../slides.js';
import OnboardingItem from '../component/OnboardingItem.js'

const OnboardingViewController = ({navigation}) => {
    const scrollX = useRef(new Animated.Value(0)).current
    const [currentIndex, setCurrentIndex] = useState(0);


    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    return(
        <View style={styles.container}>
            <View style={{flex: 3}}>
                <FlatList 
                    data={slides} 
                    renderItem={({item}) => <OnboardingItem item={item} /> } 
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                />
            </View>
        </View>
    );
};


export default OnboardingViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});