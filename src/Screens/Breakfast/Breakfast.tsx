import Card, { CardDirection } from "@/Components/Card/Card";
import { Recipe } from '@/Model/foodRecommendation';
import foodApi from '@/Services/food';
import { Colors, FontSize } from "@/Theme/Variables";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { RootScreens } from '..';

interface IProps {
  onNavigate: (screen: RootScreens, params?: any) => void;
}

export const Breakfast = ({ onNavigate }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [breakfastRecipes, setBreakFastRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setBreakFastRecipes(await foodApi.getRecipes('', 'Breakfast'))
      setLoading(false)
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}> 

      {loading ?
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        :
        <View style={styles.containerColumn}>
            {breakfastRecipes.map((item, index) => (
              <Card 
                key={index}
                imageUrl={item.image}
                title={item.label}
                subtitle={item.healthLabels.slice(0, 5).join(', ')}
                direction={CardDirection.ROW} 
                onPress={() => onNavigate(RootScreens.DISH_DETAIL, { dish: item })}
              />
            ))}
        </View>
      }
  
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
      borderRadius: 8,
      backgroundColor: Colors.WHITE,

      shadowColor: 'rgba(0, 0, 0, 0.10)',
      shadowOffset: { width: 0.9, height: 0.9 },
      shadowOpacity: 1,
      shadowRadius: 1.8,
      elevation: 20,
      paddingHorizontal: 5,
      marginVertical: 20,

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
    justifyContent: 'center',
    alignItems: 'center'
  }
})
