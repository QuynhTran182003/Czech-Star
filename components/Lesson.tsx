import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View , Image, Dimensions, ScrollView} from "react-native";
import Swiper from 'react-native-swiper';
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import Animated, {useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, withTiming} from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent, GestureHandlerRootView } from "react-native-gesture-handler";

type ContextType = {
    translateX: number;
    translateY: number;
}
const SIZE_CARD = 150;
const CIRCLE_RADIUS = SIZE_CARD * 1.1;

function Lesson({route}) {
    const { id } = route.params;
    const [file, setFile] = useState<{ publicUrl: string } | null>(null);
    const windowWidth = Dimensions.get('window').width;
    const [showImage, setShowImage] = useState(false);
    useEffect(() => {
        getFile();
    }, []);


    const getFile = async () => {
        try {
            let { data: file, error } = await supabase
                .from('lesson')
                .select('file')
                .eq('', id)
            // console.log(fileName);
            const { data } = await supabase
                .storage
                .from("files")
                .getPublicUrl(`${file[0].file}`);
            if (data) {
                setFile(data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleImagePress = () => {
        setShowImage(!showImage);
    };
    const getFileName = () => {
        if (file) {
            const fileName = file.publicUrl.substring(file.publicUrl.lastIndexOf("/") + 1);
            return fileName;
        }
        return "";
    };


    
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>(
        {
            onStart: (event: any, context: any) => {
                context.translateX = translateX.value;
                context.translateY = translateY.value;
            },
            onActive: (event: any, context:any) => {
                translateX.value = context.translateX + event.translationX;
                translateY.value = context.translateY + event.translationY;
            },
            onEnd: (event: any, context:any) => {
                const distance = Math.sqrt(translateX.value * translateX.value + translateY.value * translateY.value);
                const throwDuration = 400; // Adjust this value to control the throw duration

                if(distance < CIRCLE_RADIUS){
                    translateX.value = withSpring(0);
                    translateY.value = withSpring(0);
                } else{
                    if(translateX.value > 0){
                        translateX.value = withTiming(translateX.value * 500, { duration: throwDuration });
                        translateY.value = withTiming(translateY.value, { duration: throwDuration });
                    } else{
                        translateX.value = withTiming(translateX.value* -500, { duration: throwDuration });
                        translateY.value = withTiming(translateY.value, { duration: throwDuration });
                    }
                }
            },
        }
    ); 

    const rstyle = useAnimatedStyle(() => {
        return {
          transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            ],
        };
    });

    return (
        <SafeAreaView style={styles.template}>
            {/* <Swiper showsButtons={false}>
                <View style={styleCustom.slide}>
                    <Text style={styleCustom.meaning}>SWIPEEEE</Text>
                </View>
                <View style={styleCustom.slide}>
                    <View style={styleCustom.card}>
                        <Text style={styleCustom.meaning}>CZ</Text>
                        <Text style={styleCustom.meaning}>VN</Text>
                    </View>
                </View>
                <View style={styleCustom.slide}>
                    <View style={styleCustom.card}>
                        <Text style={styleCustom.meaning}>CZ</Text>
                        <Text style={styleCustom.meaning}>VN</Text>
                    </View>
                </View>
                <View style={styleCustom.slide}>
                    <View style={styleCustom.card}>
                        <Text style={styleCustom.meaning}>CZ</Text>
                        <Text style={styleCustom.meaning}>VN</Text>
                    </View>
                </View>
            </Swiper> */}

            <GestureHandlerRootView style={styleCustom.container}>

                <View style={styleCustom.container}>
                <View style={styleCustom.circle}>

                    <PanGestureHandler onGestureEvent={panGestureEvent}>
                        <Animated.View style={[styleCustom.card, rstyle]}>
                            <Text style={styleCustom.meaning}>Jeden/ Jedna / Jedno</Text>
                            <Text style={styleCustom.meaning}>Mot</Text>
                        </Animated.View>
                    </PanGestureHandler>
                    </View>

                </View>
            </GestureHandlerRootView>

            <View style={styleCustom.btnContainer}>
                <View style={[styles.paddingX, styleCustom.btnContainer]}>
                    <Text style={[styles.bold, styles.paddingX, styles.marginY]}>Attachment</Text>
                    <TouchableOpacity onPress={handleImagePress}>
                        <Text style={[styles.underline, styles.padding2X]}>{getFileName()}</Text>
                        {showImage && file && (
                            <Image
                                source={{ uri: file.publicUrl }}
                                style={[styles.image, { width: windowWidth }]}
                                resizeMode="contain"
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.text}>Practice Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        backgroundColor: '#bfd1df',
        borderRadius: 10,
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
    circle: {
        width: CIRCLE_RADIUS*1.1,
        height: CIRCLE_RADIUS*1.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: CIRCLE_RADIUS,
        borderWidth: 2,
        borderColor: '#bfd1df',
    },
    // dummySquare: {
    //     width: 100,
    //     height: 100,
    //     backgroundColor: 'red',
    //     borderRadius: 20,
    // },
});

export default Lesson;
