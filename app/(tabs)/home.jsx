import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { useTranslation } from 'react-i18next';  

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard, CustomButton } from "../../components";

const Home = () => {
  const { t, i18n } = useTranslation(); 
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  {t('welcome_back')}  
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {t('app_name')}  
                </Text>
              </View>

              <View className="flex flex-row justify-center gap-4 mt-6">
              <CustomButton
                title={t("english")}
                handlePress={() => handleChangeLanguage("en")}
                containerStyles="bg-secondary-200 w-[100px]" // Ajusta el ancho aquí
                textStyles="text-white"
              />
              <CustomButton
                title={t("spanish")}
                handlePress={() => handleChangeLanguage("es")}
                containerStyles="bg-secondary-200 w-[100px]" // Ajusta el ancho aquí
                textStyles="text-white"
              />
            </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                {t('latest_videos')} 
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>

           
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={t('no_videos_found')}  
            subtitle={t('no_videos_created')}  
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
