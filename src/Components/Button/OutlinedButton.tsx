import { Colors, FontSize } from "@/Theme/Variables"
import { useState } from "react"
import { Pressable, StyleSheet, Text } from "react-native"

interface IProps {
    title: string,
    onPress?: () => void
}

const OutlinedButton = ({ title, onPress }: IProps) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)

    return (
        <Pressable
            style={[
                styles.container,
                isPressed && styles.containerPressed
            ]}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 8,
        backgroundColor: Colors.TRANSPARENT
    },
    containerPressed: {
        backgroundColor: Colors.PRIMARY_LIGHT
    },
    text: {
        color: Colors.PRIMARY,
        fontSize: FontSize.SMALL,
        fontWeight: '500'
    }
})

export default OutlinedButton