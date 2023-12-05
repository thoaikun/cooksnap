import { Colors, FontSize } from "@/Theme/Variables"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { InputController } from "./useInputController"

interface IProps {
    label: string,
    placeholder?: string,
    prefix?: JSX.Element,
    controller?: InputController
    autoFocus?: boolean
}

const Input = ({
    label,
    placeholder,
    prefix,
    controller,
    autoFocus
}: IProps) => {
    return (
        <View 
            style={[
                styles.container,
                controller?.isFocused && styles.containerFocus
            ]}
        >
            {prefix}

            <View style={styles.inputContainer}>
                <Text style={[styles.label, controller?.isFocused && styles.labelFocus]}>
                    {label}
                </Text>
                <TextInput 
                    style={styles.input}
                    value={controller?.value}
                    onChangeText={controller?.setValue}
                    placeholder={placeholder}
                    onFocus={() => controller?.setIsFocused(true)}
                    onBlur={() => controller?.setIsFocused(false)}
                    autoFocus={autoFocus}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 15,

        paddingHorizontal: 15,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: Colors.BACKGROUND,
        borderRadius: 8
    },
    containerFocus: {
        borderColor: Colors.PRIMARY
    },
    inputContainer: {
        flex: 1
    },
    label: {
        fontSize: FontSize.EXTRA_SMALL,
        fontWeight: '500',
        color: Colors.SECONDARY_TEXT
    },
    labelFocus: {
        color: Colors.PRIMARY
    },
    input: {
        width: '100%',
        fontSize: FontSize.SMALL,
        fontWeight: '400',
    }
})

export default Input