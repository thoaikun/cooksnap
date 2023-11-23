import { Colors, FontSize } from "@/Theme/Variables";
import { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Pressable, Animated } from "react-native"

interface IProps {
    title: string;
    onPress?: () => void
}

const FilledButton = ({ title, onPress }: IProps) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)

    return (
        <TouchableOpacity 
            style={[
                styles.container,
                isPressed && styles.containerPressed
            ]} 
            activeOpacity={1}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            
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
        backgroundColor: Colors.PRIMARY
    },
    containerPressed: {
        backgroundColor: Colors.PRIMARY_DARK
    },
    text: {
        color: Colors.WHITE,
        fontSize: FontSize.SMALL,
        fontWeight: '500'
    }
})

export default FilledButton