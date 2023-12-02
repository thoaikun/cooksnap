import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import styles from './styles'
import Input from '@/Components/Input/Input'
import FilledButton from '@/Components/Button/FilledButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { LocalizationKey, i18n } from '@/Localization'

interface IProps {
    setCurrentStep: (step: number) => void
}

const ForgotPasswordStep1 = ({ setCurrentStep }: IProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={{ rowGap: 5 }}>
                <Text style={styles.title}>
                    {i18n.t(LocalizationKey.FORGOT_PASSWORD)}
                </Text>
                <Text style={styles.step}>
                    {i18n.t(LocalizationKey.FORGOT_PASSWORD_STEP_1)}
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <Input
                       label={i18n.t(LocalizationKey.EMAIL)}
                       prefix={<FontAwesomeIcon icon={faEnvelope} />}
                    />
                </View>
            </View>
            <FilledButton 
                title={i18n.t(LocalizationKey.VERIFY).toUpperCase()}
                onPress={() => setCurrentStep(1)}
                style={styles.button}
            />
        </View>
    )
}

export default ForgotPasswordStep1
