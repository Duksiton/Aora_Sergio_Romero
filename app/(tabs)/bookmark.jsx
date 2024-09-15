import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from 'react-i18next';

const Bookmark = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">{t('bookmark')}</Text>
    </SafeAreaView>
  );
};

export default Bookmark;
