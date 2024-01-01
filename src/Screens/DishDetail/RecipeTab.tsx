import { View, Text, ScrollView } from "react-native"
import styles from "./styles"
import { useEffect } from "react"
import { FontSize } from "@/Theme/Variables"

interface IProps {
    instructions?: String[]
}

const RecipeTab = ({ instructions }: IProps) => {

    useEffect(() => {
        console.log(instructions)
    }, [instructions])

    if (!instructions || !instructions?.length || instructions?.length === 0) {
        console.log('hii')
        return (
            <View style={[styles.tabBody, { flex: 1 , marginTop: 20}]}>
                <Text style={{ fontSize: FontSize.SMALL}}>No instructions available</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={[styles.tabBody, { paddingBottom: 30, rowGap: 20 }]}>
            {instructions?.map((instruction, index) => (
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