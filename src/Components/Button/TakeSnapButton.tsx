import { Colors } from "@/Theme/Variables"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera"
import { StyleSheet, View } from "react-native"

const TakeSnapButton = () => {
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon={faCamera} color={Colors.WHITE} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: Colors.PRIMARY,

        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        bottom: 15,
    }
})

export default TakeSnapButton