import { View, Text, ScrollView } from "react-native"
import styles from "./styles"

const Recipe = (props: any) => {
    return (
        <ScrollView contentContainerStyle={styles.tabBody}>
            <Text>Recipe</Text>
        </ScrollView>
    )
}

export default Recipe