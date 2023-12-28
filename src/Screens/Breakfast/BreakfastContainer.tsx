import React from "react";
import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens } from "..";
import { Breakfast } from "./Breakfast";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { BottomTabsParamList } from "@/Navigation/Main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

type BreakfastScreenNavigatorProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, MainScreens.HOME>,
  NativeStackScreenProps<RootStackParamList>
>;

export const BreakfastContainer = ({ navigation }: BreakfastScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    console.log('navigate')
    navigation.navigate(screen, params);
  }

  const onBack = () => {
    console.log('back')
    navigation.navigate(MainScreens.HOME)
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBack
    )

    return () => backHandler.remove()
  }, [])
  
  return <Breakfast onNavigate={onNavigate}/>;
};
