import { Colors, FontSize } from "@/Theme/Variables"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

interface IProps {
    title: string
    onPress?: () => void,
}

const TextButton = ({ title, onPress }: IProps) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    text: {
        color: Colors.PRIMARY,
        fontSize: FontSize.SMALL,
        fontWeight: '500'
    },
})

export default TextButton