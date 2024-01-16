import { FlatList, SafeAreaView, StyleSheet, Text, View , Button, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    template: {
        flex: 1,
        // backgroundColor: '#CED2C2',
        backgroundColor: '#ECDDD0',
        // backgroundColor: '#92b1b6',
    },
    text: {
        color: '#ffffff',
    },
    image: {
        height: 200,
    },

    btn:{
        // backgroundColor: '#4A686A
        // backgroundColor: '#35455D',
        // backgroundColor: '#416191',
        // backgroundColor: 'orange',
        backgroundColor: '#00bf30',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },

    marginY: {
        marginVertical: 10,
    },

    marginX: {
        marginHorizontal: 10,
    },

    paddingY: {
        paddingVertical: 10,
    },

    paddingX: {
        paddingHorizontal: 10,
    },

    padding2X: {
        paddingHorizontal: 20,
    },

    bold: {
        fontWeight: 'bold',
    },

    underline: {
        textDecorationLine: 'underline',
    },
});

export default styles;