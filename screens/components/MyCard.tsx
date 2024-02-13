import {View, Text, Image, StyleSheet, Dimensions, Animated} from 'react-native';
import React, { Fragment, useCallback} from 'react';


// import Animated from 'react-native-reanimated';
import Choice from './Choice';
import { BackgroundImage } from './Image';


const {width, height} = Dimensions.get('screen');

const MyCard = ({ czech, vietnamese, picture, isFirst, swipe, titlSign, ...rest}) => {
    const rotate = Animated.multiply(swipe.x,titlSign).interpolate({
        inputRange: [-100,0,100],
        outputRange: ['8deg', '0deg', '-8deg']
    });

     // Animated style for the card with rotation and translation
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }

    // Opacity animation for the "remember" button
    const rememberOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0,1],
        extrapolate: 'clamp'
    });

    // Opacity animation for the "revise" button
    const reviseOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1,0],
        extrapolate: 'clamp'
    });

    // Function to render the "remem" and "revise" buttons conditionally
    const renderChoice = useCallback(()=>{
        return (
           <Fragment>
              <Animated.View
               style={[
                styles.choiceContainer, 
                styles.rememContainer,
                { opacity: rememberOpacity }
                ]}>
                 <Choice type="remember" />
              </Animated.View>
              <Animated.View 
                style={[
                    styles.choiceContainer, 
                    styles.reviseContainer,
                { opacity: reviseOpacity }
                    ]}>
                 <Choice type="revise" />
              </Animated.View>
           </Fragment>
        )
    },[rememberOpacity, reviseOpacity])

    const imagePath = BackgroundImage.GetImage(`${picture}.png`);
    return (
        <Animated.View style={[
            styles.container,
            isFirst && animatedCardStyle
            ]} {...rest}>
                <View style={styles.imgContainer}>

                    <Image source={imagePath} style={styles.images} />

                </View>
            {/* <Image source={require(imagePath)} style={styles.images}/> */}
            {/* <Image source={require('../assets/adaptive-icon.png')} style={styles.images} /> */}
            <View style={styles.whiteBg}>
                <View style={styles.row}>
                    {/* <Image source={require('../../assets/icons/czech-republic.png')} /> */}
                    <Image source={BackgroundImage.GetImage('czech-republic.png')} />
                    <Text> Czech: {czech}</Text>
                </View>

                <View style={styles.row}>
                    {/* <Image source={require('../../assets/icons/vietnam.png')} /> */}
                    <Image source={BackgroundImage.GetImage('vietnam.png')} />

                    <Text> Vietnamese: {vietnamese}</Text>
                </View>

            </View>
                <Text>{imagePath}</Text>

            {isFirst && renderChoice()}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 25,
    },
    images: {
        // width: width,
        // height: height * 0.4,
    },
    imgContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    whiteBg: {
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    choiceContainer: {
        position: 'absolute',
        top: 100
     },
     rememContainer:{
       left: 45,
       transform: [{ rotate: '-30deg' }]
     },
     reviseContainer:{
       right: 45,
       transform: [{ rotate: '30deg' }]
     },
});

export default MyCard;
