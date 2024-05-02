import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input ({label,invalid , maxLength, textInputConfig,style}) {

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    if(invalid) {
        inputStyles.push(styles.invalidInput)
    }

    return <View style={[styles.inputContainer, style]}>
        <Text  style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        {/* <TextInput keyboardType={type} maxLength={maxLength}/> */}
        <TextInput style={inputStyles} {...textInputConfig}/>
    </View>
}
export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical: 8,
        marginHorizontal: 4,
    },
    label:{
        fontSize: 12,
        color: GlobalStyles.colors.primary50,
        marginBottom: 4,
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        borderRadius: 6,
        fontSize: 18,
        padding: 6
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor:GlobalStyles.colors.error50,
    },
})