import { LocalizationKey, i18n } from "@/Localization"
import { Image, StyleSheet } from "react-native"

interface IOnboarding {
    backgroundColor: string,
    image: JSX.Element,
    title: string,
    subtitle: string
}


const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    }
})

const onboardings: IOnboarding[] = [
    {
        backgroundColor: '#fff',
        image: <Image source={require('../../../assets/illustration/onboarding_1.png')} style={styles.image}/>,
        title: i18n.get(LocalizationKey.ONBOARDING_1).title,
        subtitle: i18n.get(LocalizationKey.ONBOARDING_1).description,
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../../../assets/illustration/onboarding_2.png')} style={styles.image}/>,
        title: i18n.get(LocalizationKey.ONBOARDING_2).title,
        subtitle: i18n.get(LocalizationKey.ONBOARDING_2).description,
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../../../assets/illustration/onboarding_3.png')} style={styles.image}/>,
        title: i18n.get(LocalizationKey.ONBOARDING_3).title,
        subtitle: i18n.get(LocalizationKey.ONBOARDING_3).description,
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../../../assets/illustration/onboarding_4.png')} style={styles.image}/>,
        title: i18n.get(LocalizationKey.ONBOARDING_4).title,
        subtitle: i18n.get(LocalizationKey.ONBOARDING_4).description,
    },
]


export default onboardings