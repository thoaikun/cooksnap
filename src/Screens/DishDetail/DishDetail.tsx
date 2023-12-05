import { Colors } from '@/Theme/Variables'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as React from 'react'
import { Image, View } from 'react-native'
import About from './AboutTab'
import styles from './styles'

const Tab = createMaterialTopTabNavigator()

const DishDetail = () => {
  return (
    <>
      <View style={styles.videoContainer}>
            <Image
                source={{
                    uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
                }}
                style={styles.video}
            />
      </View>

      <Tab.Navigator
        style={styles.bodyContainer}
        screenOptions={{
          tabBarInactiveTintColor: Colors.BLACK,
          tabBarActiveTintColor: Colors.BLACK,
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
        <Tab.Screen name='About'>
          {(props) => (
            <About
              {...props}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  )
}


export default DishDetail