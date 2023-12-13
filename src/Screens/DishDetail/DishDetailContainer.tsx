import FilledButton from "@/Components/Button/FilledButton";
import TextButton from "@/Components/Button/TextButton";
import Input from "@/Components/Input/Input";
import useInputController from "@/Components/Input/useInputController";
import useFavorite from "@/Hooks/useFavorite";
import { LocalizationKey, i18n } from "@/Localization";
import { Recipe } from "@/Model/foodRecommendation";
import { RootStackParamList } from "@/Navigation";
import { Colors, FontSize } from "@/Theme/Variables";
import { extractIdFromUrl } from "@/Utils";
import { faAdd, faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootScreens } from "..";
import DishDetail from "./DishDetail";
import foodApi from "@/Services/food";

type SnapScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.DISH_DETAIL
>; 

export const DishDetailContainer = ({ route, navigation }: SnapScreenNavigatorProps) => {
  const dish: Recipe = route.params.dish
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isModalAddVisible, setModalAddVisible] = useState<boolean>(false);
  const [inFavoriteList, setInFavoriteList] = useState<number[]>([]);
  const listInputController = useInputController();
  const queryClient = useQueryClient()
  const {
    error,
    favorites,
    favoriteMutation,
    addDishToFavoriteMutation
  } = useFavorite(listInputController, () => setModalAddVisible(false))

  const isInYourFavorite = async (dishId: string) => {
    dishId = dishId.replace('#', '')
    const result = await foodApi.isDishInFavorite(dishId)

    const favoriteListIds = result?.favoriteListIds
    if (favoriteListIds) {
      let ids = favoriteListIds.map((favoriteList: any) => favoriteList?.[1])
      setInFavoriteList(ids)
    }
  }

  const onNavigate = (screen: RootScreens, params?: any) => {
    navigation.navigate(screen, params);
  }
  
  useEffect(() => {
    isInYourFavorite(extractIdFromUrl(dish.uri))

    navigation.setOptions({
      title: dish.label,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          <FontAwesomeIcon 
            icon={faHeart} 
            size={20} 
            color={!inFavoriteList ? Colors.BACKGROUND : Colors.ERROR} 
          />
        </TouchableOpacity>
      )
    })
  }, [dish])

  useEffect(() => {
    navigation.setOptions({
      title: dish.label,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          <FontAwesomeIcon 
            icon={faHeart} 
            size={20} 
            color={!inFavoriteList.length ? Colors.BACKGROUND : Colors.ERROR} 
          />
        </TouchableOpacity>
      )
    })
  }, [inFavoriteList])

  const renderAddToListButton = (favoriteListId: number) => {
    const isLiked = inFavoriteList.includes(favoriteListId)
    if (addDishToFavoriteMutation.variables?.listId && addDishToFavoriteMutation.variables.listId == favoriteListId && addDishToFavoriteMutation.isPending)
      return <ActivityIndicator size='small' color={Colors.PRIMARY} />
    else if (addDishToFavoriteMutation.variables?.listId && addDishToFavoriteMutation.variables.listId == favoriteListId && addDishToFavoriteMutation.isSuccess)
      return <FontAwesomeIcon icon={faCheck} size={16} color={Colors.SUCCESS} />
    else if (isLiked)
      return <FontAwesomeIcon icon={faCheck} size={16} color={Colors.PRIMARY} />
    else
      return <FontAwesomeIcon icon={faAdd} size={16} color={Colors.BLACK} />
  }

  return (
    <>
      <Modal animationType="fade" transparent visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Pressable onPress={() => setModalVisible(false)} style={styles.overlay} />
          <View style={styles.content}>
            {favorites.length !== 0 && favorites.map((favorite, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listItemText} numberOfLines={1} ellipsizeMode='tail'>
                  {favorite.listName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (inFavoriteList.includes(favorite.id))
                      return
                    
                    setInFavoriteList([...inFavoriteList, favorite.id])
                    addDishToFavoriteMutation.mutate({
                      listId: favorite.id,
                      dishId: extractIdFromUrl(dish.uri),
                      dishName: dish.label,
                    })
                  }}
                >
                  {renderAddToListButton(favorite.id)}
                </TouchableOpacity>
              </View>
            ))}
            {favorites.length === 0 && <Text>{i18n.t(LocalizationKey.NO_FAVORITE_LIST)}</Text>}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TextButton 
                title={i18n.t(LocalizationKey.ADD_NEW_LIST)}
                style={{ paddingHorizontal: 0 }}
                onPress={() => setModalAddVisible(true)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent visible={isModalAddVisible}>
        <View style={styles.modalContainer}>
          <Pressable onPress={() => setModalAddVisible(false)} style={styles.overlay} />
          <View style={styles.content}>
            <Text style={styles.modalTitle}>{i18n.t(LocalizationKey.ADD_NEW_LIST)}</Text>
            <Input 
              controller={listInputController}
              label={i18n.t(LocalizationKey.YOUR_LIST_NAME)}
              postfix={favoriteMutation.isPending ? <ActivityIndicator size='large' color={Colors.PRIMARY} /> : undefined}
              autoFocus
            />
            <View style={{ alignItems: 'flex-start' }}>
              {error && <Text style={{ color: Colors.ERROR }}>{error}</Text>}
            </View>
            <View style={styles.modalButtonContainer}>
              <TextButton
                title={i18n.t(LocalizationKey.CANCEL)}
                onPress={() => setModalAddVisible(false)}
              />
              <FilledButton
                title={i18n.t(LocalizationKey.CREATE)}
                onPress={() => {
                  favoriteMutation.mutate({ listName: listInputController.value })
                  queryClient.invalidateQueries({
                    queryKey: ['FAVORITE_LIST']
                  })
                }}
              />
            </View>
          </View> 
        </View>
      </Modal>
      <DishDetail dish={dish} />
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    rowGap: 10
  },
  modalTitle: {
    fontSize: FontSize.REGULAR,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  listItemText: {
    fontWeight: '500',
    fontSize: FontSize.SMALL
  }
})

export default DishDetailContainer