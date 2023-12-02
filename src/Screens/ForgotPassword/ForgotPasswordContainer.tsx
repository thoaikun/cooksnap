import React from "react";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";

type ForgotPasswordScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.FORGOT_PASSWORD
>;

export const ForgotPasswordContainer = ({
  navigation,
}: ForgotPasswordScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  };

  const [currentStep, setCurrentStep] = React.useState(0)
  const steps = [
      <ForgotPasswordStep1 setCurrentStep={setCurrentStep} />,
      <ForgotPasswordStep2 onNavigate={onNavigate} />,
  ]

  return steps[currentStep];
};
