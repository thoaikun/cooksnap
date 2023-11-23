import { RootScreens } from "@/Screens";
import { FavoritesContainer } from "@/Screens/Favorites/FavoritesContainer";
import { HomeContainer } from "@/Screens/Home/HomeContainer";
import { ProfileContainer } from "@/Screens/Profile/ProfileContainer";
import { SearchContainer } from "@/Screens/Search/SearchContainer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RootStackParamList } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse"
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart"
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch"
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser"
import { Colors } from "@/Theme/Variables";
import TakeSnapButton from "@/Components/Button/TakeSnapButton";

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
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.BACKGROUND,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faHouse} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          )
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faHeart} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          )
        }}
      />
      <Tab.Screen
        name="Snap"
        component={SearchContainer}
        options={{
          tabBarIcon: (_) => (
            <TakeSnapButton />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faSearch} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faUser} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
