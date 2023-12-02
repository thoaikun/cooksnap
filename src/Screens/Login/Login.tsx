import FilledButton from "@/Components/Button/FilledButton";
import TextButton from "@/Components/Button/TextButton";
import Input from "@/Components/Input/Input";
import { FontSize } from "@/Theme/Variables";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { RootScreens } from "..";
import { LocalizationKey, i18n } from "@/Localization";

interface IProps {
  onNavigate: (string: RootScreens, params?: any) => void;
}

export const Login = ({ onNavigate }: IProps) => {
  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
              style={styles.logo}
              source={require('../../../assets/logo.png')}
          />
        </View>

        <Text style={[styles.title]}>
          {i18n.t(LocalizationKey.LOGIN)}
        </Text>

        <View style={styles.inputContainer}>
          <Input label={i18n.t(LocalizationKey.EMAIL)} prefix={<FontAwesomeIcon icon={faEnvelope} />}/>
          <Input label={i18n.t(LocalizationKey.PASSWORD)} prefix={<FontAwesomeIcon icon={faKey} />} />
        </View>

        <TextButton
            title={i18n.t(LocalizationKey.FORGOT_PASSWORD)}
            style={{
                alignSelf: 'flex-end',
                paddingHorizontal: 0,
                paddingTop: 0,
            }}
            onPress={() => onNavigate(RootScreens.FORGOT_PASSWORD)}
        />

        <FilledButton 
          title={i18n.t(LocalizationKey.LOGIN).toUpperCase()}
          style={styles.loginButton}
        />
      </View>

      <View style={styles.signUpContainer}>
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
          <Text>{i18n.t(LocalizationKey.DO_NOT_HAVE_ACCOUNT)}</Text>
          <TextButton 
            title={i18n.t(LocalizationKey.SIGN_UP)}
            style={{
              paddingHorizontal: 5,
            }}
            onPress={() => onNavigate(RootScreens.SIGN_UP)}
          />
        </View>
      </View>
    </View>
  ) 
};

const styles = StyleSheet.create({
    container: {
      marginTop: Dimensions.get('window').height * 0.1,
      marginHorizontal: 20,
      justifyContent: 'flex-start',
      rowGap: 15,
    },
    logoContainer: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    title: {
      fontSize: FontSize.LARGE,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: 15,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        columnGap: 10,
    },
    loginButton: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },

    focusPassContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
    },

    signUpContainer: {
      position: 'absolute',
      bottom: 10,
      left: Dimensions.get('window').width * 0.25
    },
})
