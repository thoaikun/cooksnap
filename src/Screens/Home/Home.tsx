import FilledButton from "@/Components/Button/FilledButton";
import OutlinedButton from "@/Components/Button/OutlinedButton";
import TextButton from "@/Components/Button/TextButton";
import Card, { CardDirection } from "@/Components/Card/Card";
import Input from "@/Components/Input/Input";
import useInputController from "@/Components/Input/useInputController";
import { Colors } from "@/Theme/Variables";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View } from "react-native";


export const Home = () => {
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

      <Card 
        imageUrl="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D"
        title='Tên món ăn ở đây'
        subtitle="Mô tả món ăn ở đây nha, có handle overflow text òi nên không cần lo nữa ạ"
        direction={CardDirection.COLUMN}
        tail={
          <FontAwesomeIcon icon={faStar} color={Colors.ERROR} />
        }
      />

      <Card 
        imageUrl="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D"
        title='Tên món ăn ở đây'
        subtitle="Mô tả món ăn ở đây nha, có handle overflow text òi nên không cần lo nữa ạ"
        direction={CardDirection.ROW}
      />
    </View>
  );
};
