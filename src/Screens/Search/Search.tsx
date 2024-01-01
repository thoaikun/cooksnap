import axios from "axios"

import FilledButton from "@/Components/Button/FilledButton";
import OutlinedButton from "@/Components/Button/OutlinedButton";
import TextButton from "@/Components/Button/TextButton";
import LightTextButton from "@/Components/Button/LightTextButton";
import Card, { CardDirection } from "@/Components/Card/Card";
import Input from "@/Components/Input/Input";
import RatingStars from "@/Components/RatingStars/RatingStars";
import FilterBar from "@/Components/FilterBar/FilterBar";
import useInputController from "@/Components/Input/useInputController";
import Divider from '@/Components/Divider/Divider';

import { IProfile } from "@/Model/profile";
import {DishResult, FoodRecommendation, Recipe} from "@/Model/foodRecommendation"

import userApi from "@/Services/user";
import foodApi from '@/Services/food';

import profileStore from "@/Store/reducers/profile";
import { profileSelector } from "@/Store/selector";
import { Colors, FontSize } from "@/Theme/Variables"
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Text, Image, StyleSheet, Pressable, ScrollView, Dimensions, FlatList } from "react-native"
import { useDispatch, useSelector } from "react-redux";

import { RootScreens } from '..';
import { i18n, LocalizationKey } from "@/Localization";
import { debounce } from "@/Utils";

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

export const Search = ({ onNavigate }: IProps) => {
  const [loading, setLoading] = useState(false);
  const searchController = useInputController()
  const [searchRecipes, setSearchRecipes] = useState<Recipe[]>([]);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const [filterOption, setFilterOption] = useState(null);

  const fetchData = async (value: string, filter: any) => {
    if (value == "") return;

    try {
      setLoading(true)
      let {nextPage, recipes} = await foodApi.getRecipes(value, null, filter)
      setLoading(false)
      setNextPage(nextPage)
      setSearchRecipes(recipes)
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
      setSearchRecipes(searchRecipes.concat(nextRecipes))
    } 
    catch (error) {
      console.error('Error fetching next page data:', error);
    }
  };

  const handleSearch = useCallback(
    debounce((value: string, filter: any) => {
        //tracking - done
        if (value == '') return;
        fetchData(value, filter)
    }, 500),
    [],
  );

    
  useEffect(() => {
    setNextPage(null)
    handleSearch(searchController.value, filterOption)
  }, [searchController.value, filterOption]);
  
  return (
    <View style={styles.container}>
      <Input 
        label="Search"
        controller={searchController}
        prefix={
          <FontAwesomeIcon 
            icon={faMagnifyingGlass} 
            size={22} 
            color={searchController.isFocused ? Colors.PRIMARY : Colors.BACKGROUND} 
          />
        }
      />

      <FilterBar 
         options_to_values={{
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
          style={styles.listDishContainer}
          data={searchRecipes}
          keyExtractor={(item, index) => index.toString()}
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
          ItemSeparatorComponent={() => <Divider />}
          showsVerticalScrollIndicator={false}
        />
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // gap: 15,
  },
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
      borderRadius: 8,
      backgroundColor: Colors.WHITE,

      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0.9, height: 0.9 },
      shadowOpacity: 1,
      shadowRadius: 1.8,
      elevation: 20,

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      gap: 12
  },
  listDishContainer: {
    marginTop: 15,
    // paddingHorizontal: 15,
    width: "100%"
  },
  title: {
    fontSize: FontSize.LARGE,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // rowGap: 15,
    paddingHorizontal: 15,
    width: "100%"
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      columnGap: 10,
  },
  loadingBackground: {
    height: Dimensions.get('window').height, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  loadingContainer: {
    // flex: 1,
    marginVertical: 15,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  }
})
