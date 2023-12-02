import TextButton from '@/Components/Button/TextButton'
import { LocalizationKey, i18n } from '@/Localization'
import React from 'react'
import { Text, View } from 'react-native'
import { RootScreens } from '..'
import styles from './styles'
import FilledButton from '@/Components/Button/FilledButton'

interface IProps {
    onNavigate: (string: RootScreens, params?: any) => void;
}

const ForgotPasswordStep2 = ({ onNavigate }: IProps ) => {
    return (
        <View style={styles.container}>
            <View style={{ rowGap: 5 }}>
                <Text style={styles.title}>
                    {i18n.t(LocalizationKey.CHECK_YOUR_EMAIL)}
                </Text>
                <Text style={styles.step}>
                    {i18n.t(LocalizationKey.FORGOT_PASSWORD_STEP_2)}
                </Text>
                <Text style={styles.description}>
                    {i18n.t(LocalizationKey.EMAIL_SENT)}  
                </Text>
            </View>
            <FilledButton 
                title={i18n.t(LocalizationKey.LOGIN).toUpperCase()}
                style={styles.button}
                onPress={() => onNavigate(RootScreens.LOGIN)}
            />
            <View style={styles.sendAgain}>
                <Text style={styles.step}>
                    {i18n.t(LocalizationKey.DO_NOT_HAVE_EMAIL)}
                </Text>
                <TextButton 
                    title={i18n.t(LocalizationKey.SEND_AGAIN)}
                    style={{
                        paddingVertical: 0,
                        paddingHorizontal: 5,
                    }}
                />
            </View>
        </View>
    )
}

export default ForgotPasswordStep2
