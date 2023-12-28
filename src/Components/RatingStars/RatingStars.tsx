import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import {faStar as faEmptyStar} from '@fortawesome/free-regular-svg-icons';

const RatingStars = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} size={20} color="gold" />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} size={20} color="gold" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faEmptyStar} size={20} color="gold" />);
    }

    return stars;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {renderStars()}
      <Text style={{ marginLeft: 5 }}>{rating}</Text>
    </View>
  );
};

export default RatingStars;