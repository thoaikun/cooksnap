import React from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import styles from './styles'
import Input from '@/Components/Input/Input'
import FilledButton from '@/Components/Button/FilledButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { LocalizationKey, i18n } from '@/Localization'
import { UseMutationResult } from '@tanstack/react-query'
import { Colors } from '@/Theme/Variables'
import useInputController, { InputController } from '@/Components/Input/useInputController'

interface IProps {
    error?: string
    emailController: InputController
    setCurrentStep: (step: number) => void
    forgotPasswordMutation: UseMutationResult<any, Error, {
        email: string;
    }, unknown>
}

const ForgotPasswordStep1 = ({ error, emailController, setCurrentStep, forgotPasswordMutation }: IProps): JSX.Element => {
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
                        controller={emailController}
                        label={i18n.t(LocalizationKey.EMAIL)}
                        prefix={<FontAwesomeIcon icon={faEnvelope} color={emailController.isFocused ? Colors.PRIMARY : Colors.BACKGROUND}/>}
                    />
                </View>
                <View style={{ alignSelf: 'flex-start', justifyContent: 'flex-start', alignItems: 'center' }}>
                    {forgotPasswordMutation.isPending && <ActivityIndicator size='large' color={Colors.PRIMARY} />}
                    {error && <Text style={styles.error}>{error}</Text>}
                </View>
            </View>
            <FilledButton 
                title={i18n.t(LocalizationKey.VERIFY).toUpperCase()}
                onPress={() => {
                    forgotPasswordMutation.mutate({ email: emailController.value })
                }}
                style={styles.button}
            />
        </View>
    )
}

export default ForgotPasswordStep1
