import axios from "axios";

import Card, { CardDirection } from "@/Components/Card/Card";
import FilterBar from "@/Components/FilterBar/FilterBar";

import { Recipe } from '@/Model/foodRecommendation';
import foodApi from '@/Services/food';
import { Colors, FontSize } from "@/Theme/Variables";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import Divider from "@/Components/Divider/Divider";
import { RootScreens } from '..';

import { LocalizationKey, i18n } from '@/Localization';
import { DishResult } from "@/Model/foodRecommendation";

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

export const Snack = ({ onNavigate }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [snackRecipes, setSnackRecipes] = useState<Recipe[]>([]);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  
  const [filterOption, setFilterOption] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setNextPage(null)
    fetchData();
  }, [filterOption]);

  const fetchData = async () => {
    if (filterOption=="All") return setFilterOption(null);

    try {
      setLoading(true)
      let {nextPage, recipes} = await foodApi.getRecipes("", "Snack", filterOption)
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
    <View style={styles.stackLayout}>

      <FilterBar 
        countriesFilter={{
          [i18n.t(LocalizationKey.ALL)]: "All", 
          [i18n.t(LocalizationKey.ASIAN)]: "Asian", 
          [i18n.t(LocalizationKey.SOUTH_EAST_ASIAN)]: "South East Asian", 
          [i18n.t(LocalizationKey.CHINESE)]: "Chinese", 
          [i18n.t(LocalizationKey.JAPANESE)]: "Japanese", 
          [i18n.t(LocalizationKey.INDIAN)]: "Indian", 
          [i18n.t(LocalizationKey.EASTERN_EUROPE)]: "Eastern Europe", 
          [i18n.t(LocalizationKey.CENTRAL_EUROPE)]: "Central Europe", 
          [i18n.t(LocalizationKey.BRITISH)]: "British", 
          [i18n.t(LocalizationKey.FRENCH)]: "French", 
          [i18n.t(LocalizationKey.ITALIAN)]: "Italian", 
          [i18n.t(LocalizationKey.AMERICAN)]: "American", 
          [i18n.t(LocalizationKey.SOUTH_AMERICAN)]: "South American", 
          [i18n.t(LocalizationKey.MEXICAN)]: "Mexican",}}
        onOptionPress={setFilterOption}
        // initOption={filterOption}
      >
      </FilterBar>

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
    </View>
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
    marginVertical: 10,
    // paddingHorizontal: 15,
    width: "100%"
  },
  stackLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 15,
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
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  }
})
