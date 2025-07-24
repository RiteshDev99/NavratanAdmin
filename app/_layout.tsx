import { Stack } from "expo-router";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/src/store/store";
import authService from "@/src/appwrite/authServices";
import { useEffect, useState } from "react";
import { login, logout } from "@/src/store/feature/auth/authSlice";
import { ActivityIndicator, View } from "react-native";

function RootLayoutInner() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.status);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(login({ userData }));
            } else {
                dispatch(logout());
            }
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="(tabs)" />
            ) : (
                <Stack.Screen name="login" />
            )}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <RootLayoutInner />
        </Provider>
    );
}
