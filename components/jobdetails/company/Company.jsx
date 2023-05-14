import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './company.style';
import { checkImageURL } from '../../../utils';
import { icons } from '../../../constants';

function Company({
  companyLogo, companyName, jobTitle, location,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{ uri: checkImageURL(companyLogo) ? companyLogo : 'https://dummyimage.com/600x400/ffffff/000000&text=Company+logo' }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>
          {companyName}
          {' '}
          /
          {' '}
        </Text>
        <View style={styles.locationBox}>
          <Image source={icons.location} style={styles.locationImage} resizeMode="contain" />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

export default Company;
