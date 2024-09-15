// Welcome.jsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

// Importa la configuración de i18n
import "../i18n";

const Welcome = () => {
  const { t, i18n } = useTranslation(); // Hook para traducción
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              {t("discover_endless_possibilities_with")}{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            {t("where_creativity_meets_innovation")}
          </Text>

          <CustomButton
            title={t("continue_with_email")}
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

          {/* Botones para cambiar el idioma */}
          <View className="flex flex-row justify-center gap-4 mt-6">
            <CustomButton
              title={t("english")}
              handlePress={() => i18n.changeLanguage("en")}
              containerStyles="bg-secondary-200 w-[150px]" // Ajusta el ancho aquí
              textStyles="text-white"
            />
            <CustomButton
              title={t("spanish")}
              handlePress={() => i18n.changeLanguage("es")}
              containerStyles="bg-secondary-200 w-[150px]" // Ajusta el ancho aquí
              textStyles="text-white"
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
