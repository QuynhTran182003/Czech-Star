// import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View , Image, Dimensions, Animated, PanResponder} from "react-native";
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { supabase } from "../lib/supabase";
// import styles from "../style";
// import {useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, withTiming} from "react-native-reanimated";
// // import { PanGestureHandler, PanGestureHandlerGestureEvent, GestureHandlerRootView } from "react-native-gesture-handler";
// // import { screensEnabled } from "react-native-screens";
// // import MyCard from "./MyCard"

// // import Footer from './Footer';


// const SIZE_CARD = 150;
// const CIRCLE_RADIUS = SIZE_CARD * 0.3;
// const {width, height} = Dimensions.get('screen');

// function Lesson({navigation, route}) {
//     const { id, name } = route.params;
//     const [file, setFile] = useState<{ publicUrl: string } | null>(null);
//     const [showImage, setShowImage] = useState(false);
//     const [listCards, setListCards] = useState([]);

//     const translateX = useSharedValue(0);
//     const translateY = useSharedValue(0);

//     const swipe = useRef(new Animated.ValueXY()).current;
//     const titlSign = useRef(new Animated.Value(1)).current;
//     const panResponder = PanResponder.create({
//         // Allow pan responder to activate
//         onMoveShouldSetPanResponder: ()=>true,
    
//         // Handle card movement while dragging
//         onPanResponderMove: (_, {dx, dy, y0})=>{
//             swipe.setValue({x: dx, y: dy});
//             titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
//         },
   
//         // Handle card release after dragging
//         onPanResponderRelease: (_, { dx, dy })=>{
//         const direction = Math.sign(dx);
//         const isActionActive = Math.abs(dx) > 100;
//         let remember = 0;

//         if(isActionActive)
//         {   // Swipe the card off the screen
//             // animation 
//             Animated.timing(swipe, {
//                 duration: 100,
//                 toValue: {
//                     x: direction * 500,
//                     y: dy
//                 },
//                 useNativeDriver: true
//             }).start(removeTopCard);

//             //logic handler
            
//             if (direction === 1) {
//                 const length = listCards.length;
//                 remember = remember + 1;
//                 console.log("remember +1");
//                 if(remember === length) {
//                     return 
//                     (<TouchableOpacity style={styles.btn}>
//                     <Text style={styles.text}>Practice Now</Text>
//                     </TouchableOpacity>)
//                 }
//             } else console.log("revise")
//         } 
//         else
//         {   // Return the card to its original position
//             Animated.spring(swipe, {
//                 toValue: {
//                 x: 0,
//                 y: 0
//                 },
//                 useNativeDriver: true,
//                 friction: 5
//             }).start()
//         }
//         }  
// })

//      const removeTopCard = useCallback(()=>{
//         setListCards((currState)=> currState.slice(1));
//         swipe.setValue({ x: 0, y: 0});
//       },[swipe]);
    
//       // handle user choice (left or right swipe)
//       const handleChoice = useCallback((direction)=>{
//         Animated.timing(swipe.x, {
//           toValue: direction  * 500,
//           duration: 400,
//           useNativeDriver: true
//         }).start(removeTopCard);
//       },[removeTopCard,swipe.x]);

//     useEffect(() => {
//         getCardsFromDB(id);
//         getFile();
//     }, []);


//     const getFile = async () => {
//         try {
//             let { data: file, error } = await supabase
//                 .from('lesson')
//                 .select('file')
//                 .eq('', id)
//             // console.log(fileName);
//             const { data } = await supabase
//                 .storage
//                 .from("files")
//                 .getPublicUrl(`${file[0].file}`);
//             if (data) {
//                 setFile(data);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     // const handleImagePress = () => {
//     //     setShowImage(!showImage);
//     // };
//     // const getFileName = () => {
//     //     if (file) {
//     //         const fileName = file.publicUrl.substring(file.publicUrl.lastIndexOf("/") + 1);
//     //         return fileName;
//     //     }
//     //     return "";
//     // };
    

//     const getCardsFromDB = async (lesson_id: any) => {
//         let { data: cards, error } = await supabase
//           .from('card')
//           .select('czech, vietnamese')
//           .eq('lesson_id', lesson_id);
          
//         // console.log("card", cards);
//         setListCards(cards);
//     };

        
//     const rstyle = useAnimatedStyle(() => {
//         return {
//           transform: [
//             { translateX: translateX.value },
//             { translateY: translateY.value },
//             ],
//         };
//     });

//     return (
//         <SafeAreaView style={styles.template}>
//             <Text>{id} - {name}</Text>
//             {
//                 listCards.map(({czech, vietnamese, picture}, index) => {
//                     const isFirst = index === 0;
//                     const dragHandlers = isFirst ? panResponder.panHandlers : {};
//                     return (
//                         <MyCard 
//                             key={czech}
//                             czech={czech}
//                             vietnamese={vietnamese}
//                             picture={picture}
//                             isFirst={isFirst}
//                             swipe={swipe}
//                             titlSign={titlSign}
//                             {... dragHandlers}
//                         />
//                     )
//                 }
//                 ).reverse()
//             }

            
//             <Footer handleChoice={handleChoice} />
        
//             {/* <View style={styleCustom.btnContainer}>
//                 <View style={[styles.paddingX, styleCustom.btnContainer]}>
//                     <Text style={[styles.bold, styles.paddingX, styles.marginY]}>Attachment</Text>
//                     <TouchableOpacity onPress={handleImagePress}>
//                         <Text style={[styles.underline, styles.padding2X]}>{getFileName()}</Text>
//                         {showImage && file && (
//                             <Image
//                                 source={{ uri: file.publicUrl }}
//                                 style={[styles.image, { width: windowWidth }]}
//                                 resizeMode="contain"
//                             />
//                         )}
//                     </TouchableOpacity>
//                 </View>

                
//             </View> */}
//         </SafeAreaView>
//     );
// }

// const styleCustom = StyleSheet.create({
//     btnContainer: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         marginBottom: 2,
//     },
//     card: {
//         // backgroundColor: '#92B1B6',
//         backgroundColor: '#bfd1df',
//         borderRadius: 10,
//         padding: 20,
//         margin: 10,
//         shadowColor: '#000000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//         elevation: 2,
//         width: SIZE_CARD,
//         height: SIZE_CARD,
//         },

//     meaning: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     slide: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#9DD6EB',
//     },
//     text: {
//         color: '#000000',
//         fontSize: 30,
//         fontWeight: 'bold',
//     },
//     circle: {
//         width: CIRCLE_RADIUS*1.1,
//         height: CIRCLE_RADIUS*1.1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: CIRCLE_RADIUS,
//         borderWidth: 2,
//         borderColor: '#bfd1df',
//     },
//     // dummySquare: {
//     //     width: 100,
//     //     height: 100,
//     //     backgroundColor: 'red',
//     //     borderRadius: 20,
//     // },
// });

// export default Lesson;


