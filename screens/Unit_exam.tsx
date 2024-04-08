import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Alert, Dimensions, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundImage } from "./components/Image";
import Word from "./classes/Word";


function UnitExam({ navigation, route }) {
    const { id, name } = route.params;
    const [listCards, setListCards] = useState([]);
    const [listQuiz, setListQuiz] = useState([]);
    const [currentIndexQuiz, setCurrentIndexQuiz] = useState(0);
    const [correctAns, setCorrectAns] = useState(0);
    const [incorrectAns, setIncorrectAns] = useState(0);
    const [showExercicse, setShowExercise] = useState(false);
    const [exerciseCreated, setExerciseCreated] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'rgba(134,0,180,1)' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    useEffect(() => {
        // Fetch cards from the database when the component mounts
        const fetchData = async () => {
            // set the listCards by calling this below method
            await getCardsFromDB(id);

            for (let i = 0; i < 15; i++) {
                listQuiz.push(getRandomWordFromDatabase);
            }
        // console.log(listQuiz);
        setShowExercise(true);
        setListQuiz(listQuiz);
        setExerciseCreated(true);
        }
        fetchData();
    }, []);

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
    function checkAnswer(answer: string, word: Word) {
        // setSelectedAnswer(answer);
        let res = false;
        if (answer === word.czech) {
            setCorrectAnswer(answer);
            setCorrectAns(correctAns+1);
            Alert.alert(
                'Correct Answer',
                'Good job!',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () =>
                    Alert.alert(
                      'This alert was dismissed by tapping outside of the alert dialog.',
                    ),
                },
              );

            
    
            res = true;
        } else {
            setIncorrectAns(incorrectAns+1);
    
            Alert.alert(
                'Wrong Answer',
                'The result is : ' + word.czech ,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () =>
                    Alert.alert(
                      'This alert was dismissed by tapping outside of the alert dialog.',
                    ),
                },
              );

            
            res = false;
        }
        UpdateQuiz();
        return res;
    }

    function UpdateQuiz(){
        console.log("Update exercise" + currentIndexQuiz + "/ " + listQuiz.length);
        if (currentIndexQuiz < listQuiz.length - 1){
            setCurrentIndexQuiz(currentIndexQuiz + 1);
        }
        else{
            // console.log("End of exercise");
            let procento = ((correctAns / (listQuiz.length)) * 100).toFixed(2);
            Alert.alert(
                procento + '%',
                'success: ' + correctAns + ', failure: ' + incorrectAns,
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () =>
                    Alert.alert(
                      'This alert was dismissed by tapping outside of the alert dialog.',
                    ),
                },
              );
              setShowExercise(false)
            // show score
            // show button to go back to lesson
        }
    }

    function createExercise() {
    // get random word from database
    // get incorrect answers
    // shuffle answers
        
        console.log("Create exercise");
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
                                ()=> {
                                     checkAnswer(item, word)
                                }
                            }
                            style={
                                [
                                    styleCustom.answers,
                                    styles.padding2X,
                                    styles.padding2Y,
                                    styles.marginY,
                                    styles.margin2X,
                                    // selectedAnswer === item ? (correctAnswer === item ? styleCustom.correctAnswer : styleCustom.incorrectAnswer) : null
                                    // selectedAnswer ? styleCustom.correctAnswer : styleCustom.incorrectAnswer // Apply green background if checkAnswer is true
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
    async function getCardsFromDB (id) {
        try {
            // First, query the lesson table to get the IDs of lessons belonging to the given unitId
            const { data: lessons, error: lessonError } = await supabase
                .from("lesson")
                .select("id")
                .eq("unit_id", id);
    
            if (lessonError) {
                throw lessonError;
            }
    
            // Extract the lesson IDs from the response
            const lessonIds = lessons.map(lesson => lesson.id);
    
            // Use the lesson IDs to fetch cards from the card table
            const { data: cards, error: cardError } = await supabase
                .from("card")
                .select("czech, vietnamese, picture")
                .in("lesson_id", lessonIds);
    
            if (cardError) {
                throw cardError;
            }
    
            // Set the fetched cards to state or handle them as needed
            setListCards(cards);
        } catch (error) {
            console.error("Error fetching cards:", error);
            // Handle error appropriately
        }
    }

    

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
                <Text>Welcome to practice {id} {name} </Text>
                <View>
                    {
                        exerciseCreated && showExercicse && (createExercise())

                    }
                </View>
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
export default UnitExam;
