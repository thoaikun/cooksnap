import Divider from "@/Components/Divider/Divider";
import { Recipe } from "@/Model/foodRecommendation";
import { Colors, FontSize } from "@/Theme/Variables";
import { extractIdFromUrl } from "@/Utils";
import { faXmark, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { UseMutationResult } from "@tanstack/react-query";
import { FlatList } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootScreens } from "..";
import { LocalizationKey, i18n } from "@/Localization";


interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void
  favoriteDishes: Recipe[] | undefined
  favoriteId: number
  isLoading: boolean
  deleteFavoriteMutation: UseMutationResult<any, Error, {
    listId: number;
    dishId: string;
}, unknown>
}

export const FavoriteDetail = ({ onNavigate, favoriteDishes, favoriteId, isLoading, deleteFavoriteMutation }: IProps) => {
  const [shownRecipes, setShownRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState<number>(1);
  
  const handleLoadMore = () => {
    if (!favoriteDishes)
      return
    if (page <= 0)
      return
    if (page > Math.ceil(favoriteDishes.length / 10))  
      return
    setPage(page + 1)
  }

  useEffect(() => {
    setShownRecipes(favoriteDishes?.slice(0, 10) || [])
  }, [favoriteDishes])
  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={Colors.PRIMARY} />
      </View>
    )
  }

  return (
    <>
      {
        shownRecipes?.length === 0 ?
          <View style={styles.emptyContainer}>
            <FontAwesomeIcon icon={faBoxOpen} size={50} color={Colors.BACKGROUND} />
            <Text style={{ fontSize: FontSize.SMALL }}>{i18n.t(LocalizationKey.NO_DISH_IN_LIST)}</Text>
          </View>
          :
          <FlatList 
            data={shownRecipes}
            onEndReached={handleLoadMore}
            renderItem={({ item }) => (
              <Pressable 
                style={styles.cardContainer}
                onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
              >
                <View style={styles.cardContent}>
                  <Image 
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 80, borderRadius: 10 }}
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={styles.cardText}
                  >
                    {item.label}
                  </Text>
                </View>
                {
                  deleteFavoriteMutation.variables?.dishId && deleteFavoriteMutation.variables.dishId === extractIdFromUrl(item.uri) && deleteFavoriteMutation.isPending ? 
                    <ActivityIndicator size='small' color={Colors.PRIMARY} />
                    :
                    <TouchableOpacity
                      onPress={() => {
                        let dishId = extractIdFromUrl(item.uri)
                        deleteFavoriteMutation.mutate({ listId: favoriteId, dishId })
                      }}
                      style={{ padding: 10 }}
                    >
                      <FontAwesomeIcon icon={faXmark} size={16} />
                    </TouchableOpacity>
                }
              </Pressable>
            )}
            ListFooterComponent={() => 
              page < Math.ceil(shownRecipes?.length / 10) ?
                <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size='large' color={Colors.PRIMARY} />
                </View>
                :
                null
            }
            ItemSeparatorComponent={() => <Divider />}
            showsVerticalScrollIndicator={false}
        />
      }
    </>
  );
};



const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  cardText: {
    fontSize: FontSize.SMALL,
    fontWeight: '500',
    maxWidth: 200
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15
  }
});