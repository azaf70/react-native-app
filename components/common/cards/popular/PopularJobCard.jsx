import React from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';

import styles from './popularjobcard.style';

import { checkImageURL } from '../../../../utils';

function PopularJobCard({ item, selectedJob, handleCardPress }) {
  return (

    <TouchableOpacity style={styles.container(selectedJob, item)}>
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image source={{ uri: checkImageURL(item.employer_logo) ? item.employer_logo : 'https://dummyimage.com/600x400/ffffff/000000&text=Company+logo' }} style={styles.logoImage} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>{item.job_title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default PopularJobCard;
