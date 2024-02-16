import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../lib/supabase";
import styles from "../style";

function LevelList({ navigation }) {
    const [levels, setLevels] = useState([]);
    useEffect(() => {
        getLevels();
    }, []);

    const getLevels = async () => {
        let { data: levels, error } = await supabase
            .from('level')
            .select('id, name, description')
            .order('id', { ascending: true });
        setLevels(levels);
    };
    
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'rgba(134,0,180,1)' },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['rgba(134,0,180,1)',
            'rgba(42,94,200,1)',
            'rgba(20,0,73,1)',]}
            start={[0, 0]} // Start point for the gradient, [0, 0] is the top-left corner
            end={[1, 1]} 
            style={styles.linearGradient}
        >
            <SafeAreaView style={styles.template}>

                <FlatList
                    data={levels}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.btn, styles.margin2Y, styles.margin2X, styles.padding2Y]}
                            onPress={() => navigation.navigate('Units', { id: item.id, name: item.name, description: item.description })}
                        >
                            <Text style={[styles.btn, styles.marginY, styles.margin2X, styles.padding2Y]}>{item.name} {item.description}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
                <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </SafeAreaView>
        </LinearGradient>

    );
}

export default LevelList;

const styleCustom = StyleSheet.create({
});
