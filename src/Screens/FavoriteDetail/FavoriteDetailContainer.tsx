import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { RootScreens } from "..";
import { FavoriteDetail } from "./FavoriteDetail";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import foodApi from "@/Services/food";

type FavoritesScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.FAVORITE_DETAIL
>

const FavoriteDetailContainer = ({
  route,
  navigation,
}: FavoritesScreenNavigatorProps) => {
  const { favoriteId, favoriteName } = route.params
  const queryClient = useQueryClient()
  const { data: favoriteDishes, isLoading } = useQuery({
    queryKey: ['FAVORITE_DISHES', favoriteId],
    queryFn: async () => {
      return await foodApi.getFavoriteDishes(favoriteId)
    }
  })
  const deleteFavoriteMutation = useMutation({
    mutationFn: async (payload: { listId: number, dishId: string }) => {
        return foodApi.deleteDishFromFavorite(payload.listId, payload.dishId)
    },
    onSuccess: async (_) => {
        await queryClient.invalidateQueries({
            queryKey: ['FAVORITE_DISHES']
        })
    },
    onError: async (err) => {
        console.log(err)
    }
  })

  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }


  useEffect(() => {
    navigation.setOptions({
      headerTitle: favoriteName,
      headerBackTitle: ' ',
    })
  }, [navigation])

  return <FavoriteDetail 
    onNavigate={onNavigate} 
    favoriteDishes={favoriteDishes} 
    favoriteId={favoriteId}
    isLoading={isLoading} 
    deleteFavoriteMutation={deleteFavoriteMutation}
  />;
}

export default FavoriteDetailContainer;