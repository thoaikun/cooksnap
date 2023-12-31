import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Colors, FontSize } from "@/Theme/Variables";

const FilterBar = ({ options, onOptionPress, initOption=null }) => {
  const [activeOption, setActiveOption] = useState(initOption === null ? options[0] : initOption);

  const handleOptionPress = (option) => {
    setActiveOption(option);
    onOptionPress(option)
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.optionButton, activeOption === option && styles.activeOption]}
          onPress={() => handleOptionPress(option)}
        >
          <Text style={[styles.optionText, activeOption === option && styles.activeOptionText]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 5,
    height: 45,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'lightgray',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    // color: 'black',
    color: Colors.PRIMARY_TEXT
  },
  activeOption: {
    backgroundColor: Colors.PRIMARY,
  },
  activeOptionText: {
    color: 'white',
  },
});

export default FilterBar;