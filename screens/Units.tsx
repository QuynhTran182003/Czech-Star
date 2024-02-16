import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";
import { BackgroundImage } from "./components/Image";
import { LinearGradient } from 'expo-linear-gradient';

function Units({ navigation, route }) {
    const { id, name, description } = route.params;
    const [units, setUnits] = useState([]);

    useEffect(() => {
        getUnitsByLevel(id);
    }, []);

    const getUnitsByLevel = async (id: any) => {
        let { data: units, error } = await supabase
            .from('unit')
            .select('id, name, icon')
            .order('id', { ascending: true })
            .eq('level_id', id);
        setUnits(units);
    };
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'rgba(180,45,255,1)' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    return (
        <LinearGradient
            // colors={['rgba(35,0,36,1)', 'rgba(9,31,121,1)', 'rgba(190,0,255,1)']}
            colors={['rgba(200,45,255,1)',
            'rgba(42,94,200,1)',
            'rgba(20,0,73,1)',]}
            start={[0, 0]} // Start point for the gradient, [0, 0] is the top-left corner
            end={[1, 1]} style={styles.linearGradient}
        >
            <SafeAreaView style={styles.template}>

                <View style={styleCustom.content}>
                    <Text >{id} {name} - {description}</Text>
                    <FlatList
                        data={units}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    style={[styles.marginY, styles.btn]}
                                    onPress={() => navigation.navigate('Lessons', { id: item.id, name: item.name })}
                                >
                                    <View style={[styleCustom.row]}>
                                        {/* <Image source={iconImages[item.icon]} style={[styleCustom.icon, styles.marginX]}/> */}
                                        <Image source={BackgroundImage.GetImage(`${item.icon}.png`)} style={[styleCustom.icon, styles.marginX]} />

                                        <Text style={[styles.bold, styles.subheading2]}>{item.id} {item.name}</Text>
                                    </View>
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

                <View style={styleCustom.buttonContainer}>
                    <TouchableOpacity style={[styles.btn, styles.padding2X, styles.paddingY]}>
                        <Text>Final Exam</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>

    );
}

export default Units;

const styleCustom = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
    },

    buttonContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 2,
    },

    icon: {
        width: 30,
        height: 30,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    unitBtn: {
        backgroundColor: '#37537d',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
});
