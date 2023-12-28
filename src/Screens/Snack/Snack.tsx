import axios from "axios"

import Card, { CardDirection } from "@/Components/Card/Card";
import { Recipe } from '@/Model/foodRecommendation';
import foodApi from '@/Services/food';
import { Colors, FontSize } from "@/Theme/Variables";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View } from "react-native";

import { RootScreens } from '..';
import Divider from "@/Components/Divider/Divider";

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

export const Snack = ({ onNavigate }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [snackRecipes, setSnackRecipes] = useState<Recipe[]>([]);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true)
      let {nextPage, recipes} = await foodApi.getRecipes("", "Snack")
      setLoading(false)
      setNextPage(nextPage)
      setSnackRecipes(recipes)
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchNextData = async () => {
    if (nextPage === null) return;

    try {
      setLoadingNextPage(true)
      let nextRecipes = await axios.get(nextPage)
        .then((res) => {
            const result: DishResult = res.data

            setNextPage(result._links.next.href)

            const dishes: Recipe[] = []
            for (let hit of result.hits) {
                dishes.push(hit.recipe)
            }

            return dishes
        })
        .catch(function (error) {
            throw error
        });
      setLoadingNextPage(false)
      setSnackRecipes(snackRecipes.concat(nextRecipes))
    } 
    catch (error) {
      console.error('Error fetching next page data:', error);
    }
  };

  return (
    <>
      {loading ? 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
        :
        <FlatList
          style={styles.containerColumn}
          data={snackRecipes}
          renderItem={({ item }) => (
            <Card 
              imageUrl={item.image}
              title={item.label}
              subtitle={item.healthLabels.slice(0, 5).join(', ')}
              direction={CardDirection.ROW} 
              onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
            />
          )}
          onEndReached={fetchNextData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
              {loadingNextPage ? <ActivityIndicator size='large' color={Colors.PRIMARY} /> : null}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
        />
      }
    </>
  );
};

const styles = StyleSheet.create({
  containerRow: { 
      width: '100%',
      elevation: 0, 
  
      backgroundColor: Colors.WHITE,
      
      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0.9, height: 0.9 },
      shadowOpacity: 1,
      shadowRadius: 1.8,
      
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      gap: 12
  },
  titleRow: { 
      width: '100%',
      elevation: 0, 

      backgroundColor: Colors.WHITE,
      
      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0.9, height: 0.9 },
      shadowOpacity: 1,
      shadowRadius: 1.8,
      
      display: 'flex',
      flexDirection: 'row',  
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      marginVertical: 10,
      gap: 12
  },
  containerColumn: {
    paddingTop: 15,
    marginHorizontal: 15
  },
  imageColumn: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
  },
  imageRow: {
      width: 120,
      height: 120
  },
  content: {
      paddingHorizontal: 16,
      backgroundColor: Colors.WHITE,
      
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
  },
  title: {
      fontWeight: '500',
      fontSize: FontSize.SMALL,
      color: Colors.PRIMARY_TEXT,
      // flex: 1
  },
  subtitle: {
      fontWeight: '400',
      fontSize: 12,
      color: Colors.SECONDARY_TEXT
  },
  tail: {
      paddingHorizontal: 16,
      paddingBottom: 12
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
