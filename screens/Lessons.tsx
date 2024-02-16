import { FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import { LinearGradient } from "expo-linear-gradient";

function Lessons({ navigation, route }) {
    const { id, name } = route.params;
    const [file, setFile] = useState<{ publicUrl: string } | null>(null);
    const [lessons, setLessons] = useState([]);
    const windowWidth = Dimensions.get('window').width;
    const [showImage, setShowImage] = useState(false);
    useEffect(() => {
        getLessons(id);
        // getFile();
    }, []);

    const getLessons = async (id) => {
        let { data: lessons, error } = await supabase
            .from('lesson')
            .select('id, name')
            .eq('unit_id', id);
        setLessons(lessons)
            ;
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'rgba(134,0,180,1)' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    return (
        <LinearGradient
            // colors={['rgba(35,0,36,1)', 'rgba(9,31,121,1)', 'rgba(190,0,255,1)']}
            colors={['rgba(134,0,180,1)',
            'rgba(42,94,200,1)',
            'rgba(20,0,73,1)',]}
            start={[0, 0]} // Start point for the gradient, [0, 0] is the top-left corner
            end={[1, 1]} 
            style={styles.linearGradient}
        >
            <SafeAreaView style={styles.template}>
                <View>
                    <TouchableOpacity>
                        <Text>A list of lessions {id} {name}</Text>
                        {/* {file && <Image source={{ uri: file.publicUrl }} style={[styles.image, {width: windowWidth}]} resizeMode="contain" />}
                    {showImage && file && (
                    <Image
                        source={{ uri: file.publicUrl }}
                        style={[styles.image, {width: windowWidth}]}
                        resizeMode="cover"
                    />
                    )} */}


                    </TouchableOpacity>
                    <FlatList
                        data={lessons}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    style={[styles.marginY, styles.btn, styles.padding2X, styles.padding2Y]}
                                    onPress={() => navigation.navigate('Lesson', { id: item.id, name: item.name })}
                                >
                                    <Text style={[styles.white_text, styles.bold]}>{item.id} {item.name}</Text>
                                </TouchableOpacity>
                                {/* <Button  */}
                                {/* title={`${item.id} ${item.name} ${item.description}`} */}
                                {/* onPress={() => navigation.navigate('Units', { id:item.id, name: item.name, description: item.description })} */}
                                {/* /> */}
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />

                </View>
                <View>
                    <TouchableOpacity style={[styles.btn, styles.padding2X, styles.paddingY]}>
                        <Text style={[styles.white_text, styles.bold]}>Units Exam</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styleCustom = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    template: {
        flex: 1,
        backgroundColor: '#F5FCF5',
        color: 'white',
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 2,
    },
});

export default Lessons;
