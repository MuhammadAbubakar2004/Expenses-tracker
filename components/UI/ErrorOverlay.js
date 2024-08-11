import { Button, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorOverlay({message, onConfirm}) {
    return <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An Error Occured !!</Text>
        <Text style={styles.text}>{message}</Text>
        <Button onPress={onConfirm} title="Okay" />
        </View>
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text:{
        textAlign:'center',
        marginBottom:8,
        color:'white',
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
    },
});
