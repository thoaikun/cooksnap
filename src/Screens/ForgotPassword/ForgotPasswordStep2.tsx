import TextButton from '@/Components/Button/TextButton'
import { LocalizationKey, i18n } from '@/Localization'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { RootScreens } from '..'
import styles from './styles'
import FilledButton from '@/Components/Button/FilledButton'
import { UseMutationResult } from '@tanstack/react-query'

interface IProps {
    email: string
    onNavigate: (string: RootScreens, params?: any) => void;
    forgotPasswordMutation: UseMutationResult<any, Error, {
        email: string;
    }, unknown>
}

const ForgotPasswordStep2 = ({ onNavigate, email, forgotPasswordMutation }: IProps ) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [secondsToWait, setSecondsToWait] = useState(5);
  
    const handleButtonClick = () => {
      // Perform button click logic here
      console.log('Button clicked!');
      
      // Disable the button
      setIsButtonDisabled(true);
      setSecondsToWait(5);
  
      // Set the timeout for re-enabling the button
      setTimeout(() => {
        // Enable the button
        setIsButtonDisabled(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    };
  
    useEffect(() => {
      // Update the countdown timer every second
      const countdownInterval = setInterval(() => {
        if (secondsToWait > 0) {
          setSecondsToWait((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(countdownInterval);
    }, [secondsToWait]);

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
                    title={i18n.t(LocalizationKey.SEND_AGAIN) + `${secondsToWait ? ` (${secondsToWait}s)` : ''}`}
                    style={{
                        paddingVertical: 0,
                        paddingHorizontal: 5,
                    }}
                    disabled={isButtonDisabled}
                    onPress={() => {
                        handleButtonClick();
                        forgotPasswordMutation.mutate({ email })
                    }}
                />
            </View>
        </View>
    )
}

export default ForgotPasswordStep2
