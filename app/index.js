import {
  View, ScrollView, SafeAreaView,
} from 'react-native';

import React, { useState } from 'react';

import { Stack, useRouter } from 'expo-router';

import {
  COLORS, icons, images, SIZES,
} from '../constants';

import {
  Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome,
} from '../components';

function Home() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.lightWhite,
    }}
    >
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="100%"
            />
          ),
          headerTitle: '',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          flex: 1,
          padding: SIZES.medium,
          backgroundColor: COLORS.lightWhite,
        }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={() => {
              router.push(`/search/${searchTerm}`);
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
