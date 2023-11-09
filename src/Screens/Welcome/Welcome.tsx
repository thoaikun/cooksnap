import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { RootScreens } from "..";
import onboardings from "./Onboarding";
import { LocalizationKey, i18n } from "@/Localization";



const CustomDot = ({ selected, ...props }: any) => {
  const backgroundColor = selected ? '#3DC73A' : '#cccccc';

  return (
    <View style={[styles.dot, { backgroundColor }]}>
      {/* ... any other child components */}
    </View>
  );
};

const NextBtn = ({ nextLabel, onPress, ...props }: any) => {
  return (
    <TouchableOpacity style={styles.nextBtn} onPress={onPress}>
      <Text style={styles.btnText}>{nextLabel}</Text>
    </TouchableOpacity>
  )
}

const SkipBtn = ({ skipLabel, onPress, ...props }: any) => {
  return (
    <TouchableOpacity style={styles.skipBtn} onPress={onPress}>
      <Text style={styles.skipText}>{skipLabel}</Text>
    </TouchableOpacity>
  )
}

const DoneBtn = ({ onPress }: any) => {
  return (
    <TouchableOpacity style={styles.nextBtn} onPress={onPress}>
      <Text style={styles.btnText}>{i18n.t(LocalizationKey.ONBOARDING_DONE)}</Text>
    </TouchableOpacity>
  )
}

export const Welcome = (props: {
  onNavigate: (string: RootScreens, params?: any) => void;
}) => {
  return (
    <Onboarding 
      pages={onboardings}
      nextLabel={i18n.t(LocalizationKey.ONBOARDING_NEXT)}
      skipLabel={i18n.t(LocalizationKey.ONBOARDING_SKIP)}
      titleStyles={styles.title}
      subTitleStyles={styles.description}
      containerStyles={styles.container}
      bottomBarHighlight={false}
      DotComponent={CustomDot}
      NextButtonComponent={NextBtn}
      SkipButtonComponent={SkipBtn}
      DoneButtonComponent={DoneBtn}
      onSkip={() => props.onNavigate(RootScreens.MAIN, {previousScreen: 'onboarding'})}
      onDone={() => props.onNavigate(RootScreens.MAIN, {previousScreen: 'onboarding'})}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 26,
    color: 'black'
  },
  description: {
    fontWeight: '400',
    fontSize: 18,
    color: '#899197'  
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    columnGap: 20
  }, 
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextBtn: {
    backgroundColor: '#3DC73A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10
  },
  skipBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 10
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  skipText: {
    fontWeight: 'normal',
    fontSize: 14,
    color: 'black'
  }
})