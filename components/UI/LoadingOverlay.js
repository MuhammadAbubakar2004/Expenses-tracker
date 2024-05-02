import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function LoadingOverlay() {
    return <View style={styles.container}>
        <ActivityIndicator size='large' color='white'/>
    </View>
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});