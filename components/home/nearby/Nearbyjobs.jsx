import React from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './nearbyjobs.style';
import { COLORS, SIZES } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

import useFetch from '../../../hook/useFetch';

function NearbyJobs() {
  const router = useRouter();
  const { data, isLoading, hasError } = useFetch('search', {
    query: 'React',
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity onPress={() => router.push('/nearbyjobs')}>
          <Text style={styles.headerBtn}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : hasError ? <Text>Something went wrong</Text> : (
          data?.map((item) => (
            <NearbyJobCard
              key={`nearby-job-${item?.job_id}`}
              job={item}
              handleNavigate={() => router.push(`/job-details/${item?.job_id}`)}

            />
          ))
        )}
      </View>
    </View>
  );
}

export default NearbyJobs;
