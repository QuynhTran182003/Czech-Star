import {FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import Lesson from "./Lesson";
function PracticeLesson({route}){
    const {lessonid, lessonname} = route.params;
    const [listCards, setListCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // set the listCards by calling this below method
            await getCardsFromDB(lessonid);
        };
        fetchData();

    },[lessonid]);

    async function getCardsFromDB(lesson_id: any) {
        let { data: cards, error } = await supabase
          .from('card')
          .select('czech, vietnamese, picture')
          .eq('lesson_id', lesson_id);
        setListCards(cards);

    };

    return (
        <SafeAreaView style={styles.template}>
            <Text>Welcome to practice {lessonid} { lessonname } </Text>
        </SafeAreaView>
    )
}

export default PracticeLesson;


