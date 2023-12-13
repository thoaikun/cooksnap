import { View, Text, ScrollView } from "react-native"
import styles from "./styles"

interface IProps {
    instructions: String[]
}

const RecipeTab = ({ instructions }: IProps) => {
    if (instructions.length === 0) {
        return (
            <View style={styles.tabBody}>
                <Text style={styles.stepContent}>No instructions available</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={[styles.tabBody, { paddingBottom: 30, rowGap: 20 }]}>
            {instructions.map((instruction, index) => (
                <View style={styles.stepContainer} key={index}>
                    <View style={styles.stepOutlineBox}>
                        <View style={styles.stepInlineBox}>
                            <Text style={styles.stepText}>{index + 1}</Text>
                        </View>
                    </View>
                    <Text style={styles.stepContent}>{instruction}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

export default RecipeTab