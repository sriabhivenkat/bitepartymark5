import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';



const OnboardingViewController = ({navigation}) => {
    return(
        <Onboarding
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.replace("Login")}
        pages={[
            {
                backgroundColor: '#05405A',
                image: <Image source={require('../images/onboarding-img1.png')} />,
                title: 'Welcome.',
                subtitle: 'Welcome to Bite Party! Now you and your friends can keep the party going with good food!',
            },
            {
                backgroundColor: '#F76F6D',
                image: <Image source={require('../images/onboarding-img1.png')} />,
                title: 'Fun.',
                subtitle: 'Create a flavor profile and find people with similar profiles!',
            },
            {
                backgroundColor: '#F7A146',
                image: <Image source={require('../images/onboarding-img1.png')} />,
                title: 'Easy to use.',
                subtitle: 'Press the "Start The Party!" button if you and your friends want to pick a place to eat',
            },
            {
                backgroundColor: '#4CD95A',
                image: <Image source={require('../images/onboarding-img1.png')} />,
                title: 'Easy to use.',
                subtitle: "Don't want to go through the hassle of picking a new place every time? No worries! Bite Party saves your past restaurant picks so you never forget that one place with the really good, uh, what was it again?",
            },
        ]}
        />
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