import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Input } from "../index";
import authService from "@/src/appwrite/authServices";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/feature/auth/authSlice";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import Toast from "react-native-toast-message";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(session));
        router.push("/");
        Toast.show({
          type: "success", 
          text1: "Login Successfully",
          position: "bottom", 
        });

      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/icons/Navratan_Logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Sign in to your account</Text>
        <Text style={styles.subtitle}>
          Don’t have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/signup")} // ✅ Correct navigation
          >
            Sign Up
          </Text>
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.form}>
          <Controller
  control={control}
  name="email"
  rules={{
    required: "Email is required",
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: "Enter a valid email",
    },
  }}
  render={({ field: { onChange, value } }) => (
    <Input
      label="Email:"
      placeholder="Enter your email"
      value={value}
      onChangeText={onChange}
    />
  )}
/>
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password:"
                placeholder="Enter your password"
                type="password"
                value={value}
                onChangeText={onChange}
                style={{ marginTop: 0, }}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <Button
            style={{ marginTop: 20 }}
            onPress={handleSubmit(login)}
          >
            Sign in
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    // backgroundColor: "#f3f4f6",
    // backgroundColor:'#FF0000',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
    color: "rgba(0,0,0,0.6)",
  },
  link: {
    color: "#eb7724",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  form: {
    marginTop: 20,
  },
});


export default Login;
