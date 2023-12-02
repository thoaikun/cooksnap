import FilledButton from "@/Components/Button/FilledButton";
import TextButton from "@/Components/Button/TextButton";
import Input from "@/Components/Input/Input";
import { Colors, FontSize } from "@/Theme/Variables";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RootScreens } from "..";
import { LocalizationKey, i18n } from "@/Localization";

interface IProps {
  onNavigate: (string: RootScreens, params?: any) => void;
}

export const SignUp = ({ onNavigate }: IProps) => {
  return (
    <View style={{ height: Dimensions.get('window').height }}>
      <View style={styles.container}>
        <View style={{ rowGap: 5 }}>
          <Text style={styles.title}>
            {i18n.t(LocalizationKey.SIGN_UP)}
          </Text>
          <Text style={styles.quote}>
            {i18n.t(LocalizationKey.SIGN_UP_QUOTE)}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input label={i18n.t(LocalizationKey.EMAIL)} prefix={<FontAwesomeIcon icon={faEnvelope}/> } />
          <Input label={i18n.t(LocalizationKey.PASSWORD)} prefix={<FontAwesomeIcon icon={faKey} />}/>
          <Input label={i18n.t(LocalizationKey.CONFIRM_PASSWORD)} prefix={<FontAwesomeIcon icon={faLock} />}/>
        </View>

        <FilledButton 
          title={i18n.t(LocalizationKey.SIGN_UP).toUpperCase()}
          style={styles.signUpButton}
        />
      </View>

      <View style={styles.logInContainer}>
        <View
          style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
          }}
        >
          <Text>{i18n.t(LocalizationKey.HAVE_ACCOUNT)}</Text>
          <TextButton 
            title={i18n.t(LocalizationKey.LOGIN)}
            style={{
              paddingHorizontal: 5,
            }}
            onPress={() => onNavigate(RootScreens.LOGIN)}
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
    justifyContent: 'center',
    rowGap: 30,
  },
  title: {
    fontSize: FontSize.LARGE,
    fontWeight: 'bold',
  },
  quote: {
    fontSize: FontSize.SMALL,
    color: Colors.SECONDARY_TEXT
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
  },
  input: {
    alignItems: 'center',
    marginBottom: 15,
  },

  signUpButton: {
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

  logInContainer: {
    position: 'absolute',
    bottom: 10,
    left: Dimensions.get('window').width * 0.25
  },
})
