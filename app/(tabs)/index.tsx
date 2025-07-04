import {ActivityIndicator, Text, View} from "react-native";
import authservice from "@/src/appwrite/authServices";
import {login,logout} from "@/src/store/feature/auth/authSlice";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";


export default function Index() {
const [loading, setLoading] = useState(true);
const dispatch = useDispatch();

    useEffect(() => {
        authservice.getCurrentUser()
            .then((userData) => {
                // @ts-ignore
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .catch((error) => {
                console.error("Appwrite Error ::", error);
            })
            .finally(() => setLoading(false));
    }, []);
    return !loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Welcome.....</Text>
        </View>
    ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}
