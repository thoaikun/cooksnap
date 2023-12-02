import React from "react";
import { SignUp } from "./SignUp";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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

  return <SignUp onNavigate={onNavigate} />;
}