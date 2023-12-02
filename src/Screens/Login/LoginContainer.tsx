import React from "react";
import { Login } from "./Login";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.LOGIN
>;

export const LoginContainer = ({
  navigation
}: LoginScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }

  return <Login onNavigate={onNavigate} />;
};
