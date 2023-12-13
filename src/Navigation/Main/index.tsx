import TakeSnapButton from "@/Components/Button/TakeSnapButton";
import { MainScreens, RootScreens } from "@/Screens";
import { FavoriteContainer } from "@/Screens/Favorites/FavoritesContainer";
import { HomeContainer } from "@/Screens/Home/HomeContainer";
import Placeholder from "@/Screens/Placeholder";
import { ProfileContainer } from "@/Screens/Profile/ProfileContainer";
import { SearchContainer } from "@/Screens/Search/SearchContainer";
import { Colors } from "@/Theme/Variables";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "..";
import { LocalizationKey, i18n } from "@/Localization";
import usePrepareData from "@/Hooks/usePrepareData";

const Tab = createBottomTabNavigator<BottomTabsParamList>();

export type BottomTabsParamList = {
  [MainScreens.HOME]: undefined;
  [MainScreens.FAVORITE]: undefined;
  [MainScreens.SNAP_PLACEHOLDER]: undefined;
  [MainScreens.SEARCH]: undefined;
  [MainScreens.PROFILE]: undefined;  
};


type MainNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.MAIN
>;

// @refresh reset
export const MainNavigator = ({ route, navigation}: MainNavigatorProps) => {
  const [currentScreen, setCurrentScreen] = useState('home')

  useEffect(() => {
    if (!route?.params)
      return

    const { previousScreen } = route.params
    navigation.addListener('beforeRemove', (e) => {
      if (previousScreen && previousScreen === 'onboarding')
        e.preventDefault()
    })
  }, [])


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.BACKGROUND,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name={MainScreens.HOME}
        component={HomeContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faHouse} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          ),
          title: i18n.t(LocalizationKey.HOME)
        }}
      />
      <Tab.Screen
        name={MainScreens.FAVORITE}
        component={FavoriteContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faHeart} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          ),
          title: i18n.t(LocalizationKey.FAVORITE)
        }}
      />
      <Tab.Screen
        name={MainScreens.SNAP_PLACEHOLDER}
        component={Placeholder}
        options={{
          tabBarIcon: (_) => (
            <TakeSnapButton />
          ),
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            if (currentScreen == 'Snap') {
              e.preventDefault()
              console.log('snap')
            }
          }
        }}
      />
      <Tab.Screen
        name={MainScreens.SEARCH}
        component={SearchContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faSearch} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          ),
          title: i18n.t(LocalizationKey.SEARCH)
        }}
      />
      <Tab.Screen
        name={MainScreens.PROFILE}
        component={ProfileContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon icon={faUser} size={20} color={focused ? Colors.PRIMARY : Colors.BACKGROUND} />
          ),
          title: i18n.t(LocalizationKey.PROFILE)
        }}
      />
    </Tab.Navigator>
  );
};
