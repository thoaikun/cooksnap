import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import Snap from "./Snap";
import { useEffect } from "react";

type SnapScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.SNAP
>; 

export const SnapContainer = ({ navigation }: SnapScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }
  
  return <Snap onNavigate={onNavigate}/>;
}
