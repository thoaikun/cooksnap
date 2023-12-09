import { CompositeScreenProps } from "@react-navigation/native";
import { Profile } from "./Profile";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "@/Navigation";
import { BottomTabsParamList } from "@/Navigation/Main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens } from "..";

type FavoritesScreenNavigatorProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, MainScreens.PROFILE>,
  NativeStackScreenProps<RootStackParamList>
>;

export const ProfileContainer = ({
  navigation,
}: FavoritesScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }

  return <Profile onNavigate={onNavigate} />; 
}
