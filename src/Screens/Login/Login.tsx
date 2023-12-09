import FilledButton from "@/Components/Button/FilledButton";
import TextButton from "@/Components/Button/TextButton";
import Input from "@/Components/Input/Input";
import { Colors, FontSize } from "@/Theme/Variables";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { RootScreens } from "..";
import { LocalizationKey, i18n } from "@/Localization";
import useInputController from "@/Components/Input/useInputController";
import { useMutation } from "@tanstack/react-query";
import authenticationApi from "@/Services/authentication";
import { useDispatch } from "react-redux";
import profileStore from "@/Store/reducers/profile";
import { IProfile } from "@/Model/profile";
import { validateConfirmPassword, validateEmail } from "@/Utils";
import userApi from "@/Services/user";
import base from "@/Services/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  onNavigate: (string: RootScreens, params?: any) => void;
}

export const Login = ({ onNavigate }: IProps) => {
  const [error, setError] = React.useState<string>('')
  const emailController = useInputController()
  const passwordController = useInputController()
  const dispatch = useDispatch()
  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string, password: string }) => {
      setError('')
      if (!validateEmail(payload.email)) {
        throw new Error('Email is invalid')
      }

      return await authenticationApi.authenticate(payload.email, payload.password)
    },
    onSuccess: async (res) => {
      dispatch(profileStore.actions.fetchAccessToken(res['access_token']))

      // update base instance headers
      base.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${res['access_token']}`;
        return config;
      })

      // set local storage
      await AsyncStorage.setItem('accessToken', res['access_token'])

      const profile: IProfile = await userApi.whoAmI()
      dispatch(profileStore.actions.fetchProfile(profile))

      onNavigate(RootScreens.MAIN)
    },
    onError: async (error: Error) => {
      setError(error.message)
    }
  })

  useEffect(() => {
    const isLogin = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken')
      const fistTimeOpenApp = await AsyncStorage.getItem('fistTimeOpenApp')
      console.log(accessToken, fistTimeOpenApp)
      if (accessToken) {
        dispatch(profileStore.actions.fetchAccessToken(accessToken))

        // update base instance headers
        base.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        })

        const profile: IProfile = await userApi.whoAmI()
        dispatch(profileStore.actions.fetchProfile(profile))

        if (!fistTimeOpenApp) {
          await AsyncStorage.setItem('fistTimeOpenApp', 'true')
          onNavigate(RootScreens.WELCOME)
        }
        else {
          onNavigate(RootScreens.MAIN)
        }
      }
    }
    isLogin()
    setError('')
  }, [])


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
          <Input 
            controller={emailController}
            label={i18n.t(LocalizationKey.EMAIL)} 
            prefix={<FontAwesomeIcon icon={faEnvelope} color={emailController.isFocused ? Colors.PRIMARY : Colors.BACKGROUND}/>}
          />
          <Input 
            controller={passwordController}
            label={i18n.t(LocalizationKey.PASSWORD)} 
            prefix={<FontAwesomeIcon icon={faKey} color={passwordController.isFocused ? Colors.PRIMARY : Colors.BACKGROUND}/>}
            type='password'
          />
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

        <View style={{ alignItems: 'flex-start' }}>
          {loginMutation.isPending && <ActivityIndicator size='large' color={Colors.PRIMARY} /> }
          {error && <Text style={{ color: Colors.ERROR }}>{error}</Text>}
        </View>

        <FilledButton 
          title={i18n.t(LocalizationKey.LOGIN).toUpperCase()}
          style={styles.loginButton}
          onPress={() => {
            loginMutation.mutate({
              email: emailController.value,
              password: passwordController.value,
            })
          }}
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
