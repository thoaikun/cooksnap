import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome/WelcomeContainer";
import { RootScreens } from "@/Screens";
import { LoginContainer } from "@/Screens/Login/LoginContainer";
import { SignUpContainer } from "@/Screens/SignUp/SignUpContainer";
import { ForgotPasswordContainer } from "@/Screens/ForgotPassword/ForgotPasswordContainer";

export type RootStackParamList = {
  [RootScreens.MAIN]: {
    previousScreen?: string
  };
  [RootScreens.WELCOME]: undefined
  [RootScreens.LOGIN]: undefined
  [RootScreens.SIGN_UP]: undefined
  [RootScreens.FORGOT_PASSWORD]: undefined
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={ RootScreens.LOGIN }
      >
        <RootStack.Screen
          name={RootScreens.LOGIN}
          component={LoginContainer}
        />
        <RootStack.Screen
          name={RootScreens.SIGN_UP}
          component={SignUpContainer}
        />
        <RootStack.Screen
          name={RootScreens.FORGOT_PASSWORD}
          component={ForgotPasswordContainer}
        />
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
