import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "./components/Image";
import Word from "./classes/Word";
import { FlipInEasyX } from "react-native-reanimated";


function Exercise({ navigation, route }) {
    const { lessonid, lessonname } = route.params;
    const [listCards, setListCards] = useState([]);
    const [showExercicse, setShowExercise] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'rgba(134,0,180,1)' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    useEffect(() => {
        const fetchData = async () => {
            // set the listCards by calling this below method
            await getCardsFromDB(lessonid);
            setShowExercise(true);
        };
        fetchData();

    }, []);

    async function getCardsFromDB (lesson_id) {
        let { data: cards, error } = await supabase
          .from("card")
          .select("czech, vietnamese, picture")
          .eq("lesson_id", lesson_id);
        setListCards(cards);
    }

    function getRandomWordFromDatabase() {
    //     const fetchData = await getCardsFromDB(lessonid);
        const randomIndex = Math.floor(Math.random() * listCards.length);
        if (listCards[randomIndex] != undefined) {
            // console.log(listCards[randomIndex].czech);
            // console.log(listCards[randomIndex].vietnamese);
            return new Word(listCards[randomIndex].czech, listCards[randomIndex].vietnamese, listCards[randomIndex].picture);
        }
        //return json word object with czech, vietnamese, picture attributes
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

    function createExercise() {
    // get random word from database
    // get incorrect answers
    // shuffle answers

        let word = getRandomWordFromDatabase(); // return json word object with czech, vietnamese, picture attributes
        const incorrectAnswers = getIncorrectAnswers(word); 
        //return array of 4 answers
        const allAnswers = [word.czech, ...incorrectAnswers];
        const shuffledAnswers = shuffleArray(allAnswers);
        const imagePath = BackgroundImage.GetImage(`${word.picture}.png`);
        // console.log("Shuffled ans: " + shuffledAnswers);

        return (
            <View>
                <View style={[styles.paddingY]}>
                    <View style={[styles.container, styles.paddingY, styles.margin2X, styles.borderBot]}>
                        <Image source={imagePath} style={[{ width: 200, height: 200}, styles.margin2Y]} />
                    </View>
                    <View style={[styles.container, styles.margin2Y, styles.margin2X, styles.padding2X, styles.paddingY, styleCustom.blurredBg]}>
                        <Text style={[styles.subheading, styles.padding2X, styles.marginY, styles.bold_text, styles.white_text]}>{word.vietnamese}</Text>
                    </View>
                </View>
                
                {/* <Text>{word.czech}</Text> */}
                <FlatList
                    data={shuffledAnswers}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={
                                ()=> 
                                checkAnswer(item, word)
                            }
                            style={
                                // [styleCustom.answers, styles.padding2X, styles.padding2Y, styles.marginY,styles.margin2X]
                                [
                                    styleCustom.answers,
                                    styles.padding2X,
                                    styles.padding2Y,
                                    styles.marginY,
                                    styles.margin2X,
                                    selectedAnswer ? styleCustom.correctAnswer : styleCustom.incorrectAnswer // Apply green background if checkAnswer is true
                                  ]
                            }
                            >
                            <Text style={[{flex:1, textAlign:"center"}, styles.bold_text, styles.text_m]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.toString()}
                    numColumns={2}
                />
            </View>
        );
    }
    
    function checkAnswer(answer: string, word: Word) {
        if (answer === word.czech) {
            setSelectedAnswer(true)
            console.log("Correct");
            // setIsCorrectAnswer(true);
            return true;
        } else {
            setSelectedAnswer(false)
            console.log("Incorrect");
            // setIsCorrectAnswer(false);
            return false;
        }
    }

    const renderExercises = () => {
        // const exercises = [];
        for (let i = 0; i < 8; i++) {
            return createExercise();
        }
        // return exercises;
      };

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
                {/* <Text>Welcome to practice {lessonid} {lessonname} </Text> */}
                {
                    showExercicse && (createExercise())
                    // renderExercises()
                }
            </SafeAreaView>
        </LinearGradient>
    )

}

const styleCustom = StyleSheet.create({
    answers:{
        flex:3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderRadius:50,
        backgroundColor:"white"
    },
    correctAnswer:{
        backgroundColor: 'lightgreen',
    },
    incorrectAnswer:{
        backgroundColor: 'red',
    },
    whiteBg:{
        backgroundColor: '#80b9ff',
        borderRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    
    },
    blurredBg: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20
    }
})
export default Exercise;
