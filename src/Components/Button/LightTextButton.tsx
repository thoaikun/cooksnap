import { Colors, FontSize } from "@/Theme/Variables"
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native"

interface IProps {
    title: string
    onPress?: () => void,
    style?: StyleProp<ViewStyle>
    disabled?: boolean
}

const LightTextButton = ({ title, onPress, style, disabled }: IProps) => {
    return (
        <TouchableOpacity 
            style={[styles.container, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text 
                style={[
                    styles.text,
                    disabled && { color: Colors.BACKGROUND }
                ]}
            >
                {title}
            </Text>
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
        color: Colors.SECONDARY_TEXT,
        fontSize: FontSize.SMALL,
        fontWeight: '400'
    },
})

export default LightTextButton