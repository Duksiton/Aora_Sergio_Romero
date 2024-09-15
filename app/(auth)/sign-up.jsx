// SignUp.jsx
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  Button,
} from "react-native";
import { useTranslation } from "react-i18next";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

// Importa la configuración de i18n
import "../../i18n";

const SignUp = () => {
  const { t, i18n } = useTranslation(); // Hook para traducción
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert(t("error"), t("please_fill_all_fields"));
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert(t("error"), error.message);
    } finally {
      setSubmitting(false);
    }
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
            {t("sign_up_to_aora")}
          </Text>

          <FormField
            title={t("username")}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title={t("email")}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title={t("password")}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title={t("sign_up")}
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              {t("have_an_account")}
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              {t("login")}
            </Link>
          </View>

          {/* Botones para cambiar idioma */}
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
    </SafeAreaView>
  );
};

export default SignUp;
