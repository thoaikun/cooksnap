import { Recipe } from "@/Model/foodRecommendation";
import { RootScreens } from "@/Screens";
import DishDetailContainer from "@/Screens/DishDetail/DishDetailContainer";
import FavoriteDetailContainer from "@/Screens/FavoriteDetail/FavoriteDetailContainer";
import { ForgotPasswordContainer } from "@/Screens/ForgotPassword/ForgotPasswordContainer";
import { LoginContainer } from "@/Screens/Login/LoginContainer";
import { SignUpContainer } from "@/Screens/SignUp/SignUpContainer";
import { SnapContainer } from "@/Screens/Snap/SnapContainer";
import { WelcomeContainer } from "@/Screens/Welcome/WelcomeContainer";
import { Colors } from "@/Theme/Variables";
import { DefaultTheme, NavigationContainer, Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import { MainNavigator } from "./Main";

export type RootStackParamList = {
  [RootScreens.MAIN]: {
    previousScreen?: string
  };
  [RootScreens.WELCOME]: undefined
  [RootScreens.LOGIN]: undefined
  [RootScreens.SIGN_UP]: undefined
  [RootScreens.FORGOT_PASSWORD]: undefined
  [RootScreens.SNAP]: undefined
  [RootScreens.FAVORITE_DETAIL]: {
    favoriteId: number
    favoriteName: string
  }
  [RootScreens.DISH_DETAIL]: {
    dish: Recipe
  }
};

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    background: 'white'
  },
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
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
        <RootStack.Screen
          name={RootScreens.SNAP}
          component={SnapContainer}
        />
        <RootStack.Screen
          name={RootScreens.FAVORITE_DETAIL}
          component={FavoriteDetailContainer}
          options={{
            headerShown: true,
          }}
        />
        <RootStack.Screen
          name={RootScreens.DISH_DETAIL}
          component={DishDetailContainer}
          options={{
            headerShown: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
