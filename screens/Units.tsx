import { FlatList, SafeAreaView, StyleSheet, Text, View , Image, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";


import calendar_white from '../assets/icons/calendar_white.png';
import numbers_white from '../assets/icons/numbers_white.png';
import favicon from '../assets/icons/favicon.png';


function Units({navigation, route}) {
    const { id, name, description } = route.params;
    const [units, setUnits] = useState([]);
    // const [icon, setIcon] = useState([]);
    
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

    const iconImages = {
        calendar_white: calendar_white,
        numbers_white: numbers_white,
        favicon: favicon,
    };

    return (
        <SafeAreaView style={styles.template}>
            <View style={styleCustom.content}>
                <Text >{id} {name} - {description}</Text>
                <FlatList
                    data={units}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity 
                                style={[styles.marginY, styleCustom.unitBtn]}
                                onPress={() => navigation.navigate('Lessons', { id:item.id, name: item.name })}
                            >
                                <View style={[styleCustom.row]}>
                                    <Image source={iconImages[item.icon]} style={[styleCustom.icon, styles.marginX]}/>

                                    <Text style={[styles.text]}>{item.id} {item.name}</Text>
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
                <TouchableOpacity style={styles.btn}>
                        <Text>Final Exam</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
}

export default Units;

const styleCustom = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
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
