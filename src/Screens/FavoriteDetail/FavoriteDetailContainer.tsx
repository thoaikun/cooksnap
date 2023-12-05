import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainScreens, RootScreens } from "..";
import { FavoriteDetail } from "./FavoriteDetail";
import { useEffect } from "react";
import FilledButton from "@/Components/Button/FilledButton";
import { LocalizationKey, i18n } from "@/Localization";

type FavoritesScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.FAVORITE_DETAIL
>

const FavoriteDetailContainer = ({
  navigation,
}: FavoritesScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'My list',
      headerBackTitle: ' ',
      headerRight: () => (
        <FilledButton
          title={i18n.t(LocalizationKey.ADD_DISH)}
          style={{ paddingVertical: 5 }}
        />
      )
    })
  }, [navigation])

  return <FavoriteDetail />;
}

export default FavoriteDetailContainer;