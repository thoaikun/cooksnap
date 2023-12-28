import FilledButton from "@/Components/Button/FilledButton";
import OutlinedButton from "@/Components/Button/OutlinedButton";
import TextButton from "@/Components/Button/TextButton";
import LightTextButton from "@/Components/Button/LightTextButton";
import Card, { CardDirection } from "@/Components/Card/Card";
import Input from "@/Components/Input/Input";
import RatingStars from "@/Components/RatingStars/RatingStars";
import useInputController from "@/Components/Input/useInputController";

import { IProfile } from "@/Model/profile";
import { Recipe } from '@/Model/foodRecommendation';

import userApi from "@/Services/user";
import foodApi from '@/Services/food';

import profileStore from "@/Store/reducers/profile";
import { profileSelector } from "@/Store/selector";
import { Colors, FontSize } from "@/Theme/Variables"
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faStar, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Text, Image, StyleSheet, Pressable, ScrollView, Dimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux";

import { RootScreens } from '..';

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

export const Search = ({ onNavigate }: IProps) => {
  const [loading, setLoading] = useState(false);
  const searchController = useInputController()
  const [searchRecipes, setSearchRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setLoading(true)
    fetchData();
  }, [searchController.value]);

  const fetchData = async () => {
    try {
      setSearchRecipes(await foodApi.getRecipes(searchController.value))
      setLoading(false)
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView> 
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

        <View style={styles.containerColumn}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          ) 
          : (
            searchRecipes.map((item, index) => (
              <Card 
                key={index}
                imageUrl={item.image}
                title={item.label}
                subtitle={item.healthLabels.slice(0, 5).join(', ')}
                direction={CardDirection.ROW} 
                onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
              />
            ))
          )}
        </View>

      </View>
    </ScrollView>
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
    rowGap: 15,
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
  title: {
    fontSize: FontSize.LARGE,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
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
  }
})
