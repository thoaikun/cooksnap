import FilledButton from "@/Components/Button/FilledButton";
import OutlinedButton from "@/Components/Button/OutlinedButton";
import TextButton from "@/Components/Button/TextButton";
import Input from "@/Components/Input/Input";
import { User } from "@/Services";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope'
import React from "react";
import { View } from "react-native";
import useInputController from "@/Components/Input/useInputController";
import { Colors } from "@/Theme/Variables";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const passwordController = useInputController()

  return (
    <View>
      <FilledButton title="Hello" />
      <TextButton title="Hiii" />
      <OutlinedButton title="Halloo" />
      
      <Input 
        controller={passwordController}
        label="Password"
        prefix={
          <FontAwesomeIcon 
            icon={faEnvelope} 
            size={22} 
            color={passwordController.isFocused ? Colors.PRIMARY : Colors.BACKGROUND} 
          />
        }
      />
    </View>
  );
};
