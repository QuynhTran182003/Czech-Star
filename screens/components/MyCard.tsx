import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import React, { Fragment, useCallback } from 'react';


// import Animated from 'react-native-reanimated';
import Choice from './Choice';
import { BackgroundImage } from './Image';
import styles from '../../style';
import { LinearGradient } from 'expo-linear-gradient';


const { width, height } = Dimensions.get('screen');

const MyCard = ({ czech, vietnamese, picture, isFirst, swipe, titlSign, ...rest }) => {
    const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['8deg', '0deg', '-8deg']
    });

    // Animated style for the card with rotation and translation
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }

    // Opacity animation for the "remember" button
    const rememberOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });

    // Opacity animation for the "revise" button
    const reviseOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    // Function to render the "remem" and "revise" buttons conditionally
    const renderChoice = useCallback(() => {
        return (
            <Fragment>
                <Animated.View
                    style={[
                        styleCustom.choiceContainer,
                        styleCustom.rememContainer,
                        { opacity: rememberOpacity }
                    ]}>
                    <Choice type="remember" />
                </Animated.View>
                <Animated.View
                    style={[
                        styleCustom.choiceContainer,
                        styleCustom.reviseContainer,
                        { opacity: reviseOpacity }
                    ]}>
                    <Choice type="revise" />
                </Animated.View>
            </Fragment>
        )
    }, [rememberOpacity, reviseOpacity])

    const imagePath = BackgroundImage.GetImage(`${picture}.png`);

    return (
        <Animated.View style={[
            styleCustom.container,
            isFirst && animatedCardStyle,

        ]} {...rest}>

            <LinearGradient
                colors={['rgba(134,0,180,1)',
                'rgba(42,94,200,1)',
                'rgba(20,0,73,1)',]}
                start={[0, 0]} // Start point for the gradient, [0, 0] is the top-left corner
                end={[1, 1]}
                style={[styleCustom.imgContainer, styles.marginY,styles.linearGradient]}
            >
                <View style={[styles.padding2X, styles.padding2Y]}>
                    <Image source={imagePath} />
                </View>

            </LinearGradient>


            <View style={[styles.container, styles.paddingY, styleCustom.whiteBg]}>
                <View style={[styleCustom.row, styles.padding2X, styles.borderBot]}>
                    <Image source={BackgroundImage.GetImage('czech-republic.png')} />
                    <Text style={[styles.subheading2, styles.bold, styles.paddingY]}>  {czech}</Text>
                </View>

                <View style={styleCustom.row}>
                    <Image source={BackgroundImage.GetImage('vietnam.png')} />
                    <Text style={[styles.subheading2, styles.bold, styles.paddingY]}>  {vietnamese}</Text>
                </View>

            </View>
            {isFirst && renderChoice()}
        </Animated.View>
    );
};

const styleCustom = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 25,
    },

    imgContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 90,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    whiteBg: {
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    choiceContainer: {
        position: 'absolute',
        top: 100
    },
    rememContainer: {
        left: 45,
        transform: [{ rotate: '-30deg' }]
    },
    reviseContainer: {
        right: 45,
        transform: [{ rotate: '30deg' }]
    },
});

export default MyCard;
