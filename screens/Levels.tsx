import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { supabase} from "../lib/supabase";
import styles from "../style";

function LevelList({navigation}) {
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

    return (

        <SafeAreaView>
            <View>
                <FlatList
                    data={levels}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity 
                                style={[styles.marginY, styles.btn, styles.paddingY]}
                                onPress={() => navigation.navigate('Units', { id:item.id, name: item.name, description: item.description })}
                            >

                                <Text>{item.name} {item.description}</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                    keyExtractor={(item) => item.id} 
                />
            </View>
            

            <View>
                <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
        </SafeAreaView>
    );
}

export default LevelList;

const styleCustom = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    }
});
