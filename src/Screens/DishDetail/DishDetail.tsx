import { Colors } from '@/Theme/Variables'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as React from 'react'
import { Image, View } from 'react-native'
import AboutTab from './AboutTab'
import styles from './styles'
import RecipeTab from './RecipeTab'
import { LocalizationKey, i18n } from '@/Localization'
import { Recipe } from '@/Model/foodRecommendation'

interface IProps {
  dish: Recipe
}

const Tab = createMaterialTopTabNavigator()

const DishDetail = ({ dish }: IProps ) => {
  return (
    <>
      <View style={styles.videoContainer}>
            <Image
                source={{
                    uri: dish.image,
                }}
                style={styles.video}
            />
      </View>

      <Tab.Navigator
        style={styles.bodyContainer}
        screenOptions={{
          tabBarInactiveTintColor: Colors.BLACK,
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarLabelStyle: styles.headerText,
          tabBarStyle: {
              elevation: 0,
              backgroundColor: Colors.WHITE,
          },
          tabBarPressColor: '000000',
          tabBarItemStyle: {
              paddingVertical: 5,
          },
          tabBarIndicatorStyle: {
              backgroundColor: Colors.PRIMARY,
          },
        }}
      >
        <Tab.Screen 
          name='About' 
          options={{ 
            title: i18n.t(LocalizationKey.ABOUT_DISH) 
          }}
        >
          {(props) => (
            <AboutTab
              {...props}
              dish={dish}
            />
          )}
        </Tab.Screen>
        <Tab.Screen 
          name='Recipe'
          options={{ 
            title: i18n.t(LocalizationKey.RECIPE_DISH) 
          }} 
        >
          {(props) => (
            <RecipeTab
              {...props}
              instructions={dish.instructionLines}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  )
}


export default DishDetail