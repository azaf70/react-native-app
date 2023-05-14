import {
  ActivityIndicator,
  RefreshControl, SafeAreaView, ScrollView, Text, View,
} from 'react-native';
import React from 'react';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import useFetch from '../../hook/useFetch';
import { COLORS, icons, SIZES } from '../../constants';
import {
  Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics,
} from '../../components';
import About from '../../components/jobdetails/about/About';

function JobDetails() {
  const router = useRouter();
  const params = useSearchParams();
  const {
    data, hasError, isLoading, refetch,
  } = useFetch('job-details', {
    job_id: params.id,
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const refresh = () => {};
  const tabs = ['About', 'Qualifications', 'Responsibilities'];
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const displayTabContent = (tab, job) => {
    switch (tab) {
      case 'Qualifications':
        return (
          <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']} />
        );
      case 'About':
        return (
          <JobAbout info={data[0].job_description ?? ['N/A']} />
        );
      case 'Requirements':
        return (
          <View>
            <Text style={{ color: COLORS.primary, ...SIZES.h2 }}>Requirements</Text>
          </View>
        );
      case 'Responsibilities':
        return (
          <Specifics title="Qualifications" points={data[0].job_highlights?.Responsibilities ?? ['N/A']} />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.goBack()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handlePress={() => router.goBack()}
            />
          ),
          headerTitle: '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
          {(() => {
            if (isLoading) {
              return <ActivityIndicator size="large" color={COLORS.primary} />;
            }
            if (hasError) {
              return <Text>Something went wrong</Text>;
            }

            if (data.length === 0) {
              return <Text>No data found</Text>;
            }

            return (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={data[0].employer_logo}
                  jobTitle={data[0].job_title}
                  companyName={data[0].employer_name}
                  location={data[0].job_country}
                />
                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />

                {displayTabContent(activeTab, data[0])}

              </View>
            );
          }
          )()}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
      </>
    </SafeAreaView>
  );
}
export default JobDetails;
