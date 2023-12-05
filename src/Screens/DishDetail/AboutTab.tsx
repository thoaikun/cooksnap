import { View, Text, ScrollView } from "react-native"
import * as Progress from 'react-native-progress'
import styles from "./styles"
import { LocalizationKey, i18n } from "@/Localization"


const About = (props: any) => {
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
                            progress={23}
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
                            progress={50}
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
                            progress={10}
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
                            progress={80}
                            width={250}
                            height={15}
                            color={'#DD34AE'}
                            borderWidth={0}
                        />
                    </View>
                </View>
            </View>

            {/* Description section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{i18n.t(LocalizationKey.DESCRIPTION)}</Text>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionText}></Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{i18n.t(LocalizationKey.INGREDIENT)}</Text>
                
            </View>
        </ScrollView>
    )
}


export default About