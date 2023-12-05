import { RootStackParamList } from "@/Navigation";
import { BottomTabsParamList } from "@/Navigation/Main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens } from "..";
import Favorite from './Favorites';

type FavoritesScreenNavigatorProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, MainScreens.FAVORITE>,
  NativeStackScreenProps<RootStackParamList>
>;

export const FavoriteContainer = ({
  navigation,
}: FavoritesScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }

  return <Favorite onNavigate={onNavigate}/>;
}
