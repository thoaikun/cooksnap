import LightTextButton from "@/Components/Button/LightTextButton";
import FilterBar from "@/Components/FilterBar/FilterBar";
import Card, { CardDirection } from "@/Components/Card/Card";

import { Recipe } from '@/Model/foodRecommendation';

import foodApi from '@/Services/food';

import { Colors, FontSize } from "@/Theme/Variables";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootScreens } from '..';

import { LocalizationKey, i18n } from '@/Localization';

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

export const Home = ({ onNavigate }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [breakfastRecipes, setBreakFastRecipes] = useState<Recipe[]>([]);
  const [lunchRecipes, setLunchRecipes] = useState<Recipe[]>([]);
  // const [dinnerRecipes, setDinnerRecipes] = useState<Recipe[]>([]);
  const [snackRecipes, setSnackRecipes] = useState<Recipe[]>([]);

  const [filterOption, setFilterOption] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filterOption]);


  const fetchData = async () => {
    if (filterOption == "All") return setFilterOption(null)
    try {
      setLoading(true)
      setBreakFastRecipes((await foodApi.getRecipes('', 'Breakfast', filterOption)).recipes)
      setLunchRecipes((await foodApi.getRecipes('', 'Lunch', filterOption)).recipes)
      setSnackRecipes((await foodApi.getRecipes('', 'Snack', filterOption)).recipes)
      setLoading(false)
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}> 

      <View>

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
        >
        </FilterBar>

        {/* Breakfast */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{i18n.t(LocalizationKey.BREAKFAST)}</Text>

          <LightTextButton 
            title="See all" 
            onPress={() => onNavigate(RootScreens.BREAKFAST)}
          />
        </View>

        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
          ) 
          : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.containerRow}>
                {breakfastRecipes.map((item, index) => (
                  <Card 
                    key={index}
                    imageUrl={item.image}
                    title={item.label}
                    subtitle={item.healthLabels.slice(0, 5).join(', ')}
                    direction={CardDirection.COLUMN} 
                    onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* Lunch */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{i18n.t(LocalizationKey.LUNCH)}</Text>

          <LightTextButton 
            title="See all" 
            onPress={() => onNavigate(RootScreens.LUNCH)}
          />
        </View>

        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
          ) 
          : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.containerRow}>
                {lunchRecipes.map((item, index) => (
                  <Card 
                    key={index}
                    imageUrl={item.image}
                    title={item.label}
                    subtitle={item.healthLabels.slice(0, 5).join(', ')}
                    direction={CardDirection.COLUMN} 
                    onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* Snack */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{i18n.t(LocalizationKey.SNACK)}</Text>

          <LightTextButton 
            title="See all"
            onPress={() => onNavigate(RootScreens.SNACK)}
          />
        </View>

        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
          ) 
          : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.containerRow}>
                {snackRecipes.map((item, index) => (
                  <Card 
                    key={index}
                    imageUrl={item.image}
                    title={item.label}
                    subtitle={item.healthLabels.slice(0, 5).join(', ')}
                    direction={CardDirection.COLUMN} 
                    onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
                  />
                ))}
              </View>
            </ScrollView>
          )}
        </View>

      </View>
  
    </ScrollView>
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
      maxWidth: 220,
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
    minHeight: 200,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
