
import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Dimensions, Animated, PanResponder } from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import MyCard from "./components/MyCard";

const SIZE_CARD = 150;
const CIRCLE_RADIUS = SIZE_CARD * 0.3;
const { width, height } = Dimensions.get('screen');

function Lesson({ navigation, route }) {
    const { id, name } = route.params;
    const [file, setFile] = useState<{ publicUrl: string } | null>(null);
    const [showImage, setShowImage] = useState(false);
    const [listCards, setListCards] = useState([]);
    const [showPracticeButton, setShowPracticeButton] = useState(false);
    const [initialCardCount, setInitialCardCount] = useState(0);
    const [remember, setRemember] = useState(0);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const swipe = useRef(new Animated.ValueXY()).current;
    const titlSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const fetchData = async () => {
            // set the listCards by calling this below method
            await getCardsFromDB(id);
            setShowPracticeButton(false);
            setRemember(0); // Reset swipedRightCount
        };
        fetchData();

    }, [id]);

    useEffect(() => {
        return (
            console.log("use effect" + initialCardCount)
        )
    }, [listCards]);

    const panResponder = PanResponder.create({
        // Allow pan responder to activate
        onMoveShouldSetPanResponder: () => true,

        // Handle card movement while dragging
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy });
            titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
        },

        // Handle card release after dragging
        onPanResponderRelease: (_, { dx, dy }) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > 100;
            if (isActionActive) {   // Swipe the card off the screen
                // animation 
                Animated.timing(swipe, {
                    duration: 100,
                    toValue: {
                        x: direction * 500,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(() => removeTopCard(direction));

            }
            else {   // Return the card to its original position
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    useNativeDriver: true,
                    friction: 5
                }).start()
            }
        }
    })

    const removeTopCard = useCallback((direction) => {
        if (direction === 1) {
            setListCards((currState) => currState.slice(1));
            setRemember(remember + 1); // Increment
            if (initialCardCount - 1 === remember) {
                setShowPracticeButton(true);
            }
            console.log(remember);
        } else if (direction === -1) {
            setListCards((currState) => [...currState.slice(1), currState[0]]);
        }
        swipe.setValue({ x: 0, y: 0 });

    }, [swipe, remember]);

    async function getCardsFromDB(lesson_id: any) {
        let { data: cards, error } = await supabase
            .from('card')
            .select('czech, vietnamese, picture')
            .eq('lesson_id', lesson_id);
        setListCards(cards);
        setInitialCardCount(cards.length);
    };

    const rstyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'rgba(134,0,180,1)' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    return (
        <LinearGradient
            // colors={['rgba(35,0,36,1)', 'rgba(9,31,121,1)', 'rgba(190,0,255,1)']}
            // colors={['rgba(75,1,77,1)', 'rgba(51,74,170,1)', 'rgba(190,0,255,1)']}
            colors={['rgba(134,0,180,1)',
            'rgba(42,94,200,1)',
            'rgba(20,0,73,1)',]}
            start={[0, 0]} // Start point for the gradient, [0, 0] is the top-left corner
            end={[1, 1]} 
            style={styles.linearGradient}
        >
            <SafeAreaView style={[styles.template]}>
                <Text>{id} - {name}</Text>
                <View style={styleCustom.container}>
                {
                    listCards.map(({ czech, vietnamese, picture }, index) => {
                        const isFirst = index === 0;
                        const dragHandlers = isFirst ? panResponder.panHandlers : {};
                        return (
                            <MyCard
                                key={czech}
                                czech={czech}
                                vietnamese={vietnamese}
                                picture={picture}
                                isFirst={isFirst}
                                swipe={swipe}
                                titlSign={titlSign}
                                {...dragHandlers}
                            />
                        )
                    }
                    ).reverse()
                }
                </View>
                
                <View>
                {<TouchableOpacity
                            style={[styles.btn, styles.marginY, styles.margin2X]}
                            onPress={() => navigation.navigate('Grammar', { lessonid: id, lessonname: name })}
                        >
                            <Text style={[styles.paddingY, styles.black_text]}>Grammar & Tips</Text>
                </TouchableOpacity>
                }
                {
                    showPracticeButton && (
                        <TouchableOpacity
                            style={[styles.btn, styles.marginY, styles.margin2X]}
                            onPress={() => navigation.navigate('Exercise', { lessonid: id, lessonname: name })}
                        >
                            <Text style={[styles.paddingY, styles.black_text]}>Practice Now</Text>
                        </TouchableOpacity>)
                }

                {
                    !showPracticeButton && (
                        <TouchableOpacity
                            style={[styles.btn, styles.marginY, styles.margin2X]}
                            onPress={() => navigation.navigate('Exercise', { lessonid: id, lessonname: name })}
                        >
                            <Text style={[styles.paddingY, styles.black_text]}>Skip</Text>
                        </TouchableOpacity>)
                }
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
}

const styleCustom = StyleSheet.create({
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 2,
    },
    card: {
        // backgroundColor: '#92B1B6',
        // backgroundColor: '#bfd1df',
        borderRadius: 20,
        padding: 20,
        margin: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        width: SIZE_CARD,
        height: SIZE_CARD,
    },

    meaning: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
    },
    // circle: {
    //     width: CIRCLE_RADIUS * 1.1,
    //     height: CIRCLE_RADIUS * 1.1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: CIRCLE_RADIUS,
    //     borderWidth: 2,
    //     borderColor: '#bfd1df',
    // }
});

export default Lesson;