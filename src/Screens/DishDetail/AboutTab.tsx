import { View, Text, ScrollView } from "react-native"
import * as Progress from 'react-native-progress'
import styles from "./styles"


const About = (props: any) => {
    return (
        <ScrollView style={styles.tabBody}>
            {/* Nutrient section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nutrient</Text>
                <View style={styles.sectionContainer}>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            Calories
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={23}
                            width={250}
                            height={13}
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
                            Protein
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={50}
                            width={250}
                            height={13}
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
                            Carb
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={10}
                            width={250}
                            height={13}
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
                            Fat
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={80}
                            width={250}
                            height={13}
                            color={'#DD34AE'}
                            borderWidth={0}
                        />
                    </View>
                </View>
            </View>

            {/* Description section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionText}></Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recipe</Text>
                
            </View>
        </ScrollView>
    )
}


export default About