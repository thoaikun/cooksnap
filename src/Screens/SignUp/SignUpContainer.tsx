import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootScreens } from "..";
import { SignUp } from "./SignUp";

type SignUpScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.SIGN_UP
>;

export const SignUpContainer = ({
  navigation
}: SignUpScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }

  return <SignUp onNavigate={onNavigate}/>;
}