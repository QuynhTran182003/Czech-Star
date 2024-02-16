import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import Word from "./classes/Word";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "./components/Image";
async function Exercise({ navigation, route }) {
    const { lessonid, lessonname } = route.params;
    const [listCards, setListCards] = useState([]);
    const [exercise, setExercise] = useState([]);
  
    useEffect(() => {
        // console.log(getCardsFromDB(lessonid));
        // console.log(listCards);

        // console.log(getRandomWordFromDatabase());
        // console.log("igi")
        // createExercise();

    }, [exercise]);

    async function getCardsFromDB (lesson_id) {
        let { data: cards, error } = await supabase
          .from("card")
          .select("czech, vietnamese, picture")
          .eq("lesson_id", lesson_id);
        setListCards(cards);
        // return listCards;
    }

    function getRandomWordFromDatabase() {
    //     const fetchData = await getCardsFromDB(lessonid);
        const randomIndex = Math.floor(Math.random() * listCards.length);
        //return json word object with czech, vietnamese, picture attributes

        return new Word(listCards[randomIndex].czech, listCards[randomIndex].vietnamese, listCards[randomIndex].picture);
    }

    function getIncorrectAnswers(word: any) {
        const allCzechWords = listCards.map((card) => card.czech);
        const filteredSuggestion = allCzechWords.filter((suggestedWord) => suggestedWord !== word.czech); // remove the correct answer from the list
        const incorrectAnswers = [];
        while (incorrectAnswers.length < 3) {
            const randomIndex = Math.floor(Math.random() * filteredSuggestion.length);
            const randomCzWord = filteredSuggestion[randomIndex];
            if (!incorrectAnswers.includes(randomCzWord)) {
                incorrectAnswers.push(randomCzWord);
            }
        }
        return incorrectAnswers;
    }

    function shuffleArray(array: Array<string>) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // function createExercise() {

    //     let word = getRandomWordFromDatabase(); // return json word object with czech, vietnamese, picture attributes
    //     // let word = new Word(jsonWord.czech, jsonWord.vietnamese, jsonWord.picture)
    //     // console.log(jsonWord.czech);
    //     // console.log(word);x
    //     // let word ;
    //     // getRandomWordFromDatabase().then((jsonWord) => {
    //         // console.log(jsonWord);
    //         // word = new Word(jsonWord.czech, jsonWord.vietnamese, jsonWord.picture);
    //     //   });
    //     const incorrectAnswers = getIncorrectAnswers(word); 
    //     //return array of 4 answers
    //     const allAnswers = [word.czech, ...incorrectAnswers];
    //     const shuffledAnswers = shuffleArray(allAnswers);
    //     const imagePath = BackgroundImage.GetImage(`${word.picture}.png`);
    //     return (
    //         <View>
    //             <Image source={imagePath} style={{ width: 200, height: 200 }} />

    //             <Text>{word.vietnamese}</Text>
    //             <FlatList
    //                 data={shuffledAnswers}
    //                 renderItem={({ item }) => (
    //                     <TouchableOpacity>
    //                         <Text>{item}</Text>
    //                     </TouchableOpacity>
    //                 )}
    //             />
    //         </View>
    //     );
    // }
    
    async function createExercise() {
        try {
            await getCardsFromDB(lessonid);
            const word = getRandomWordFromDatabase();
            
            const incorrectAnswers = getIncorrectAnswers(word);
            const allAnswers = [word.czech, ...incorrectAnswers];
            const shuffledAnswers = shuffleArray(allAnswers);
    
            const imagePath = BackgroundImage.GetImage(`${word.picture}.png`);
            return (
                <View>
                    <Image source={imagePath} style={{ width: 200, height: 200 }} />
                    <Text>{word.vietnamese}</Text>
                    <FlatList
                        data={shuffledAnswers}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            );
        } catch (error) {
            console.error("Error creating exercise:", error);
            // Handle the error as needed
        }
    }
    
    // Usage example
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
                <Text>Welcome to practice {lessonid} {lessonname} </Text>
                <View>
                    {await createExercise()}
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Exercise;


