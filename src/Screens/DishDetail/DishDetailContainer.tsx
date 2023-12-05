import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreens } from "..";
import DishDetail from "./DishDetail";
import { useEffect } from "react";

type SnapScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DISH_DETAIL
>; 

export const DishDetailContainer = ({ navigation }: SnapScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Dish Detail'
    })
  }, [])

  return <DishDetail />
}

export default DishDetailContainer