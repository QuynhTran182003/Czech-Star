import { FlatList, SafeAreaView, StyleSheet, Text, View , Button, TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    template: {
        flex: 1,
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
    },
    white_text: {
        color: '#ffffff',
    },
    black_text: {
        color: '#000000',
    },
    bold_text: {
        fontWeight: 'bold',
    },
    header:{
        fontSize: 32,
    },
    subheading:{
        fontSize: 20,
    },
    subheading2:{
        fontSize: 18,
    },
    image: {
        height: 200,
    },
    btn:{
        backgroundColor: '#80b9ff',
        // alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    bottom:{
        position: 'relative',
        bottom: 0,
    },
    borderBot:{
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderStyle: 'solid',
    },

    marginY: {
        marginVertical: 10,
    },
    margin2Y: {
        marginVertical: 20,
    },

    marginX: {
        marginHorizontal: 10,
    },
    margin2X: {
        marginHorizontal: 20,
    },

    paddingY: {
        paddingVertical: 10,
    },
    
    padding2Y: {
        paddingVertical: 20,
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