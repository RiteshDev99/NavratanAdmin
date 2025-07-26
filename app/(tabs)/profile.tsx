import { View, StyleSheet } from 'react-native';
import authService from "@/src/appwrite/authServices";
import {useDispatch} from "react-redux";
import {logout} from '@/src/store/feature/auth/authSlice'
import {Button} from '@/src/components/index'
import React from "react";
import {useRouter} from "expo-router";
import Toast from "react-native-toast-message";

export default function SettingTab() {

    const dispatch = useDispatch();
    const router = useRouter();


    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                router.push("/login")
                Toast.show({
                    type: "success",
                    text1: "Logout Successfully",
                    position: "bottom", 
                });

            })
            .catch((error)=> {
                console.log("Appwrite error", error)
            })
    }


    return (
        <View style={styles.container}>
            <Button
                style={{ marginTop: 20 }}
                onPress={logoutHandler}
            >
                Logout
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
