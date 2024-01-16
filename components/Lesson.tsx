import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View , Image, Dimensions, Linking} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "../style";

function Lesson({route}) {
    const { id } = route.params;
    const [file, setFile] = useState<{ publicUrl: string } | null>(null);
    const windowWidth = Dimensions.get('window').width;
    const [showImage, setShowImage] = useState(false);
    useEffect(() => {
        // getLessons(id);
        getFile();
    }, []);

    // const getLessons = async (id) => {
    //     let { data: lessons, error } = await supabase
    //         .from('lesson')
    //         .select('id, name')
    //         .eq('unit_id', id);
    //     return lessons;
    // }

    const getFile = async () => {
        try {
            let { data: file, error } = await supabase
                .from('lesson')
                .select('file')
                .eq('', id)
            // console.log(fileName);
            const { data } = await supabase
                .storage
                .from("files")
                .getPublicUrl(`${file[0].file}`);
            if (data) {
                setFile(data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleImagePress = () => {
        setShowImage(!showImage);
    };
    const getFileName = () => {
        if (file) {
            const fileName = file.publicUrl.substring(file.publicUrl.lastIndexOf("/") + 1);
            return fileName;
        }
        return "";
    };
    return (
    <View style={styles.template}>

        <SafeAreaView style={styles.template}>
            <View>
                <TouchableOpacity>
                    <Text style={styles.text}>This is gonna be content of the lesson</Text>
                </TouchableOpacity>
                

            </View>
            <View style={styleCustom.btnContainer}>
                <View style={[styles.paddingX , styleCustom.btnContainer]}>
                    <Text style={[styles.bold, styles.paddingX, styles.marginY]}>Attachment</Text>
                    <TouchableOpacity onPress={handleImagePress}>
                        <Text style={[styles.underline, styles.padding2X]}>{getFileName()}</Text>
                        {showImage && file && (
                        <Image
                            source={{ uri: file.publicUrl }}
                            style={[styles.image, {width: windowWidth}]}
                            resizeMode="contain"
                        />
                        )}
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.text}>Practice Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    </View>
    );

}

const styleCustom = StyleSheet.create({
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 2,
    },
});

export default Lesson;
