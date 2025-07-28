import React from "react";
import {View, StyleSheet,  Text} from 'react-native';
import authService from "@/src/appwrite/authServices";
import {useDispatch, useSelector} from "react-redux";
import {logout} from '@/src/store/feature/auth/authSlice'
import {Button} from '@/src/components/index'
import {useRouter} from "expo-router";
import { Image } from "expo-image";
import {showToast} from "@/src/utils/toastConfig";

export default function ProfileTab() {

    const dispatch = useDispatch();
    const router = useRouter();
    const userData  = useSelector((state:any) => state.auth.userData);

    
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                router.push("/login")
                showToast("success", "Logout Successful");

            })
            .catch((error:any)=> {
                console.log("Appwrite error", error)
            })
    }



    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{
                        uri: userData?.avatarUrl || "https://i.pravatar.cc/150?img=12",
                    }}
                    style={styles.profileImage}
                />

                <Text style={styles.name}>
                    {userData ? userData.name : "Guest User"}
                </Text>

                <Text style={styles.email}>
                    {userData ? userData.email : "No email available"}
                </Text>

                <Button style={styles.logoutButton} onPress={logoutHandler}>
                    Logout
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: "#f0f2f5",
    },
    card: {
        width: "90%",
        maxWidth: 350,
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#4CAF50",
        marginBottom: 15,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "#666",
        marginBottom: 25,
    },
    logoutButton: {
        backgroundColor: "#FF5252",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 3,
    },
});
