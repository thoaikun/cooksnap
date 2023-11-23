import { RootScreens } from "@/Screens";
import { HomeContainer } from "@/Screens/Home/HomeContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RootStackParamList } from "..";

const Tab = createBottomTabNavigator();

type MainNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.MAIN
>;

// @refresh reset
export const MainNavigator = ({ route, navigation}: MainNavigatorProps) => {

  useEffect(() => {
    if (!route?.params)
      return

    const { previousScreen } = route.params
    navigation.addListener('beforeRemove', (e) => {
      if (previousScreen && previousScreen === 'onboarding')
        e.preventDefault()
    })
  })

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
    </Tab.Navigator>
  );
};
