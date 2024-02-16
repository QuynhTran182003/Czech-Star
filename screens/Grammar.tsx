import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import Lesson from "./Lesson";
import { LinearGradient } from "expo-linear-gradient";
function Grammar({ navigation, route }) {
    const { lessonid, lessonname } = route.params;
    const [content, setContent] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // set the listCards by calling this below method
            await getContentFromDB(lessonid);
        };
        fetchData();

    }, [lessonid]);

    async function getContentFromDB(lesson_id: any) {
        let { data: content, error } = await supabase
            .from('grammar')
            .select('content')
            .eq('lesson_id', lesson_id);
        setContent(content[0].content);
        console.log(content[0].content);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'rgba(134,0,180,1)' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    return (
        <LinearGradient
            colors={['rgba(134,0,180,1)',
                'rgba(42,94,200,1)',
                'rgba(20,0,73,1)',]}
            start={[0, 0]} // Start point for the gradient, [0, 0] is the top-left corner
            end={[1, 1]}
            style={styles.linearGradient}
        >
            <SafeAreaView style={styles.template}>
                <View style={[styles.padding2X, styles.padding2Y, styles.margin2X, styles.margin2Y, styleCustom.blur]}>
                    <Text style={[styles.white_text, styles.subheading2]}>{content}</Text>

                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}
const styleCustom = StyleSheet.create({
    blur: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
    }
});

export default Grammar;


