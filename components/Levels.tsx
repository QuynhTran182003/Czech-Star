import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { supabase} from "../lib/supabase";
const LevelList = () => {
    const [levels, setLevels] = useState([]);
    useEffect(() => {
        getLevels();
    }, []);
    const getLevels = async () => {
        let { data: levels, error } = await supabase
            .from('level')
            .select('name');
        setLevels(levels);
    };
    
    return (
        <SafeAreaView>
        <Text>LevelList</Text>
        <FlatList
            data={levels}
            renderItem={({ item }) => (
                <View>
                    <TouchableOpacity onPress={()=> {Alert.alert(`${item.name}`)}}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            )}
            keyExtractor={(item) => item.id} />
        </SafeAreaView>
    );
}

export default LevelList;

const styles = StyleSheet.create({});
