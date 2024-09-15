import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { useTranslation } from 'react-i18next'; // Importa useTranslation

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { t, i18n } = useTranslation(); // Usa useTranslation para obtener t y i18n
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert(t("error_sign_in"), t("error_fill_fields"));
      return;
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert(t("success_sign_in"));
      router.replace("/home");
    } catch (error) {
      Alert.alert(t("error_sign_in"), error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            {t("login_title")}
          </Text>

          <FormField
            title={t("email_label")}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title={t("password_label")}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title={t("sign_in_button")}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              {t("no_account_text")}
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              {t("signup_link")}
            </Link>
          </View>

          {/* Botones para cambiar el idioma */}
          <View className="flex flex-row justify-center gap-4 mt-6">
            <CustomButton
              title={t("english")}
              handlePress={() => handleLanguageChange("en")}
              containerStyles="bg-secondary-200 w-[150px]" // Ajusta el ancho aquí
              textStyles="text-white"
            />
            <CustomButton
              title={t("spanish")}
              handlePress={() => handleLanguageChange("es")}
              containerStyles="bg-secondary-200 w-[150px]" // Ajusta el ancho aquí
              textStyles="text-white"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
