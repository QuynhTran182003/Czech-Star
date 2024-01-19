import {FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Dimensions, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";

function Lessons({navigation, route }) {
    const { id , name} = route.params;
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

    
    return (
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
                                    style={[styles.marginY, styles.btn]}
                                    onPress={() => navigation.navigate('Lesson', { id: item.id, name: item.name })}
                                >
                                    <Text style={[styles.text, styles.bold]}>{item.id} {item.name}</Text>
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
            <View style={styleCustom.btnContainer}>
            <TouchableOpacity style={styles.btn}>
                    <Text style={[styles.text,styles.bold]}>Units Exam</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styleCustom = StyleSheet.create({
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
