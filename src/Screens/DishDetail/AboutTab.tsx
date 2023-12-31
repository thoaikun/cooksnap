import { View, Text, ScrollView } from "react-native"
import * as Progress from 'react-native-progress'
import styles from "./styles"
import { LocalizationKey, i18n } from "@/Localization"
import { NutrientTag, Recipe } from "@/Model/foodRecommendation"
import { useState } from "react"

interface IProps {
    dish: Recipe
}

const AboutTab = ({ dish }: IProps) => {
    const [calories, setCalories] = useState<number>(dish.calories)
    const [protein, setProtein] = useState<number | undefined>(dish.digest.find((item) => item.tag === NutrientTag.PROCNT)?.total)
    const [carb, setCarb] = useState<number | undefined>(dish.digest.find((item) => item.tag === NutrientTag.CHOCDF)?.total)
    const [fat, setFat] = useState<number | undefined>(dish.digest.find((item) => item.tag === NutrientTag.FAT)?.total)


    return (
        <ScrollView style={styles.tabBody}>
            {/* Nutrient section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{i18n.t(LocalizationKey.NUTRIENT)}</Text>
                <View style={styles.sectionContainer}>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            {i18n.t(LocalizationKey.CALORY)}
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={calories / 300}
                            width={250}
                            height={15}
                            color={'#E3A74D'}
                            borderWidth={0}
                        />
                    </View>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            {i18n.t(LocalizationKey.PROTEIN)}
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={protein ? protein / 300 : 0}
                            width={250}
                            height={15}
                            color={'#DC4040'}
                            borderWidth={0}
                        />
                    </View>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            {i18n.t(LocalizationKey.CARB)}
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={carb ? carb / 300 : 0}
                            width={250}
                            height={15}
                            color={'#3DC73A'}
                            borderWidth={0}
                        />
                    </View>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            {i18n.t(LocalizationKey.FAT)}
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={fat ? fat / 300 : 0}
                            width={250}
                            height={15}
                            color={'#DD34AE'}
                            borderWidth={0}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{i18n.t(LocalizationKey.INGREDIENT)}</Text>
                <View style={styles.sectionContainer}>
                    {dish?.ingredientLines && dish.ingredientLines.map((item, index) => (
                        <Text key={index} style={styles.sectionText}>
                            {item}
                        </Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}


export default AboutTab