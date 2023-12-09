import React from "react";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import authenticationApi from "@/Services/authentication";
import { useMutation } from "@tanstack/react-query";
import { validateEmail } from "@/Utils";
import useInputController from "@/Components/Input/useInputController";

type ForgotPasswordScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.FORGOT_PASSWORD
>;

export const ForgotPasswordContainer = ({
  navigation,
}: ForgotPasswordScreenNavigatorProps) => {
  const [currentStep, setCurrentStep] = React.useState(0)
  const emailController = useInputController();
  const [error, setError] = React.useState<string>("");

  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: async (payload: { email: string }) => {
      setError("");
      if (!validateEmail(payload.email)) {
        throw new Error("Email is invalid");
      }

      return await authenticationApi.sendNewPassword(payload.email);
    },
    onSuccess: async (res) => {
      if (currentStep === 0)
        setCurrentStep(1)
    },
    onError: async (error: Error) => {
      setError(error.message);
    },
  });

  const steps = [
      <ForgotPasswordStep1 
        error={error}
        emailController={emailController}
        setCurrentStep={setCurrentStep} 
        forgotPasswordMutation={forgotPasswordMutation} 
      />,
      <ForgotPasswordStep2 
        onNavigate={onNavigate} 
        forgotPasswordMutation={forgotPasswordMutation}
        email={emailController.value}
      />,
  ]

  return steps[currentStep];
};
